import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    // Ambil semua data product dari database
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        deleted_at: null,
      },
    });

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data product masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: transactions.length,
        data: transactions,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Kesahalan saat mengambil data:", error);

    // Pengecekan Tipe Error
    if (error.code === "P2021") {
      return NextResponse.json(
        { success: false, message: "Tabel database tidak ditemukan." },
        { status: 500 },
      );
    }

    // Respon Error Default
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal pada server.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      loan_account_id,
      approved_by_id,
      amount_paid,
      payment_method,
      payment_attachment,
      paid_date,
    } = body;

    // 1. Verifikasi Sesi User Input
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const processed_by_id = payload.id;

    // 2. Validasi Input
    if (
      !loan_account_id ||
      !approved_by_id ||
      !amount_paid ||
      amount_paid <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Data transaksi tidak lengkap atau nominal tidak valid.",
        },
        { status: 400 },
      );
    }

    // 3. Ambil Data Loan Account Terkini
    const loan = await prisma.loanAccount.findUnique({
      where: { id: loan_account_id },
    });

    if (!loan) {
      return NextResponse.json(
        { success: false, message: "Rekening tidak ditemukan." },
        { status: 404 },
      );
    }

    // --- LOGIKA BUNGA FLAT BULANAN ---
    const targetDate = paid_date ? new Date(paid_date) : new Date();
    const startOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    // Cek apakah bulan ini sudah ada transaksi sukses
    const everHadTransactionThisMonth = await prisma.transaction.findFirst({
      where: {
        loan_account_id: loan.id,
        paid_date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        payment_status: {
          in: ["SUCCESS", "REFUNDED"], // Jika sudah ada salah satu ini, jangan tambah bunga lagi
        },
      },
    });

    // Kewajiban bunga awal diambil dari tunggakan di database
    let total_interest_due = Number(loan.current_debt_interest);

    // Jika transaksi pertama di bulan ini & masih ada sisa pokok, tambahkan bunga flat bulan berjalan
    if (
      !everHadTransactionThisMonth &&
      Number(loan.current_debt_principal) > 0
    ) {
      total_interest_due += Number(loan.rate_amount);
    }
    // --- END LOGIKA BUNGA ---

    const total_paid = Number(amount_paid);
    const current_debt_principal = Number(loan.current_debt_principal);

    let interest_cut = 0;
    let principal_cut = 0;

    // 4. Logika Perhitungan (Interest First)
    if (total_interest_due > 0) {
      if (total_paid >= total_interest_due) {
        // Bayar lunas semua bunga (tunggakan + bulan berjalan jika ada)
        interest_cut = total_interest_due;
        principal_cut = total_paid - total_interest_due;
      } else {
        // Uang hanya cukup/kurang untuk bayar bunga
        interest_cut = total_paid;
        principal_cut = 0;
      }
    } else {
      // Tidak ada kewajiban bunga, semua masuk ke pokok
      interest_cut = 0;
      principal_cut = total_paid;
    }

    // 5. Hitung Sisa Akhir
    const remaining_interest = total_interest_due - interest_cut;
    const remaining_principal = current_debt_principal - principal_cut;

    // Validasi agar tidak overpayment pada pokok
    if (remaining_principal < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Jumlah pembayaran pokok melebihi sisa hutang.",
        },
        { status: 400 },
      );
    }

    // 6. Generate Invoice Number
    const lastTx = await prisma.transaction.findFirst({
      orderBy: { invoice_number: "desc" },
    });

    let newInvoiceNumber = "TRX-000001";
    if (lastTx) {
      const lastNumber = parseInt(lastTx.invoice_number.split("-")[1]);
      newInvoiceNumber = `TRX-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // 7. Jalankan DB Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Simpan data transaksi
      const transaction = await tx.transaction.create({
        data: {
          invoice_number: newInvoiceNumber,
          loan_account_id,
          processed_by_id,
          approved_by_id,
          amount_paid: total_paid,
          principal_cut: principal_cut,
          interest_cut: interest_cut,
          remaining_principal: remaining_principal,
          remaining_interest: remaining_interest,
          payment_method: payment_method || "Tunai",
          payment_attachment: payment_attachment || "Tidak ada attachment",
          payment_status: "SUCCESS",
          paid_date: targetDate,
        },
      });

      // Update Saldo di LoanAccount
      await tx.loanAccount.update({
        where: { id: loan_account_id },
        data: {
          current_debt_principal: remaining_principal,
          current_debt_interest: remaining_interest,
          status: remaining_principal <= 0 ? "SETTLED" : loan.status,
        },
      });

      return transaction;
    });

    return NextResponse.json(
      {
        success: true,
        message: `Transaksi ${newInvoiceNumber} berhasil diproses.`,
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("TRANSACTION_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
