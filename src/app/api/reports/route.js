import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get("start_date");
    const endDateParam = searchParams.get("end_date");

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter start_date dan end_date diperlukan",
        },
        { status: 400 },
      );
    }

    const start = new Date(startDateParam);
    const end = new Date(endDateParam);
    end.setHours(23, 59, 59, 999); // Set ke akhir hari

    /**
     * LOGIKA NERACA:
     * 1. AKTIVA (Aset): Posisi kas dan piutang akumulatif sampai TANGGAL AKHIR (end_date).
     * 2. PASIVA (Modal & Laba): Sumber dana akumulatif sampai TANGGAL AKHIR (end_date).
     */

    const [cashData, loanData, profitData] = await Promise.all([
      // 1. Hitung Total Kas (Akumulatif s/d end_date)
      prisma.capitalLedger.aggregate({
        where: {
          created_at: { lte: end },
          deleted_at: null,
        },
        _sum: { amount: true },
      }),

      // 2. Hitung Total Piutang Pokok (Outstanding s/d end_date)
      // Ini adalah uang perusahaan yang masih ada di tangan nasabah
      prisma.loanAccount.aggregate({
        where: {
          start_date: { lte: end },
          status: "ACTIVE",
          deleted_at: null,
        },
        _sum: { current_debt_principal: true },
      }),

      // 3. Hitung Rincian Laba/Rugi (Dalam Range periode)
      prisma.capitalLedger.groupBy({
        by: ["type"],
        where: {
          created_at: { gte: start, lte: end },
          deleted_at: null,
          type: {
            in: ["REPAYMENT_INTEREST", "EXPENSE_OPS", "INJECTION"],
          },
        },
        _sum: { amount: true },
      }),
    ]);

    // Mapping hasil Profit & Loss
    const stats = profitData.reduce((acc, curr) => {
      acc[curr.type] = Number(curr._sum.amount || 0);
      return acc;
    }, {});

    const cashBalance = Number(cashData._sum.amount || 0);
    const outstandingPrincipal = Number(
      loanData._sum.current_debt_principal || 0,
    );

    // Hitung Laba Bersih Periode Berjalan
    const interestRevenue = stats["REPAYMENT_INTEREST"] || 0;
    const operationalExpense = Math.abs(stats["EXPENSE_OPS"] || 0);
    const netProfit = interestRevenue - operationalExpense;

    // Response Data Matang untuk PDF
    return NextResponse.json({
      success: true,
      report_info: {
        range: { start, end },
        generated_at: new Date(),
      },
      // BAGIAN KIRI NERACA
      assets: {
        cash_on_hand: cashBalance,
        loan_receivables: outstandingPrincipal,
        total_assets: cashBalance + outstandingPrincipal,
      },
      // BAGIAN KANAN NERACA
      liabilities_equity: {
        capital_injection: stats["INJECTION"] || 0,
        retained_earnings: 0, // Bisa dikembangkan dengan mengambil profit periode sebelumnya
        current_period_profit: netProfit,
        total_equity: (stats["INJECTION"] || 0) + netProfit,
      },
    });
  } catch (error) {
    console.error("REPORT_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memproses laporan" },
      { status: 500 },
    );
  }
}
