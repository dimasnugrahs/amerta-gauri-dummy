"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function EditUserPage() {
  const router = useRouter();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    role: "ADMIN",
    isActive: true,
    address: "",
    regency: "",
    province: "",
    zip_code: "",
    birthday: "",
  });

  // 1. Ambil data user dari database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        const data = response.data.data;

        setFormData({
          full_name: data.full_name || "",
          username: data.username || "",
          email: data.email || "",
          password: "",
          phone_number: data.phone_number || "",
          role: data.role || "ADMIN",
          isActive: data.isActive ?? true,
          address: data.address || "",
          regency: data.regency || "",
          province: data.province || "",
          zip_code: data.zip_code || "",
          // Format tanggal agar bisa dibaca input type="date"
          birthday: data.birthday ? data.birthday.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        Swal.fire("Error", "Data user tidak ditemukan.", "error");
        router.push("/dashboard/users");
      } finally {
        setFetching(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pastikan hanya field yang dibutuhkan yang dikirim
      const payload = {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role,
        isActive: formData.isActive,
        address: formData.address,
        regency: formData.regency,
        province: formData.province,
        zip_code: formData.zip_code,
        birthday: formData.birthday,
      };

      // Tambahkan password HANYA jika diisi
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const response = await axiosInstance.patch(`/users/${userId}`, payload);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Profil user berhasil diperbarui.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/users");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Gagal memperbarui data user.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center animate-pulse text-gray-500">
          Memuat data user...
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-10">
        <div className="flex items-center gap-4 mb-8 mx-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-amerta-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Akun User</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mx-2">
          {/* Akun Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ganti Password{" "}
                <span className="text-xs text-gray-400 font-normal">
                  (Kosongkan jika tidak ingin diubah)
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Otoritas & Kontak */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Hak Akses (Role)
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none bg-white"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="USER">User (Staff Lapangan)</option>
                <option value="ADMIN">Admin (Office)</option>
                <option value="SUPERADMIN">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.birthday}
                onChange={(e) =>
                  setFormData({ ...formData, birthday: e.target.value })
                }
              />
            </div>
          </div>

          {/* Alamat Section */}
          <div className="pt-4 border-t border-gray-50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Detail Lokasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Kota/Kab
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                    value={formData.regency}
                    onChange={(e) =>
                      setFormData({ ...formData, regency: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                    value={formData.zip_code}
                    onChange={(e) =>
                      setFormData({ ...formData, zip_code: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status & Action */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="isActive"
                className="w-5 h-5 accent-amerta-600 cursor-pointer"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <label
                htmlFor="isActive"
                className="text-sm font-bold text-gray-700 cursor-pointer"
              >
                User Aktif (Bisa Login)
              </label>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 md:px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-2 md:px-12 py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amerta-600 hover:bg-amerta-700 active:scale-95 shadow-amerta-200"
                }`}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
