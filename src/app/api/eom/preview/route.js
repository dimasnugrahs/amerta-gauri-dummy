import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    // Tentukan awal dan akhir bulan berjalan
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    // 1. Cek apakah bulan ini sudah pernah EOM (mencegah double process)
    const alreadyEom = await prisma.eomLog.findUnique({
      where: {
        period_month_period_year: {
          period_month: now.getMonth() + 1,
          period_year: now.getFullYear(),
        },
      },
    });

    if (alreadyEom) {
      return NextResponse.json({
        success: false,
        message: "Proses Tutup Buku (EOM) untuk bulan ini sudah dilakukan.",
        alreadyDone: true,
        data: alreadyEom,
      });
    }

    // 2. Cari LoanAccount yang ACTIVE dan TIDAK bayar angsuran bulan ini
    const targets = await prisma.loanAccount.findMany({
      where: {
        status: "ACTIVE",
        deleted_at: null,
        current_debt_principal: { gt: 0 },
        // Logika: Cari yang TIDAK memiliki transaksi sukses di bulan ini
        transactions: {
          none: {
            paid_date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
            payment_status: {
              in: ["SUCCESS", "REFUNDED"],
            },
          },
        },
      },
      include: {
        customer: true,
      },
    });

    // 3. Hitung ringkasan (Summary)
    const summary = {
      total_accounts: targets.length,
      total_potential_interest: targets.reduce(
        (acc, curr) => acc + Number(curr.rate_amount),
        0,
      ),
      period: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        name: now.toLocaleString("id-ID", { month: "long" }),
      },
    };

    return NextResponse.json({
      success: true,
      summary,
      data: targets.map((t) => ({
        id: t.id,
        no_rekening: t.no_rekening,
        customer_name: t.customer?.full_name,
        rate_amount: Number(t.rate_amount),
        current_debt_interest: Number(t.current_debt_interest),
        current_debt_principal: Number(t.current_debt_principal),
      })),
    });
  } catch (error) {
    console.error("EOM_PREVIEW_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data preview EOM." },
      { status: 500 },
    );
  }
}
