import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request, { params }) {
  try {
    // Ambil customerId dari params (Sesuai nama folder [customerId])
    const { customerId } = await params;

    // Cari data customer di database
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        deleted_at: null,
      },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
    });

    // Jika tidak ditemukan, kirim respon 404
    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer tidak ditemukan atau telah dihapus.",
        },
        { status: 404 },
      );
    }

    // Kirim data customer
    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("GET_CUSTOMER_DETAIL_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengambil detail customer.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { customerId } = await params;
    const body = await request.json();

    const {
      full_name,
      phone_number,
      isActive,
      address,
      regency,
      province,
      zip_code,
      job,
      user_id,
    } = body;

    // customer kondisional
    const existingCustomer = await prisma.customer.findFirst({
      where: { id: customerId, deleted_at: null },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer tidak ditemukan!" },
        { status: 404 },
      );
    }

    // data yg akan diupdate
    const updateData = {};
    if (full_name) updateData.full_name = full_name;
    if (phone_number) updateData.phone_number = phone_number;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (address) updateData.address = address;
    if (regency) updateData.regency = regency;
    if (province) updateData.province = province;
    if (zip_code) updateData.zip_code = zip_code;
    if (job) updateData.job = job;
    if (user_id) updateData.user_id = user_id;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak ada data yang dikirim untuk diupdate.",
        },
        { status: 400 },
      );
    }

    // fungsi update
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Data customer berhasil diperbarui!",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("PATCH_CUSTOMER_ERROR:", error);

    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "User ID baru tidak ditemukan!" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat update customer.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // Ambil customerId dari params
    const { customerId } = await params;

    // cek customer
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer tidak ditemukan!" },
        { status: 404 },
      );
    }

    // Soft Delete
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        deleted_at: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, message: "Customer berhasil dihapus (soft delete)." },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_CUSTOMER_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat menghapus customer.",
      },
      { status: 500 },
    );
  }
}
