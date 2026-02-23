import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

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

    // Pengecekan Tipe Error
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
    // 1. Verifikasi Sesi User (Mengambil user_id dari Token)
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid atau telah berakhir." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);

    // Inilah ID user yang sedang login/menginput data
    const creator_id = payload.id;

    // 2. Ambil data dari Body
    const body = await request.json();
    const { product_name, description, price } = body;

    // 3. Validasi Input (user_id tidak perlu lagi ada di body)
    if (!product_name || price === undefined) {
      return NextResponse.json(
        { success: false, message: "Nama produk dan harga wajib diisi." },
        { status: 400 },
      );
    }

    // 4. Generate Slug
    const generatedSlug = product_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 5. Simpan ke Database
    const newProduct = await prisma.product.create({
      data: {
        user_id: creator_id, // Menggunakan ID dari Token JWT
        product_name: product_name.trim(),
        slug: generatedSlug,
        description: description || "",
        price: parseFloat(price),
        isActive: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Produk berhasil dibuat", data: newProduct },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR:", error);

    // Error JWT (Token Kadaluarsa/Salah)
    if (error.code === "ERR_JWT_EXPIRED" || error.code === "ERR_JWS_INVALID") {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid, silakan login kembali." },
        { status: 401 },
      );
    }

    // Error Prisma: Foreign Key (User tidak ada di DB)
    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "User pembuat tidak valid di sistem." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
