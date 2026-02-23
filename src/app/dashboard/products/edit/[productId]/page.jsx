"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function EditProductPage() {
  // Ambil sesuai nama folder [productId]
  const { productId } = useParams();
  const router = useRouter();

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);

        // Log ini untuk melihat struktur asli dari API Anda di Console (F12)
        console.log("Raw Response:", res.data);

        // Kadang data ada di res.data saja, atau res.data.data
        const result = res.data.data || res.data;

        if (result) {
          setFormData({
            // Pastikan nama properti (product_name, price) sama persis dengan kolom DB
            product_name: result.product_name || "",
            price: result.price || "",
            description: result.description || "",
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        Swal.fire("Error", "Gagal memuat data produk", "error");
        router.push("/dashboard/products");
      } finally {
        setFetching(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gunakan productId, bukan id
      await axiosInstance.patch(`/products/${productId}`, formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk berhasil diperbarui",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard/products");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Terjadi kesalahan saat menyimpan.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <LayoutDashboard>
        <div className="text-center p-10 animate-pulse text-gray-500">
          Memuat data produk...
        </div>
      </LayoutDashboard>
    );

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <h1 className="text-2xl font-bold text-gray-800">Edit Produk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amerta-500"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amerta-500"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amerta-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="flex-1 py-3 border rounded-lg font-bold hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg text-white font-bold ${
                loading ? "bg-gray-400" : "bg-amerta-600 hover:bg-amerta-700"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
