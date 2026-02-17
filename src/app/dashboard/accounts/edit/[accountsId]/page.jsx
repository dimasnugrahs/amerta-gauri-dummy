"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function EditLoanAccountPage() {
  const router = useRouter();
  const { accountsId } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Data Referensi untuk Dropdown
  const [marketings, setMarketings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    marketing_id: "",
    customer_id: "",
    product_id: "",
    principal_amount: "",
    rate_percent: "",
    rate_amount: "",
    start_date: "",
    period_start: "",
    status: "ACTIVE",
  });

  // 1. Ambil data referensi dan detail loan
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data dropdown secara paralel
        const [resCust, resProd, resUser, resLoan] = await Promise.all([
          axiosInstance.get("/customers"),
          axiosInstance.get("/products"),
          axiosInstance.get("/users"),
          axiosInstance.get(`/loanaccounts/${accountsId}`),
        ]);

        setCustomers(resCust.data.data || []);
        setProducts(resProd.data.data || []);
        setMarketings(resUser.data.data || []);

        const loan = resLoan.data.data;
        // Map data dari API ke form
        setFormData({
          marketing_id: loan.marketing_id || "",
          customer_id: loan.customer_id || "",
          product_id: loan.product_id || "",
          principal_amount: loan.principal_amount || "",
          rate_percent: loan.rate_percent || "",
          rate_amount: loan.rate_amount || "",
          start_date: loan.start_date ? loan.start_date.split("T")[0] : "",
          period_start: loan.period_start
            ? loan.period_start.split("T")[0]
            : "",
          status: loan.status || "ACTIVE",
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);
        Swal.fire(
          "Error",
          "Data loan tidak ditemukan atau gagal dimuat.",
          "error",
        );
        router.push("/dashboard/accounts");
      } finally {
        setFetching(false);
      }
    };

    if (accountsId) fetchData();
  }, [accountsId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        principal_amount: Number(formData.principal_amount),
        rate_percent: Number(formData.rate_percent),
        rate_amount: Number(formData.rate_amount),
      };

      const response = await axiosInstance.patch(
        `/loanaccounts/${accountsId}`,
        payload,
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data pinjaman berhasil diperbarui.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/accounts");
      }
    } catch (error) {
      console.error("Error Update Loan:", error.response?.data);
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
          Memuat data pinjaman...
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
            Edit Loan Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-2">
          {/* Section: Relasi (Read-only jika nomor rekening tidak boleh pindah tangan, tapi di sini kita buat editable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-tight">
                Marketing <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none bg-white transition-all"
                value={formData.marketing_id}
                onChange={(e) =>
                  setFormData({ ...formData, marketing_id: e.target.value })
                }
              >
                <option value="">-- Pilih Marketing --</option>
                {marketings.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-tight">
                Nasabah <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none bg-white transition-all"
                value={formData.customer_id}
                onChange={(e) =>
                  setFormData({ ...formData, customer_id: e.target.value })
                }
              >
                <option value="">-- Pilih Nasabah --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-tight">
                Produk <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none bg-white transition-all"
                value={formData.product_id}
                onChange={(e) =>
                  setFormData({ ...formData, product_id: e.target.value })
                }
              >
                <option value="">-- Pilih Produk --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.product_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Finansial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Plafon Pinjaman
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
                value={formData.principal_amount}
                onChange={(e) =>
                  setFormData({ ...formData, principal_amount: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bunga (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                  value={formData.rate_percent}
                  onChange={(e) =>
                    setFormData({ ...formData, rate_percent: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bunga (Rp)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                  value={formData.rate_amount}
                  onChange={(e) =>
                    setFormData({ ...formData, rate_amount: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Cair
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mulai Angsuran
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.period_start}
                onChange={(e) =>
                  setFormData({ ...formData, period_start: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status Pinjaman
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none bg-white"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="CANCELED">CANCELED</option>
                <option value="SETTLED">SETTLED</option>
              </select>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`py-3 rounded-lg text-white font-bold shadow-lg shadow-amerta-200 transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95"
              }`}
            >
              {loading ? "Menyimpan..." : "Update Data Pinjaman"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
