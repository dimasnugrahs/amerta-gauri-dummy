import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data user masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("GET_CUSTOMERS_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data customer." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      full_name,
      phone_number,
      isActive,
      address,
      regency,
      province,
      zip_code,
      job,
    } = body;

    // id user -- user yg login (verifikasi user)
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid, silakan login ulang." },
        { status: 401 },
      );
    }

    // ambil token
    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const userIdFromToken = payload.id;

    // Validasi Input Wajib (Hanya full_name, user_id sudah otomatis)
    if (!full_name) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap wajib diisi!" },
        { status: 400 },
      );
    }

    // Simpan ke Database
    const newCustomer = await prisma.customer.create({
      data: {
        user_id: userIdFromToken,
        full_name,
        ...(address && { address }),
        ...(phone_number && { phone_number }),
        ...(regency && { regency }),
        ...(province && { province }),
        ...(zip_code && { zip_code }),
        ...(job && { job }),
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Customer berhasil dibuat", data: newCustomer },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST_CUSTOMER_ERROR:", error);

    // Penanganan error Prisma yang spesifik
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Data sudah terdaftar di sistem." },
        { status: 400 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "Relasi User tidak valid." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
