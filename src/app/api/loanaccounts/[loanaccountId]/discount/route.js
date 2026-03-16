import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/src/lib/prisma";

export async function POST(req, { params }) {
  try {
    // 1. Verifikasi Sesi via JWT (Cara yang Anda minta)
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token tidak ditemukan" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const adminId = payload.id; // ID admin dari token

    // 2. Ambil Params dan Body
    const resolvedParams = await params;
    const { loanaccountId } = resolvedParams; // Ini adalah no_rekening
    const { amount, type, description } = await req.json();

    // 3. Validasi Input Dasar
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Nominal harus lebih dari 0" },
        { status: 400 },
      );
    }

    // 4. Eksekusi Transaction
    const result = await prisma.$transaction(async (tx) => {
      // A. Cari LoanAccount berdasarkan no_rekening
      const loan = await tx.loanAccount.findUnique({
        where: { no_rekening: loanaccountId },
      });

      if (!loan) {
        throw new Error(`Rekening ${loanaccountId} tidak ditemukan`);
      }

      // B. Tentukan field dan tipe ledger
      const isPokok = type === "POKOK";
      const targetField = isPokok
        ? "current_debt_principal"
        : "current_debt_interest";
      const ledgerType = isPokok ? "DISCOUNT_PRINCIPAL" : "DISCOUNT_INTEREST";

      // C. Validasi Saldo Hutang
      if (Number(loan[targetField]) < amount) {
        throw new Error(
          `Diskon Rp${amount.toLocaleString()} melebihi sisa hutang ${type.toLowerCase()} (Rp${Number(loan[targetField]).toLocaleString()})`,
        );
      }

      // D. Potong Hutang di LoanAccount
      const updatedLoan = await tx.loanAccount.update({
        where: { no_rekening: loanaccountId },
        data: {
          [targetField]: { decrement: amount },
        },
      });

      // E. Catat di CapitalLedger dengan created_by_id dari JWT
      const newLedger = await tx.capitalLedger.create({
        data: {
          loan_account_id: loan.id, // ID internal database
          created_by_id: adminId, // ID dari hasil verifikasi JWT
          amount: -Math.abs(amount), // Dipaksa negatif karena diskon mengurangi aset
          type: ledgerType,
          description:
            description ||
            `Diskon ${type.toLowerCase()} untuk rek ${loan.no_rekening}`,
          refrence_number: loan.no_rekening,
        },
      });

      return { updatedLoan, newLedger };
    });

    return NextResponse.json({
      success: true,
      message: `Diskon ${type.toLowerCase()} berhasil diterapkan`,
      data: result,
    });
  } catch (error) {
    console.error("API_DISCOUNT_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memproses diskon",
      },
      { status: 500 },
    );
  }
}
