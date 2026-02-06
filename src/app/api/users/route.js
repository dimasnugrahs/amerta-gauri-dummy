
import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";

export async function GET() {
  try {
    // Ambil semua data customer dari database
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Kesalahan saat mengambil data user:", error);
    return NextResponse.json(
      { message: "Kesalahan server internal." },
      { status: 500 },
    );
  }
}
