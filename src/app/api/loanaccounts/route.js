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

    // 1. Verifikasi Sesi (Tetap sama)
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Sesi habis" },
        { status: 401 },
      );

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const creator_id = payload.id;

    // 2. Validasi Relasi
    const [marketing, customer, product, lastLoan] = await Promise.all([
      prisma.user.findUnique({ where: { id: marketing_id } }),
      prisma.customer.findUnique({ where: { id: customer_id } }),
      prisma.product.findUnique({ where: { id: product_id } }),
      prisma.loanAccount.findFirst({ orderBy: { no_rekening: "desc" } }),
    ]);

    if (!marketing || !customer || !product) {
      return NextResponse.json(
        { success: false, message: "Data referensi tidak ditemukan." },
        { status: 404 },
      );
    }

    // 3. Generate No Rekening
    let newNoRekening = "AG-000001";
    if (lastLoan && lastLoan.no_rekening.includes("-")) {
      const lastNumber = parseInt(lastLoan.no_rekening.split("-")[1]);
      newNoRekening = `AG-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // 4. Transaksi Database
    const result = await prisma.$transaction(async (tx) => {
      // A. Create Loan Account
      // Gunakan penamaan field sesuai schema.prisma (customer_id, marketing_id, dll)
      const newLoan = await tx.loanAccount.create({
        data: {
          no_rekening: newNoRekening,
          marketing_id: marketing.id,
          customer_id: customer.id,
          product_id: product.id,
          principal_amount: parseFloat(principal_amount),
          rate_percent: parseFloat(rate_percent || 0),
          rate_amount: parseFloat(rate_amount || 0),
          current_debt_principal: parseFloat(principal_amount),
          current_debt_interest: 0,
          start_date: start_date ? new Date(start_date) : new Date(),
          period_start: period_start ? new Date(period_start) : new Date(),
          status: status || "ACTIVE",
        },
      });

      // B. Create Capital Ledger
      await tx.capitalLedger.create({
        data: {
          amount: -Math.abs(parseFloat(principal_amount)),
          type: "DISBURSEMENT", // Pastikan ENUM ini ada di schema.prisma Anda
          description: `Pencairan: ${newNoRekening} | ${customer.full_name || "Customer"}`,
          refrence_number: newNoRekening,
          loan_account_id: newLoan.id,
          created_by_id: creator_id,
        },
      });

      return newLoan;
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("POST_LOAN_ERROR:", error); // CEK TERMINAL UNTUK MELIHAT ERROR INI
    return NextResponse.json(
      { success: false, message: error.message || "Kesalahan server." },
      { status: 500 },
    );
  }
}
