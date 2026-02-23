"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";
import SearchableSelect from "@/src/app/components/SearchableSelect";

export default function CreateLoanAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State untuk data dropdown (diambil dari API)
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [marketings, setMarketings] = useState([]); // Untuk dropdown manual marketing

  const [formData, setFormData] = useState({
    marketing_id: "", // Diisi manual lewat dropdown
    customer_id: "",
    product_id: "",
    principal_amount: "",
    rate_percent: "",
    rate_amount: "",
    start_date: new Date().toISOString().split("T")[0],
    period_start: new Date().toISOString().split("T")[0],
    status: "ACTIVE",
  });

  // Fetch semua data referensi saat halaman dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCust, resProd, resUser] = await Promise.all([
          axiosInstance.get("/customers"),
          axiosInstance.get("/products"),
          axiosInstance.get("/users"), // Pastikan kamu punya API yang mereturn list user/marketing
        ]);
        setCustomers(resCust.data.data || []);
        setProducts(resProd.data.data || []);
        setMarketings(resUser.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data referensi:", error);
        Swal.fire(
          "Error",
          "Gagal memuat data referensi (Nasabah/Produk/Marketing)",
          "error",
        );
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Payload sesuai kebutuhan API POST kamu
    const payload = {
      ...formData,
      principal_amount: Number(formData.principal_amount),
      rate_percent: Number(formData.rate_percent || 0),
      rate_amount: Number(formData.rate_amount || 0),
    };

    try {
      const response = await axiosInstance.post("/loanaccounts", payload);

      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/dashboard/accounts");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal menyimpan data.";
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
          <h1 className="text-xl font-bold text-gray-800">
            Buka Pinjaman Baru
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-2">
          {/* Section 1: Relasi Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
            <div className="md:col-span-2">
              <SearchableSelect
                label="Pilih Marketing"
                placeholder="Cari nama marketing..."
                options={marketings}
                value={formData.marketing_id}
                displayField="full_name"
                onChange={(id) =>
                  setFormData({ ...formData, marketing_id: id })
                }
              />
            </div>

            <SearchableSelect
              label="Pilih Nasabah"
              placeholder="Cari nama nasabah..."
              options={customers}
              value={formData.customer_id}
              displayField="full_name"
              onChange={(id) => setFormData({ ...formData, customer_id: id })}
            />

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-tight">
                Produk Pinjaman <span className="text-red-500">*</span>
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

          {/* Section 2: Detail Finansial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Plafon Pinjaman (Pokok)
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                placeholder="Rp 0"
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
                  placeholder="0.00"
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
                  placeholder="Rp 0"
                  value={formData.rate_amount}
                  onChange={(e) =>
                    setFormData({ ...formData, rate_amount: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Pencairan
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
                Mulai Angsuran Pertama
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
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all shadow-sm"
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
              {loading ? "Sedang Memproses..." : "Terbitkan Loan Account"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
