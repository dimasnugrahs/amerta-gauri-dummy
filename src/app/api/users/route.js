import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * @method GET
 * @description Mengambil semua data user
 */

export async function GET() {
  try {
    // Ambil semua data customer dari database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        username: true,
        email: true,
        role: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
      where: {
        deleted_at: null,
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data user masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Kesahalan saat mengambil data:", error);

    // Pengecekan Tipe Error (Database vs Code)
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
    const {
      full_name,
      username,
      email,
      password_hash,
      role,
      phone_number,
      birthday,
      address,
      regency,
      province,
      zip_code,
      images,
    } = body;

    if (!email || !username || !password_hash || !full_name) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, Username dan Password_hash wajib diisi!",
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

    // Validasi Password_hash (Min 6 karakter jika diisi)
    if (password_hash && password_hash.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password minimal harus 6 karakter!" },
        { status: 400 },
      );
    }

    // encryption
    const rawPassword_hash = password_hash || "password123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword_hash, salt);

    // format birthday
    const formattedBirthday = birthday ? new Date(birthday) : null;

    const newUser = await prisma.user.create({
      data: {
        full_name: full_name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: role || "ADMIN",
        phone_number: phone_number || "082100000000",
        birthday: formattedBirthday,
        address: address,
        regency: regency || "Belum ada data",
        province: province || "Belum ada data",
        zip_code: zip_code || "Belum ada data",
        images: images || "",
      },
    });

    return NextResponse.json(
      { success: true, message: "User berhasil dibuat", data: newUser },
      { status: 201 },
    );
  } catch (error) {
    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      const field = target.includes("email") ? "Email" : "Username";
      return NextResponse.json(
        { success: false, message: `${field} sudah terdaftar!` },
        { status: 409 },
      );
    }

    console.error("CRITICAL_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
