import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery =
      searchParams.get("query") || searchParams.get("no_rekening");

    if (!searchQuery) {
      return NextResponse.json(
        { success: false, message: "Parameter kosong." },
        { status: 400 },
      );
    }

    // Tentukan range bulan sekarang (sama dengan logika POST)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const loans = await prisma.loanAccount.findMany({
      where: {
        deleted_at: null,
        status: { not: "SETTLED" },
        OR: [
          { no_rekening: { contains: searchQuery, mode: "insensitive" } },
          {
            customer: {
              full_name: { contains: searchQuery, mode: "insensitive" },
            },
          },
        ],
      },
      include: {
        customer: true,
        // Ambil data transaksi bulan ini jika ada
        transactions: {
          where: {
            payment_status: "SUCCESS",
            paid_date: { gte: startOfMonth, lte: endOfMonth },
          },
          take: 1, // Cukup ambil 1 saja untuk verifikasi
        },
      },
      take: 10,
    });

    const safeData = loans.map((loan) => {
      // Logic: Jika ada transaksi di array transactions, berarti sudah bayar bulan ini
      const alreadyPaidThisMonth = loan.transactions.length > 0;

      return {
        ...loan,
        current_debt_principal: Number(loan.current_debt_principal || 0),
        current_debt_interest: Number(loan.current_debt_interest || 0),
        rate_amount: Number(loan.rate_amount || 0),
        // Tambahkan flag ini agar Frontend tahu statusnya
        has_transaction_this_month: alreadyPaidThisMonth,
        // Hapus array transactions agar response tidak terlalu berat
        transactions: undefined,
      };
    });

    return NextResponse.json({ success: true, data: safeData });
  } catch (error) {
    console.error("SEARCH_LOAN_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
