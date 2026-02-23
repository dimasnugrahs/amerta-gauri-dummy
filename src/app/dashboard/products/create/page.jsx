"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // user_id dihapus dari state karena sudah ditangani Backend via Token
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mengirim data tanpa perlu menyertakan user_id
      const response = await axiosInstance.post("/products", {
        ...formData,
        price: parseFloat(formData.price),
      });

      if (response.status === 201 || response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Produk baru berhasil diterbitkan.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error Post Product:", error.response?.data);

      // Jika token mati (401), arahkan ke login
      if (error.response?.status === 401) {
        Swal.fire("Sesi Berakhir", "Silakan login kembali.", "error");
        router.push("/signin");
        return;
      }

      const msg = error.response?.data?.message || "Gagal menyimpan produk.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded bg-white shadow-sm border border-gray-100 mb-30 md:mb-10">
        <div className="flex items-center gap-4 mb-8 mx-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full bg-amerta-100 transition-colors"
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
          <h1 className="text-xl font-bold text-gray-800">
            Tambah Produk Pinjaman
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mx-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            {/* Nama Produk */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amerta-500 bg-white text-gray-800"
                placeholder="Contoh: Gelang Emas"
                value={formData.product_name}
                onChange={(e) =>
                  setFormData({ ...formData, product_name: e.target.value })
                }
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
                Harga / Nominal Dasar <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amerta-500 bg-white text-gray-800"
                placeholder="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
                Deskripsi Produk
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amerta-500 bg-white text-gray-800"
                placeholder="Jelaskan detail produk..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
                loading
                  ? "bg-gray-400"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95"
              }`}
            >
              {loading ? "Menerbitkan..." : "Terbitkan Produk"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
