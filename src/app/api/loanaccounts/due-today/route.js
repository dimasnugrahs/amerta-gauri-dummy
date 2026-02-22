import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const dueLoans = await prisma.loanAccount.findMany({
      where: {
        status: "ACTIVE",
        period_start: {
          lte: endOfToday,
        },
        // Logika Baru: Cari yang tidak punya transaksi dengan potongan bunga bulan ini
        transactions: {
          none: {
            interest_cut: {
              gt: 0, // Transaksi yang ada bayar bunganya
            },
            created_at: {
              gte: startOfMonth,
              lte: endOfToday,
            },
            payment_status: "SUCCESS", // Pastikan transaksinya berhasil
          },
        },
        current_debt_interest: {
          gt: 0,
        },
      },
      include: {
        customer: true,
      },
      orderBy: {
        period_start: "asc",
      },
    });

    const formattedData = dueLoans.map((loan) => ({
      id: loan.id,
      loan_number: loan.no_rekening,
      customer_name: loan.customer?.full_name || "Tanpa Nama",
      phone_number: loan.customer?.phone_number || "",
      interest_due: Number(loan.current_debt_interest || 0),
      due_date: loan.period_start,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("DUE_INTEREST_API_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error: " + error.message },
      { status: 500 },
    );
  }
}
