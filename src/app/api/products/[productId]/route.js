import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// 1. GET PRODUCT BY ID
export async function GET(request, { params }) {
  try {
    const { productId } = await params;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        deleted_at: null, // Memastikan produk belum dihapus (soft delete)
      },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error("GET_PRODUCT_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat mengambil data.",
      },
      { status: 500 },
    );
  }
}

// 2. PATCH (UPDATE) PRODUCT
export async function PATCH(request, { params }) {
  try {
    const { productId } = await params;

    // --- Verifikasi Token (Auth) ---
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);
    const userIdFromToken = payload.id;

    // --- Parse Body ---
    const body = await request.json();
    const { product_name, description, price } = body;

    // Cek keberadaan produk
    const existingProduct = await prisma.product.findFirst({
      where: { id: productId, deleted_at: null },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan!" },
        { status: 404 },
      );
    }

    // --- Bangun Objek Update ---
    const updateData = {
      user_id: userIdFromToken, // Mencatat siapa yang terakhir mengedit
    };

    if (product_name) {
      updateData.product_name = product_name;
      // Generate slug baru jika nama produk berubah
      updateData.slug = product_name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);

    // --- Eksekusi Update ---
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Produk berhasil diperbarui!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("PATCH_PRODUCT_ERROR:", error);

    // Tangani error jika slug duplikat
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Nama produk sudah digunakan (slug duplikat).",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

// 3. DELETE (SOFT DELETE) PRODUCT
export async function DELETE(request, { params }) {
  try {
    const { productId } = await params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan!" },
        { status: 404 },
      );
    }

    // Soft Delete: Hanya mengisi kolom deleted_at
    await prisma.product.update({
      where: { id: productId },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(
      { success: true, message: "Produk berhasil dihapus." },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk." },
      { status: 500 },
    );
  }
}
