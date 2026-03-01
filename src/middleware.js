import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // 1. Biarkan file statis lewat
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Verifikasi Token dan Ambil Payload
  let payload = null;
  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
      const verified = await jwtVerify(token, secret);
      payload = verified.payload; // Mengambil data user (id, role, dll)
    }
  } catch (error) {
    payload = null;
  }

  const isAuthenticated = !!payload;

  // 3. LOGIKA PROTEKSI RUTE

  // A. Proteksi Dashboard: Belum Login
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // B. Proteksi Dashboard: Role USER dilarang masuk
  // User dengan role "USER" akan dilempar ke halaman unauthorized
  if (pathname.startsWith("/dashboard") && payload?.role === "USER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // C. Jika SUDAH login (dan Role bukan USER) tapi mencoba ke Auth Page
  const isAuthPage =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";
  if (isAuthPage && isAuthenticated && payload?.role !== "USER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
