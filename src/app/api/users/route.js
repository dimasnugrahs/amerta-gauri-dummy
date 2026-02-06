import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

/**
 * @method GET
 * @description Mengambil semua data user
 */

export async function GET() {
  try {
    // Ambil semua data customer dari database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        username: true,
        email: true,
        role: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data user masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Kesahalan saat mengambil data:", error);

    // 5. Pengecekan Tipe Error (Database vs Code)
    if (error.code === "P2021") {
      return NextResponse.json(
        { success: false, message: "Tabel database tidak ditemukan." },
        { status: 500 },
      );
    }

    // Respon Error Default
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal pada server.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
