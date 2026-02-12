"use client";

import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2"; // Import Swal

export default function LogoutButton({ isMobile }) {
  const router = useRouter();

  const handleLogout = async () => {
    // Tampilkan konfirmasi dahulu (Optional tapi bagus untuk UX)
    const confirm = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan keluar dari sesi ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // warna amerta-500
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axiosInstance.post("/auth/signout");

        if (response.data.success) {
          // Alert Berhasil
          await Swal.fire({
            icon: "success",
            title: "Logout Berhasil",
            text: "Sampai jumpa lagi!",
            showConfirmButton: false,
            timer: 1500, // Hilang otomatis dalam 1.5 detik
          });

          router.push("/signin");
          router.refresh();
        }
      } catch (error) {
        // Alert Gagal
        Swal.fire({
          icon: "error",
          title: "Logout Gagal",
          text:
            error.response?.data?.message ||
            "Terjadi kesalahan saat menghubungi server.",
          confirmButtonColor: "#10b981",
        });
      }
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );

  if (isMobile) {
    return (
      <button
        onClick={handleLogout}
        className="flex flex-col items-center justify-center w-full text-gray-500"
      >
        {icon}
        <span className="text-[10px] mt-1 font-medium">Keluar</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors mt-auto"
    >
      {icon}
      <span className="font-medium">Logout</span>
    </button>
  );
}
