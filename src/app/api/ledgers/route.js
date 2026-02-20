import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// GET: Mengambil riwayat mutasi modal
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    // 1. Query Filter
    const where = {
      deleted_at: null,
      ...(type && { type }),
      ...(startDate &&
        endDate && {
          created_at: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
    };

    // 2. Ambil Mutasi Terperinci
    const ledgers = await prisma.capitalLedger.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { full_name: true } },
        loan_account: { select: { no_rekening: true } },
      },
    });

    // 3. Agregasi Saldo (Real-time)
    const summary = await prisma.capitalLedger.aggregate({
      where: { deleted_at: null },
      _sum: { amount: true },
    });

    // 4. Hitung Statistik Sederhana
    const stats = await prisma.capitalLedger.groupBy({
      by: ["type"],
      where: { deleted_at: null },
      _sum: { amount: true },
    });

    return NextResponse.json({
      success: true,
      current_balance: Number(summary._sum.amount || 0),
      stats: stats.map((s) => ({ type: s.type, total: Number(s._sum.amount) })),
      data: ledgers.map((l) => ({ ...l, amount: Number(l.amount) })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, type, description, notes, refrence_number } = body;

    // 1. Verifikasi Sesi
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);

    // 2. Logika Otomatis Positif/Negatif sesuai Enum Anda
    const negativeTypes = ["WITHDRAWAL", "DISBURSEMENT", "EXPENSE_OPS"];
    const positiveTypes = [
      "INJECTION",
      "REPAYMENT_PRINCIPAL",
      "REPAYMENT_INTEREST",
    ];

    let finalAmount = Number(amount);

    if (negativeTypes.includes(type)) {
      finalAmount = -Math.abs(finalAmount); // Paksa jadi minus (-)
    } else if (positiveTypes.includes(type)) {
      finalAmount = Math.abs(finalAmount); // Paksa jadi plus (+)
    }
    // Untuk ADJUSTMENT, biarkan sesuai input user (bisa plus atau minus)

    // 3. Simpan
    const ledger = await prisma.capitalLedger.create({
      data: {
        amount: finalAmount,
        type,
        description,
        notes,
        refrence_number,
        created_by_id: payload.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Berhasil mencatat mutasi ${type}`,
      data: ledger,
    });
  } catch (error) {
    console.error("LEDGER_POST_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan mutasi modal" },
      { status: 500 },
    );
  }
}
