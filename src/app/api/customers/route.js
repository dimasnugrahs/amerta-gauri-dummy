import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

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
      user_id,
      full_name,
      phone_number,
      isActive,
      address,
      regency,
      province,
      zip_code,
      job,
    } = body;

    // Input Wajib
    if (!user_id || !full_name) {
      return NextResponse.json(
        {
          success: false,
          message: "Field user_id, full_name dan phone_number wajib diisi!",
        },
        { status: 400 },
      );
    }

    // Simpan ke Database
    const newCustomer = await prisma.customer.create({
      data: {
        user_id: user_id,
        full_name: full_name,
        phone_number: phone_number || "Belum ada data",
        isActive: typeof isActive === "boolean" ? isActive : true,
        address: address || null,
        regency: regency || null,
        province: province || null,
        zip_code: zip_code || null,
        job: job || null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Customer berhasil dibuat", data: newCustomer },
      { status: 201 },
    );
  } catch (error) {
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          success: false,
          message: "User ID tidak valid atau tidak ditemukan.",
        },
        { status: 400 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau nomor telepon sudah terdaftar.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
        debug_error: error.message,
      },
      { status: 500 },
    );
  }
}
