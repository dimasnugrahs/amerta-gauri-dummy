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

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan!" },
        { status: 404 },
      );
    }

    // KRUCIAL: Buat objek update hanya dengan field yang ada di skema Prisma
    // Kita pisahkan manual untuk menghindari field "sampah" masuk ke Prisma
    const updateData = {
      full_name: body.full_name,
      username: body.username,
      email: body.email,
      phone_number: body.phone_number,
      role: body.role,
      isActive: Boolean(body.isActive), // Pastikan boolean
      address: body.address,
      regency: body.regency,
      province: body.province,
      zip_code: body.zip_code,
    };

    // Logika Password
    if (body.password && body.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(body.password, salt);
    }

    // Logika Birthday
    if (body.birthday) {
      updateData.birthday = new Date(body.birthday);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password_hash, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      message: "Data user berhasil diperbarui!",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("UPDATE_USER_ERROR:", error); // Lihat error spesifik di terminal console Anda
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Email atau Username sudah digunakan!" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Server Error: " + error.message },
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
