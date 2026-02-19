import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const loanaccount = await prisma.loanAccount.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        customer: { select: { full_name: true } },
        user: { select: { full_name: true } },
        product: { select: { product_name: true } },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!loanaccount || loanaccount.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Data loan accounts masih kosong.",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      success: true,
      data: loanaccount,
    });
  } catch (error) {
    console.error("GET_LOAN_ACCOUNTS_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data loan accounts." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      marketing_id,
      customer_id,
      product_id,
      principal_amount,
      rate_percent,
      rate_amount,
      start_date,
      period_start,
      status,
    } = body;

    // Verifikasi Sesi
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid, silakan login ulang." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_KEY);
    await jwtVerify(token, secret);

    // Validasi Input Wajib
    if (!marketing_id || !customer_id || !product_id || !principal_amount) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data utama (Marketing, Customer, Produk, & Plafon) wajib diisi!",
        },
        { status: 400 },
      );
    }

    const lastLoan = await prisma.loanAccount.findFirst({
      orderBy: { no_rekening: "desc" },
    });

    let newNoRekening = "AG-000001";
    if (lastLoan) {
      // Mengambil angka setelah "AG-", menambah 1, dan padding 6 digit nol
      const lastNumber = parseInt(lastLoan.no_rekening.split("-")[1]);
      newNoRekening = `AG-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    const [marketing, customer, product] = await Promise.all([
      prisma.user.findFirst({ where: { id: marketing_id, deleted_at: null } }),
      prisma.customer.findFirst({
        where: { id: customer_id, deleted_at: null },
      }),
      prisma.product.findFirst({ where: { id: product_id, deleted_at: null } }),
    ]);

    if (!marketing || !customer || !product) {
      let missingFields = [];
      if (!marketing) missingFields.push("Marketing");
      if (!customer) missingFields.push("Customer");
      if (!product) missingFields.push("Produk");

      return NextResponse.json(
        {
          success: false,
          message: `Data berikut tidak ditemukan atau sudah tidak aktif: ${missingFields.join(", ")}.`,
        },
        { status: 404 },
      );
    }

    // Simpan ke Database
    const newLoan = await prisma.loanAccount.create({
      data: {
        no_rekening: newNoRekening,
        marketing_id,
        customer_id,
        product_id,

        principal_amount: Number(principal_amount),
        rate_percent: Number(rate_percent || 0),
        rate_amount: Number(rate_amount || 0),

        current_debt_principal: Number(principal_amount),
        current_debt_interest: Number(0),

        start_date: start_date ? new Date(start_date) : new Date(),
        period_start: period_start ? new Date(period_start) : new Date(),

        status: status || "ACTIVE",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Loan Account ${newNoRekening} berhasil dibuat`,
        data: newLoan,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST_LOAN_ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor rekening sudah terdaftar di sistem.",
        },
        { status: 400 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "Relasi data tidak valid secara database." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
