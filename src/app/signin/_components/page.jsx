"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/signin", formData);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Masuk",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/dashboard");
          router.refresh();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan server",
        confirmButtonColor: "#10b981", // Warna amerta-500
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2 md:mb-3">
        <label className="font-light">Username / Email</label>
        <input
          type="text" // Ubah ke text agar bisa menerima username juga
          required
          value={formData.loginId}
          onChange={(e) =>
            setFormData({ ...formData, loginId: e.target.value })
          }
          placeholder="Silahkan masukkan email atau username"
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="font-light">Password</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Silahkan masukkan password"
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          type="submit"
          disabled={loading}
          className="text-center text-amerta-50 bg-amerta-500 hover:bg-amerta-700 w-full py-2 rounded transition-colors disabled:bg-gray-400"
        >
          {loading ? "Memproses..." : "Masuk Sekarang"}
        </button>

        <Link
          href="/auth/signup"
          className="text-center text-amerta-700 border border-amerta-700 hover:bg-amerta-800 hover:text-white w-full py-2 rounded transition-all"
        >
          Belum Memiliki Akun
        </Link>
      </div>

      <div className="text-end font-light text-sm text-gray-500 underline mt-2 cursor-pointer">
        Lupa password
      </div>
    </form>
  );
}
