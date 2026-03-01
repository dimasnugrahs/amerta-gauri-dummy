import { NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import prisma from "@/src/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, username, password, full_name } = body;

    // Validasi Keberadaan Data Wajib
    if (!email || !username || !password || !full_name) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, Username, Password, dan Nama Lengkap wajib diisi!",
        },
        { status: 400 },
      );
    }

    // Validasi Format Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid!" },
        { status: 400 },
      );
    }

    // Validasi Username (Min 3 karakter, no space)
    if (username.length < 3 || /\s/.test(username)) {
      return NextResponse.json(
        {
          success: false,
          message: "Username minimal 3 karakter dan tidak boleh ada spasi!",
        },
        { status: 400 },
      );
    }

    // Validasi Password (Min 6 karakter)
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password minimal harus 6 karakter!" },
        { status: 400 },
      );
    }

    // Encryption menggunakan bcryptjs
    const hashedPassword = hashSync(password, 10);

    // Simpan User ke Database dengan default values
    const newUser = await prisma.user.create({
      data: {
        full_name: full_name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: "USER",
        phone_number: "082100000000",
        birthday: null,
        address: "Belum diisi",
        regency: "Belum ada data",
        province: "Belum ada data",
        zip_code: "00000",
        images: "",
      },
    });

    const { password_hash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil, silakan login",
        data: userWithoutPassword,
      },
      { status: 201 },
    );
  } catch (error) {
    // Handle Error Duplicate (P2002 adalah kode Prisma untuk Unique Constraint)
    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      const field = target.includes("email") ? "Email" : "Username";
      return NextResponse.json(
        { success: false, message: `${field} sudah terdaftar!` },
        { status: 409 },
      );
    }

    // Log internal tetap ada di server, tapi tidak dikirim ke user
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat registrasi." },
      { status: 500 },
    );
  }
}
