import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * @method GET
 * @description Mengambil semua data product
 */

export async function GET() {
  try {
    // Ambil semua data product dari database
    const products = await prisma.product.findMany({
      select: {
        id: true,
        user_id: true,
        product_name: true,
        slug: true,
        description: true,
        price: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
      where: {
        deleted_at: null,
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data product masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        data: products,
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

export async function POST(request) {
  try {
    // get data from body request
    const body = await request.json();
    const { user_id, product_name, slug, description, price } = body;

    // 1. Validasi Input Wajib
    if (!user_id || !product_name || !price) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID, Nama Produk, dan Harga wajib diisi!",
        },
        { status: 400 },
      );
    }

    // 2. Membuat Slug Otomatis (Contoh: "Kopi Susu" -> "kopi-susu-12345")
    // Kita tambah suffix random agar slug selalu unik
    const generatedSlug =
      product_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);

    const newProduct = await prisma.product.create({
      data: {
        user_id: user_id,
        product_name: product_name,
        slug: generatedSlug,
        description: description,
        price: parseFloat(price) || 0,
      },
    });

    return NextResponse.json(
      { success: true, message: "Product berhasil dibuat", data: newProduct },
      { status: 201 },
    );
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Slug atau Nama Produk sudah ada, gunakan nama lain.",
        },
        { status: 409 },
      );
    }

    // Error jika User ID tidak ditemukan (Foreign Key Constraint)
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          success: false,
          message: "User ID tidak valid atau tidak ditemukan di sistem.",
        },
        { status: 400 },
      );
    }

    console.error("CREATE_PRODUCT_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
