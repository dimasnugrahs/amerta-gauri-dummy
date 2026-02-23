"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default function DashboardProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire("Error", "Gagal memuat data produk", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Hapus Produk?",
      text: "Data produk ini tidak dapat dikembalikan setelah dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/products/${productId}`);
          Swal.fire("Berhasil", "Produk telah dihapus.", "success");
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        } catch (error) {
          Swal.fire(
            "Gagal",
            "Terjadi kesalahan saat menghapus produk.",
            "error",
          );
        }
      }
    });
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <h1 className="text-xl font-bold text-gray-800">Manajemen Produk</h1>
          <Link
            href="/dashboard/products/create"
            className="mt-2 md:mt-0 px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
          >
            + Tambah Produk
          </Link>
        </div>

        {/* Filter Area */}
        <div className="mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
            Cari Produk
          </label>
          <input
            type="text"
            placeholder="Ketik nama produk atau deskripsi..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto rounded-lg mx-2 shadow border border-gray-200">
          <table className="w-full min-w-200 border-collapse bg-white text-sm">
            <thead>
              <tr className="bg-amerta-600 text-white">
                <th className="p-3 border border-amerta-700 text-center w-[5%]">
                  No
                </th>
                <th className="p-3 border border-amerta-700 text-left w-[30%]">
                  Nama Produk
                </th>
                <th className="p-3 border border-amerta-700 text-left w-[20%]">
                  Harga
                </th>
                <th className="p-3 border border-amerta-700 text-left w-[30%]">
                  Deskripsi
                </th>
                <th className="p-3 border border-amerta-700 text-center w-[15%]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan="5"
                      className="p-6 border border-gray-100 bg-gray-50/50"
                    ></td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-center border border-gray-200 text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-bold text-gray-800">
                      {product.product_name}
                    </td>
                    <td className="p-3 border border-gray-200 text-amerta-700 font-semibold">
                      Rp {(product.price || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-500 italic">
                      {product.description || "-"}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/products/edit/${product.id}`,
                            )
                          }
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-md border border-blue-200 transition-all"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-md border border-red-200 transition-all"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center text-gray-400 bg-gray-50 italic"
                  >
                    Data produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 px-2">
            <p className="text-xs text-gray-500">
              Total <span className="font-bold">{filteredProducts.length}</span>{" "}
              Produk
            </p>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-xs border rounded-md ${currentPage === i + 1 ? "bg-amerta-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
}
