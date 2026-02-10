import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // Verifikasi Token
  let isAuthenticated = false;
  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
      await jwtVerify(token, secret);
      isAuthenticated = true;
    }
  } catch (error) {
    isAuthenticated = false;
  }

  // Tentukan rute publik (Pindahkan ke atas sebelum pengecekan if)
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/api/auth");

  // LOGIKA REDIRECT

  // Jika sudah login tapi akses halaman login, lempar ke dashboard
  if (isAuthenticated && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika BELUM login dan mencoba akses rute yang BUKAN publik
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Lanjutkan jika semua kondisi aman
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
