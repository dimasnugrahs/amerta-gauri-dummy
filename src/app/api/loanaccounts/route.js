import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const loanaccount = await prisma.loanAccount.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        customer: { select: { full_name: true } },
        user: { select: { full_name: true } },
        product: { select: { product_name: true } },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!loanaccount || loanaccount.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data loan accounts masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      success: true,
      data: loanaccount,
    });
  } catch (error) {
    console.error("GET_LOAN_ACCOUNTS_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data loan accounts." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      marketing_id,
      customer_id,
      product_id,
      principal_amount,
      rate_percent,
      rate_amount,
      start_date,
      period_start,
      status,
    } = body;

    // 1. Verifikasi Sesi
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid, silakan login ulang." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const creator_id = payload.id; // ID Admin yang membuat rekening

    // 2. Validasi Input Wajib
    if (!marketing_id || !customer_id || !product_id || !principal_amount) {
      return NextResponse.json(
        { success: false, message: "Data utama wajib diisi!" },
        { status: 400 },
      );
    }

    // 3. Cari Relasi & Generate No Rekening
    const [marketing, customer, product, lastLoan] = await Promise.all([
      prisma.user.findFirst({ where: { id: marketing_id, deleted_at: null } }),
      prisma.customer.findFirst({
        where: { id: customer_id, deleted_at: null },
      }),
      prisma.product.findFirst({ where: { id: product_id, deleted_at: null } }),
      prisma.loanAccount.findFirst({ orderBy: { no_rekening: "desc" } }),
    ]);

    if (!marketing || !customer || !product) {
      return NextResponse.json(
        {
          success: false,
          message: "Data Marketing, Customer, atau Produk tidak valid.",
        },
        { status: 404 },
      );
    }

    let newNoRekening = "AG-000001";
    if (lastLoan) {
      const lastNumber = parseInt(lastLoan.no_rekening.split("-")[1]);
      newNoRekening = `AG-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // 4. Jalankan Transaksi DB (Account + Ledger)
    const result = await prisma.$transaction(async (tx) => {
      // A. Simpan ke LoanAccount
      const newLoan = await tx.loanAccount.create({
        data: {
          no_rekening: newNoRekening,
          marketing_id,
          customer_id,
          product_id,
          principal_amount: Number(principal_amount),
          rate_percent: Number(rate_percent || 0),
          rate_amount: Number(rate_amount || 0),
          current_debt_principal: Number(principal_amount),
          current_debt_interest: 0,
          start_date: start_date ? new Date(start_date) : new Date(),
          period_start: period_start ? new Date(period_start) : new Date(),
          status: status || "ACTIVE",
        },
      });

      // B. Catat Pengeluaran Modal di CapitalLedger (Nilai Negatif)
      // Menggunakan tipe LOAN (atau DISBURSEMENT jika sudah diupdate)
      await tx.capitalLedger.create({
        data: {
          amount: -Math.abs(Number(principal_amount)), // Paksa jadi negatif
          type: "LOAN", // Sesuai enum awal Anda (atau DISBURSEMENT)
          description: `Pencairan Pinjaman: ${newNoRekening} a.n ${customer.full_name}`,
          refrence_number: newNoRekening,
          loan_account_id: newLoan.id, // Link ke akun yang baru dibuat
          created_by_id: creator_id,
          notes: `Produk: ${product.name}`,
        },
      });

      return newLoan;
    });

    return NextResponse.json(
      {
        success: true,
        message: `Rekening ${newNoRekening} berhasil dibuat & modal telah didebit.`,
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST_LOAN_ERROR:", error);
    // ... Error handling Prisma (P2002, P2003) tetap sama
    return NextResponse.json(
      { success: false, message: "Kesalahan server." },
      { status: 500 },
    );
  }
}
