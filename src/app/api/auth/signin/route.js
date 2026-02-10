import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/src/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const loginId = body.loginId || body.email || body.username;
    const password = body.password;

    if (!loginId || !password) {
      return NextResponse.json(
        { message: "ID Login dan Password wajib diisi" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: loginId }, { username: loginId }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 },
      );
    }

    const isPasswordValid = compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 },
      );
    }

    const secretKey = process.env.JWT_ACCESS_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Terjadi kesalahan konfigurasi pada server" },
        { status: 500 },
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        username: user.username,
      },
      secretKey,
      { expiresIn: "1y" },
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
        user: {
          id: user.id,
          full_name: user.full_name,
          role: user.role,
        },
      },
      { status: 200 },
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    // Error internal tidak dikirim ke pengguna untuk keamanan
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
