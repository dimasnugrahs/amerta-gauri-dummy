import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/src/lib/prisma";

export async function GET(request) {
  try {
    const token = request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    const { payload } = await jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { full_name: true, role: true, username: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
