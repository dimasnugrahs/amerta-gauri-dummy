import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request) {
  try {
    const { transaction_id } = await request.json();

    if (!transaction_id) {
      return NextResponse.json(
        { success: false, message: "ID Transaksi wajib diisi." },
        { status: 400 },
      );
    }

    // Cari transaksi yang akan dibatalkan
    const txToReverse = await prisma.transaction.findUnique({
      where: { id: transaction_id },
      include: { loan_account: true },
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
          message: "Hanya transaksi sukses yang dapat dibatalkan.",
        },
        { status: 400 },
      );
    }

    // Jalankan DB Transaction untuk mengembalikan saldo
    const reversedResult = await prisma.$transaction(async (tx) => {
      // Update Saldo LoanAccount (Kembalikan nominal yang pernah dipotong)
      const updatedLoan = await tx.loanAccount.update({
        where: { id: txToReverse.loan_account_id },
        data: {
          current_debt_principal: {
            increment: Number(txToReverse.principal_cut),
          },
          current_debt_interest: {
            increment: Number(txToReverse.interest_cut),
          },
          // Kembalikan status ke ACTIVE jika sebelumnya sempat SETTLED
          status: "ACTIVE",
        },
      });

      // Update status transaksi menjadi REFUNDED
      const updatedTx = await tx.transaction.update({
        where: { id: transaction_id },
        data: {
          payment_status: "REFUNDED",
          // Opsional: Catat siapa yang melakukan pembatalan jika diperlukan
        },
      });

      return { updatedLoan, updatedTx };
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi berhasil dibatalkan dan saldo telah dikembalikan.",
        data: reversedResult,
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
