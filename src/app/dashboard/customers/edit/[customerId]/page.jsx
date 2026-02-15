"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function EditCustomerPage() {
  const router = useRouter();
  const { customerId } = useParams(); // Mengambil ID dari URL
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    regency: "",
    province: "",
    zip_code: "",
    job: "",
    isActive: true,
  });

  // 1. Ambil data customer yang akan diedit
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get(`/customers/${customerId}`);
        const data = response.data.data;

        // Isi formData dengan data dari database
        setFormData({
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          address: data.address || "",
          regency: data.regency || "",
          province: data.province || "",
          zip_code: data.zip_code || "",
          job: data.job || "",
          isActive: data.isActive ?? true,
        });
      } catch (error) {
        console.error("Gagal mengambil data customer:", error);
        Swal.fire("Error", "Data customer tidak ditemukan.", "error");
        router.push("/dashboard/customers");
      } finally {
        setFetching(false);
      }
    };

    if (customerId) fetchCustomerData();
  }, [customerId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Menggunakan PUT untuk update data
      // Backend tetap mengambil user_id dari cookie untuk audit/log jika diperlukan
      const response = await axiosInstance.patch(
        `/customers/${customerId}`,
        formData,
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data customer berhasil diperbarui.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/customers");
      }
    } catch (error) {
      console.error("Error Update Customer:", error.response?.data);
      if (error.response?.status === 401) {
        Swal.fire("Sesi Berakhir", "Silakan login kembali.", "error");
        router.push("/signin");
        return;
      }
      const msg = error.response?.data?.message || "Gagal memperbarui data.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center animate-pulse text-gray-500">
          Memuat data customer...
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-30 md:mb-10">
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
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Data Customer
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pekerjaan
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                value={formData.job}
                onChange={(e) =>
                  setFormData({ ...formData, job: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Informasi Alamat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kota/Kabupaten
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                  value={formData.zip_code}
                  onChange={(e) =>
                    setFormData({ ...formData, zip_code: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 self-end">
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
                  Status Customer Aktif
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-2 py-3 rounded-xl text-white font-bold shadow-lg shadow-amerta-200 transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95"
              }`}
            >
              {loading ? "Menyimpan..." : "Update Data Customer"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
