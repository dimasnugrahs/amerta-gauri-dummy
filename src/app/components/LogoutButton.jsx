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
      className={`block px-3 py-4 w-full rounded bg-gray-200 hover:bg-gray-400 hover:text-white transition duration-150`}
    >
      <div className="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
        Logout
      </div>
    </button>
  );
}
