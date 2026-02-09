import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        id: id,
        deleted_at: null,
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
        {
          success: false,
          message: "Produk tidak ditemukan atau sudah dihapus.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error("GET_PRODUCT_BY_ID_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    // 1. Ambil productId dengan benar (sesuai nama folder [productId])
    const { productId } = await params;

    // 2. Parse body request
    const body = await request.json();
    const { product_name, description, price, user_id } = body;

    // 3. Cek apakah produk exist DAN belum dihapus (Soft Delete check)
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        deleted_at: null, // Tambahkan ini agar produk yang sudah dihapus tidak bisa diupdate
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Produk tidak ditemukan atau sudah dihapus!",
        },
        { status: 404 },
      );
    }

    // 4. Bangun objek data yang akan diupdate secara dinamis
    const updateData = {};

    if (product_name) {
      updateData.product_name = product_name;
      updateData.slug = product_name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Gunakan !== undefined agar nilai falsey seperti 0 atau string kosong tetap bisa masuk
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (user_id) updateData.user_id = user_id;

    // 5. Validasi jika tidak ada data yang dikirim di body
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada data yang diubah." },
        { status: 400 },
      );
    }

    // 6. Eksekusi Update ke Database
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
    console.error("--- ERROR PATCH PRODUCT ---");
    console.error("Pesan Error:", error.message);

    // Error Duplikat Slug (P2002)
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Nama produk sudah digunakan, slug harus unik.",
        },
        { status: 409 },
      );
    }

    // Error Relasi User tidak ditemukan (P2003)
    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "User ID penjual tidak ditemukan." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal pada server.",
        error_detail:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { productId } = await params;

    // 1. Cek apakah produk ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan!" },
        { status: 404 },
      );
    }

    // 2. Jalankan Soft Delete (Update field deleted_at)
    await prisma.product.update({
      where: { id: productId },
      data: {
        deleted_at: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, message: "Produk berhasil dihapus (soft delete)." },
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
