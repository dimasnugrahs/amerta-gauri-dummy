"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function CreateCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tidak perlu mengirim user_id, backend akan mengambilnya dari cookie authToken
      const response = await axiosInstance.post("/customers", formData);

      if (response.status === 201 || response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Customer berhasil ditambahkan.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/customers");
      }
    } catch (error) {
      console.error("Error Post Customer:", error.response?.data);
      // Jika error 401, berarti token di cookie habis/salah
      if (error.response?.status === 401) {
        Swal.fire("Sesi Berakhir", "Silakan login kembali.", "error");
        router.push("/signin");
        return;
      }
      const msg = error.response?.data?.message || "Gagal menyimpan data.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-30 md:mb-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
            Tambah Customer Baru
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                placeholder="Contoh: Budi Santoso"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nomor Telepon *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                placeholder="08123456789"
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
                placeholder="Contoh: Wiraswasta"
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
                  placeholder="Jl. Nama Jalan No. 123..."
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
                  placeholder="Provinsi"
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
                  placeholder="Kota atau Kabupaten"
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
                  placeholder="12345"
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

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-2 py-3 rounded-lg text-white font-bold shadow-lg shadow-amerta-200 transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Data Customer"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
