import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    // Tentukan awal bulan ini (Tanggal 1, jam 00:00:00)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Tentukan akhir bulan ini (Opsional, untuk membatasi range)
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    /**
     * LOGIKA: Ambil semua rekening aktif yang TIDAK PUNYA transaksi
     * sukses di bulan ini.
     */
    const arrearsAccounts = await prisma.loanAccount.findMany({
      where: {
        status: "ACTIVE",
        deleted_at: null,
        // Syarat utama: Tidak ada transaksi pada rentang bulan ini
        transactions: {
          none: {
            AND: [
              {
                paid_date: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
              },
              { payment_status: "SUCCESS" },
              { deleted_at: null }, // Pastikan transaksi yang dibatalkan tidak dianggap sebagai pembayaran
            ],
          },
        },
        // Opsional: Pastikan akun ini sudah cair sebelum atau pada bulan ini
        start_date: {
          lte: endOfMonth,
        },
      },
      include: {
        customer: true,
        product: true,
      },
    });

    /**
     * Karena Anda ingin 2 list fitur di dashboard,
     * kita bisa membagi arrearsAccounts ini menjadi dua kategori di backend:
     * 1. principalDue: Mereka yang sudah lewat tanggal jatuh temponya di bulan ini.
     * 2. interestDue: Semua yang belum bayar bunga bulan ini (termasuk yang belum jatuh tempo).
     */

    const principalDue = arrearsAccounts.filter((acc) => {
      // Misal: Jatuh tempo dianggap lewat jika hari ini > tanggal start_date bulan ini
      return new Date(acc.start_date).getDate() <= today.getDate();
    });

    const interestDue = arrearsAccounts; // Semua yang belum bayar bulan ini

    return NextResponse.json({
      success: true,
      data: {
        principalDue, // List yang sudah lewat tanggal bayarnya bulan ini
        interestDue, // Semua yang belum bayar di bulan ini
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
