import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request, { params }) {
  const { loanaccountId } = await params;

  try {
    const loanaccount = await prisma.loanAccount.findFirst({
      where: {
        no_rekening: loanaccountId,
        deleted_at: null,
      },
      include: {
        customer: {
          select: {
            full_name: true,
            phone_number: true,
          },
        },
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
        product: {
          select: {
            product_name: true,
          },
        },
      },
    });

    if (!loanaccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Account tidak ditemukan atau telah dihapus.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: loanaccount,
    });
  } catch (error) {
    console.error("GET_LOAN_ACCOUNT_DETAIL_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengambil detail account.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { loanaccountId } = await params;
    const body = await request.json();

    const {
      marketing_id,
      product_id,
      principal_amount,
      rate_percent,
      rate_amount,
      start_date,
      period_start,
      current_debt_principal,
      current_debt_interest,
      status,
    } = body;

    // check account
    const existingLoanAccount = await prisma.loanAccount.findFirst({
      where: { no_rekening: loanaccountId, deleted_at: null },
    });

    if (!existingLoanAccount) {
      return NextResponse.json(
        { success: false, message: "Account tidak ditemukan!" },
        { status: 404 },
      );
    }

    // update data
    const updatedLoan = await prisma.loanAccount.update({
      where: {
        id: existingLoanAccount.id,
      },
      data: {
        marketing_id: marketing_id ?? existingLoanAccount.marketing_id,
        product_id: product_id ?? existingLoanAccount.product_id,

        principal_amount:
          principal_amount !== undefined
            ? Number(principal_amount)
            : existingLoanAccount.principal_amount,
        rate_percent:
          rate_percent !== undefined
            ? Number(rate_percent)
            : existingLoanAccount.rate_percent,
        rate_amount:
          rate_amount !== undefined
            ? Number(rate_amount)
            : existingLoanAccount.rate_amount,

        current_debt_principal:
          current_debt_principal !== undefined
            ? Number(current_debt_principal)
            : existingLoanAccount.current_debt_principal,
        current_debt_interest:
          current_debt_interest !== undefined
            ? Number(current_debt_interest)
            : existingLoanAccount.current_debt_interest,

        start_date: start_date
          ? new Date(start_date)
          : existingLoanAccount.start_date,
        period_start: period_start
          ? new Date(period_start)
          : existingLoanAccount.period_start,

        status: status ?? existingLoanAccount.status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data Loan Account berhasil diperbarui.",
      data: updatedLoan,
    });
  } catch (error) {
    console.error("PATCH_LOAN_ERROR:", error);

    if (error.code === "P2003") {
      return NextResponse.json(
        {
          success: false,
          message: "Relasi Marketing atau Produk tidak valid.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat update data." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { loanaccountId } = await params; // loanaccountId ini adalah no_rekening

    const result = await prisma.$transaction(async (tx) => {
      // 1. Cek account
      const existingLoanAccount = await tx.loanAccount.findFirst({
        where: { no_rekening: loanaccountId, deleted_at: null },
      });

      if (!existingLoanAccount) {
        throw new Error("ACCOUNT_NOT_FOUND");
      }

      // 2. Update LoanAccount (Soft Delete)
      const updatedLoan = await tx.loanAccount.update({
        where: { no_rekening: loanaccountId },
        data: { deleted_at: new Date() },
      });

      // 3. Sinkronisasi Modal (CapitalLedger)
      // Opsi A: Jika CapitalLedger juga pakai soft delete
      await tx.capitalLedger.updateMany({
        where: { loan_account_id: existingLoanAccount.id },
        data: { deleted_at: new Date() },
      });

      /* Opsi B: Jika CapitalLedger TIDAK pakai soft delete, gunakan:
         await tx.capitalLedger.deleteMany({
           where: { loan_account_id: existingLoanAccount.id }
         });
      */

      return updatedLoan;
    });

    return NextResponse.json(
      { success: true, message: "Account dan riwayat modal berhasil dihapus." },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_LOAN_ACCOUNT_ERROR:", error);

    if (error.message === "ACCOUNT_NOT_FOUND") {
      return NextResponse.json(
        {
          success: false,
          message: "Account tidak ditemukan atau sudah dihapus!",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
