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
      include: {
        loan_account: {
          include: { customer: true },
        },
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

    const serializedData = transactions.map((tx) => ({
      ...tx,
      amount_paid: Number(tx.amount_paid),
      principal_cut: Number(tx.principal_cut),
      interest_cut: Number(tx.interest_cut),
      remaining_principal: Number(tx.remaining_principal),
      remaining_interest: Number(tx.remaining_interest),
    }));

    return NextResponse.json(
      {
        success: true,
        count: serializedData.length,
        data: serializedData,
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

    // 1. Verifikasi Sesi User
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
      Number(amount_paid) <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak lengkap atau nominal tidak valid.",
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

    // Cek apakah bulan ini sudah pernah ada aktivitas (SUCCESS atau REFUNDED)
    const everHadTransactionThisMonth = await prisma.transaction.findFirst({
      where: {
        loan_account_id: loan.id,
        paid_date: { gte: startOfMonth, lte: endOfMonth },
        payment_status: { in: ["SUCCESS", "REFUNDED"] },
      },
    });

    let total_interest_due = Number(loan.current_debt_interest);

    if (
      !everHadTransactionThisMonth &&
      total_interest_due === 0 &&
      Number(loan.current_debt_principal) > 0
    ) {
      total_interest_due += Number(loan.rate_amount);
    }

    // --- END LOGIKA BUNGA ---

    const total_paid = Number(amount_paid);
    const current_debt_principal = Number(loan.current_debt_principal);
    const max_allowed = current_debt_principal + total_interest_due;

    let interest_cut = 0;
    let principal_cut = 0;

    if (total_paid > max_allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Nominal melebihi total tagihan. Maksimal: Rp ${max_allowed.toLocaleString("id-ID")}`,
        },
        { status: 400 },
      );
    }

    // 4. Logika Perhitungan (Interest First)
    if (total_interest_due > 0) {
      if (total_paid >= total_interest_due) {
        interest_cut = total_interest_due;
        principal_cut = total_paid - total_interest_due;
      } else {
        interest_cut = total_paid;
        principal_cut = 0;
      }
    } else {
      interest_cut = 0;
      principal_cut = total_paid;
    }

    // Limit principal_cut agar tidak melebihi sisa pokok
    if (principal_cut > current_debt_principal) {
      principal_cut = current_debt_principal;
    }

    const remaining_interest = total_interest_due - interest_cut;
    const remaining_principal = current_debt_principal - principal_cut;

    // 5. Generate Invoice Number
    const lastTx = await prisma.transaction.findFirst({
      orderBy: { invoice_number: "desc" },
    });
    let newInvoiceNumber = "TRX-000001";
    if (lastTx) {
      const lastNumber = parseInt(lastTx.invoice_number.split("-")[1]);
      newInvoiceNumber = `TRX-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // 6. Jalankan DB Transaction
    const result = await prisma.$transaction(async (tx) => {
      // A. Simpan data transaksi angsuran
      const transaction = await tx.transaction.create({
        data: {
          invoice_number: newInvoiceNumber,
          loan_account_id,
          processed_by_id,
          approved_by_id,
          amount_paid: total_paid,
          principal_cut,
          interest_cut,
          remaining_principal,
          remaining_interest,
          payment_method: payment_method || "Tunai",
          payment_attachment: payment_attachment || "",
          payment_status: "SUCCESS",
          paid_date: targetDate,
        },
      });

      // B. Update Saldo di LoanAccount
      await tx.loanAccount.update({
        where: { id: loan_account_id },
        data: {
          current_debt_principal: remaining_principal,
          current_debt_interest: remaining_interest,
          status: remaining_principal <= 0 ? "SETTLED" : loan.status,
        },
      });

      // C. Ledger 1: Pencatatan Pokok (Modal Kembali)
      if (principal_cut > 0) {
        await tx.capitalLedger.create({
          data: {
            amount: principal_cut,
            type: "REPAYMENT_PRINCIPAL", // Enum baru
            description: `Angsuran Pokok: ${loan.no_rekening} (${newInvoiceNumber})`,
            refrence_number: newInvoiceNumber,
            loan_account_id: loan.id,
            transaction_id: transaction.id, // Relasi ke transaksi
            created_by_id: processed_by_id,
          },
        });
      }

      // D. Ledger 2: Pencatatan Bunga (Keuntungan/Revenue)
      if (interest_cut > 0) {
        await tx.capitalLedger.create({
          data: {
            amount: interest_cut,
            type: "REPAYMENT_INTEREST", // Enum baru
            description: `Pendapatan Bunga: ${loan.no_rekening} (${newInvoiceNumber})`,
            refrence_number: newInvoiceNumber,
            loan_account_id: loan.id,
            transaction_id: transaction.id, // Relasi ke transaksi
            created_by_id: processed_by_id,
          },
        });
      }

      return transaction;
    });

    return NextResponse.json(
      {
        success: true,
        message: `Transaksi ${newInvoiceNumber} berhasil.`,
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
