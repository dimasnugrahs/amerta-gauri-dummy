import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // 1. Biarkan file statis dan internal Next.js lewat tanpa dicek
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("favicon.ico") ||
    pathname.includes(".") // Mengabaikan file dengan ekstensi (gambar, css, dll)
  ) {
    return NextResponse.next();
  }

  // 2. Verifikasi Token
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

  // 3. LOGIKA PROTEKSI RUTE

  // A. Jika mencoba masuk ke Dashboard tapi BELUM login
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // B. Jika SUDAH login tapi mencoba masuk ke Signin/Signup/Root
  const isAuthPage =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ini membantu memfilter request awal
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
