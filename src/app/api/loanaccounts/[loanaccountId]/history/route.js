import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { loanaccountId } = await params;

    const account = await prisma.loanAccount.findUnique({
      where: {
        no_rekening: loanaccountId,
      },
      include: {
        customer: true,
        product: true,
        // SESUAIKAN DENGAN SCHEMA ANDA:
        transactions: {
          orderBy: { created_at: "asc" },
          where: { payment_status: "SUCCESS" },
        },
      },
    });

    if (!account) {
      return NextResponse.json(
        { success: false, message: "Rekening tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: account });
  } catch (error) {
    console.error("API_ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
