import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    const { transaction_id, notes } = await request.json();

    // 1. Verifikasi Sesi (Siapa yang melakukan reverse?)
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
    const reversed_by_id = payload.id;

    if (!transaction_id) {
      return NextResponse.json(
        { success: false, message: "ID Transaksi wajib diisi." },
        { status: 400 },
      );
    }

    // 2. Cari transaksi dan ambil data Ledger terkait
    const txToReverse = await prisma.transaction.findUnique({
      where: { id: transaction_id },
      include: {
        loan_account: true,
        capital_ledgers: true, // Ambil entri ledger yang pernah dibuat saat transaksi ini
      },
    });

    if (!txToReverse) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan." },
        { status: 404 },
      );
    }

    if (txToReverse.payment_status !== "SUCCESS") {
      return NextResponse.json(
        {
          success: false,
          message: "Hanya transaksi status SUCCESS yang dapat dibatalkan.",
        },
        { status: 400 },
      );
    }

    // 3. Jalankan DB Transaction
    const result = await prisma.$transaction(async (tx) => {
      // A. Update Saldo LoanAccount (Kembalikan nominal)
      await tx.loanAccount.update({
        where: { id: txToReverse.loan_account_id },
        data: {
          current_debt_principal: {
            increment: Number(txToReverse.principal_cut),
          },
          current_debt_interest: {
            increment: Number(txToReverse.interest_cut),
          },
          status: "ACTIVE", // Pastikan kembali ACTIVE
        },
      });

      // B. Update status transaksi menjadi REFUNDED
      const updatedTx = await tx.transaction.update({
        where: { id: transaction_id },
        data: { payment_status: "REFUNDED" },
      });

      // C. REVERSE CAPITAL LEDGER
      // Untuk setiap entri (Pokok & Bunga) yang ada di transaksi ini, buatkan kebalikannya
      for (const entry of txToReverse.capital_ledgers) {
        await tx.capitalLedger.create({
          data: {
            amount: -Number(entry.amount), // Membalikkan angka (jadi negatif)
            type: entry.type,
            description: `[REVERSAL] ${entry.description}`,
            refrence_number: entry.refrence_number,
            loan_account_id: entry.loan_account_id,
            transaction_id: entry.transaction_id,
            created_by_id: reversed_by_id, // Admin yang melakukan pembatalan
            notes: notes || "Pembatalan transaksi oleh admin.",
          },
        });
      }

      return updatedTx;
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Transaksi dibatalkan. Saldo piutang dan modal telah disesuaikan.",
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("REVERSE_TRANSACTION_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
