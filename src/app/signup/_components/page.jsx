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
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/signup", formData);

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil",
          text: "Akun kamu sudah berhasil terdaftar, silakan login.",
          confirmButtonColor: "#10b981",
        });

        router.push("/signin");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan pada server",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2 md:mb-3">
        <label className="font-light">Nama Lengkap</label>
        <input
          type="text"
          required
          placeholder="Silahkan masukkan nama lengkap"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="mb-2 md:mb-3">
        <label className="font-light">Username</label>
        <input
          type="text"
          required
          placeholder="Silahkan masukkan username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="mb-2 md:mb-3">
        <label className="font-light">Email</label>
        <input
          type="email"
          required
          placeholder="Silahkan masukkan email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="font-light">Password</label>
        <input
          type="password"
          required
          placeholder="Silahkan masukkan password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          type="submit"
          disabled={loading}
          className="text-amerta-50 bg-amerta-500 hover:bg-amerta-700 w-full py-2 rounded disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>

        <Link
          href="/signin"
          className="text-center text-amerta-700 border border-amerta-700 hover:bg-amerta-800 hover:text-white w-full py-2 rounded transition-all"
        >
          Sudah Memiliki Akun
        </Link>
      </div>
    </form>
  );
}
