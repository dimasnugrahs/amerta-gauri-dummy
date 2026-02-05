import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Ambil semua data customer dari database
    const users = await db.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Kesalahan saat mengambil data user:", error);
    return NextResponse.json(
      { message: "Kesalahan server internal." },
      { status: 500 },
    );
  }
}
