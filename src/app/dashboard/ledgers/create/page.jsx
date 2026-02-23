"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function CreateLedgerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    type: "INJECTION",
    description: "",
    notes: "",
    refrence_number: "",
  });

  // --- HELPER FORMATTING ---
  const formatDisplay = (value) => {
    if (!value) return "";
    return parseInt(value).toLocaleString("id-ID");
  };

  const cleanNumber = (value) => {
    return value.replace(/\./g, "").replace(/[^0-9]/g, "");
  };

  const handleAmountChange = (e) => {
    const rawValue = cleanNumber(e.target.value);
    setFormData({ ...formData, amount: rawValue });
  };

  // --- LOGIKA VISUAL TYPE ---
  const isNegativeType = ["WITHDRAWAL", "DISBURSEMENT", "EXPENSE_OPS"].includes(
    formData.type,
  );
  const isPositiveType = [
    "INJECTION",
    "REPAYMENT_PRINCIPAL",
    "REPAYMENT_INTEREST",
  ].includes(formData.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount === "0") {
      return Swal.fire("Peringatan", "Nominal harus diisi", "warning");
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/ledgers", formData);

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/ledgers");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal menyimpan mutasi.";
      Swal.fire("Gagal", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded bg-white shadow-sm border border-gray-100 mb-10">
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
            Input Mutasi Modal (Ledger)
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mx-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipe Mutasi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipe Mutasi <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <optgroup label="Pemasukan / Modal Masuk">
                  <option value="INJECTION">INJECTION (Tambah Modal)</option>
                  <option value="REPAYMENT_PRINCIPAL">
                    REPAYMENT PRINCIPAL (Bayar Pokok)
                  </option>
                  <option value="REPAYMENT_INTEREST">
                    REPAYMENT INTEREST (Bayar Bunga)
                  </option>
                </optgroup>
                <optgroup label="Pengeluaran / Modal Keluar">
                  <option value="WITHDRAWAL">WITHDRAWAL (Tarik Modal)</option>
                  <option value="DISBURSEMENT">
                    DISBURSEMENT (Pencairan Pinjaman)
                  </option>
                  <option value="EXPENSE_OPS">
                    EXPENSE OPS (Biaya Operasional)
                  </option>
                </optgroup>
                <optgroup label="Lain-lain">
                  <option value="ADJUSTMENT">
                    ADJUSTMENT (Penyesuaian Saldo)
                  </option>
                </optgroup>
              </select>
            </div>

            {/* Referensi / No. Bukti */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Referensi (Opsional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                placeholder="Contoh: REF/2024/001 atau No. Slip"
                value={formData.refrence_number}
                onChange={(e) =>
                  setFormData({ ...formData, refrence_number: e.target.value })
                }
              />
            </div>

            {/* Nominal */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nominal Transaksi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span
                  className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg ${isNegativeType ? "text-red-600" : isPositiveType ? "text-green-600" : "text-gray-600"}`}
                >
                  {isNegativeType ? "- Rp" : isPositiveType ? "+ Rp" : "Rp"}
                </span>
                <input
                  type="text"
                  required
                  className={`w-full pl-16 pr-4 py-4 border-2 rounded-xl outline-none transition-all text-2xl font-bold ${
                    isNegativeType
                      ? "border-red-100 focus:border-red-500 text-red-600 bg-red-50"
                      : isPositiveType
                        ? "border-green-100 focus:border-green-500 text-green-600 bg-green-50"
                        : "border-gray-200 focus:border-amerta-500 text-gray-700"
                  }`}
                  placeholder="0"
                  value={formatDisplay(formData.amount)}
                  onChange={handleAmountChange}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 italic">
                * Sistem akan otomatis menyimpan sebagai nilai{" "}
                {isNegativeType ? "Negatif (-)" : "Positif (+)"} berdasarkan
                tipe yang dipilih.
              </p>
            </div>

            {/* Deskripsi Singkat */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Singkat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                placeholder="Contoh: Suntikan modal awal bulan Maret"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Catatan Tambahan */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catatan (Notes)
              </label>
              <textarea
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none"
                placeholder="Tambahkan keterangan detail jika diperlukan..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
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
              className={`py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95"
              }`}
            >
              {loading ? "Memproses..." : "Simpan Mutasi Modal"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
