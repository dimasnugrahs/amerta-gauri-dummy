import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  try {
    // Ambil ID dari URL parameter
    const { userId } = await params;

    // Cari user berdasarkan ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        deleted_at: null,
      },
    });

    // Cek jika user tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan!" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("GET_USER_BY_ID_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { userId } = await params;
    const body = await request.json();

    // 1. Cek apakah user ada di database
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan!" },
        { status: 404 },
      );
    }

    // 2. Persiapan Data Update
    const updateData = { ...body };

    // 3. Logika Khusus jika Password ikut diupdate
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(body.password, salt);
    }

    // 4. Logika Khusus jika Birthday ikut diupdate
    if (body.birthday) {
      updateData.birthday = new Date(body.birthday);
    }

    // 5. Eksekusi Update ke Database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Data user berhasil diperbarui!",
      data: updatedUser,
    });
  } catch (error) {
    // Tangani jika username atau email baru ternyata sudah dipakai orang lain
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Email atau Username sudah digunakan!" },
        { status: 409 },
      );
    }

    console.error("UPDATE_USER_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = await params;

    // 1. Tetap cek apakah usernya ADA dan BELUM dihapus
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deleted_at: null, // Pastikan dia memang user aktif
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan atau sudah dihapus." },
        { status: 404 },
      );
    }

    // 2. Lakukan Soft Delete
    await prisma.user.update({
      where: { id: userId },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "User berhasil dinonaktifkan.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error server." },
      { status: 500 },
    );
  }
}
