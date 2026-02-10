"use client";

import axiosInstance from "@/src/lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Tampilkan konfirmasi dulu agar tidak tidak sengaja tertekan
    const result = await Swal.fire({
      title: "Apakah anda ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // warna amerta-500
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.post("/auth/signout");

        // Notifikasi sukses
        await Swal.fire({
          icon: "success",
          title: "Berhasil Keluar",
          showConfirmButton: false,
          timer: 1000,
        });

        // Redirect ke halaman login
        router.push("/signin");
        router.refresh(); // Penting! Membersihkan cache middleware
      } catch (error) {
        Swal.fire("Error", "Gagal logout, silakan coba lagi", "error");
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded transition-all"
    >
      <span>Keluar</span>
    </button>
  );
}
