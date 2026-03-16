"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function DiscountLoanPage() {
  const router = useRouter();
  const { accountsId } = useParams(); // Mengambil ID langsung dari folder [accountsId]

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loan, setLoan] = useState(null);

  const [formData, setFormData] = useState({
    type: "BUNGA",
    amount: "",
    description: "",
  });

  useEffect(() => {
    const fetchLoanDetail = async () => {
      try {
        const res = await axiosInstance.get(`/loanaccounts/${accountsId}`);
        setLoan(res.data.data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
        Swal.fire("Error", "Data pinjaman tidak ditemukan.", "error");
        router.push("/dashboard/accounts");
      } finally {
        setFetching(false);
      }
    };

    if (accountsId) fetchLoanDetail();
  }, [accountsId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxDiscount =
      formData.type === "POKOK"
        ? loan.current_debt_principal
        : loan.current_debt_interest;

    if (Number(formData.amount) > Number(maxDiscount)) {
      return Swal.fire(
        "Peringatan",
        "Nominal diskon melebihi sisa hutang!",
        "warning",
      );
    }

    const confirm = await Swal.fire({
      title: "Konfirmasi Diskon",
      text: `Yakin ingin memberikan diskon ${formData.type} sebesar Rp${Number(formData.amount).toLocaleString()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Terapkan",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      // Endpoint disesuaikan dengan ID dari params
      await axiosInstance.post(`/loanaccounts/${accountsId}/discount`, {
        type: formData.type,
        amount: Number(formData.amount),
        description: formData.description,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Diskon berhasil diterapkan.",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/dashboard/accounts");
    } catch (error) {
      Swal.fire(
        "Gagal",
        error.response?.data?.message || "Gagal menerapkan diskon.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (fetching) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center animate-pulse text-gray-500">
          Memuat info saldo...
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
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
          <h1 className="text-2xl font-bold text-gray-800">Diskon Rekening</h1>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">No. Rekening:</span>
            <span className="font-bold text-amerta-700">
              {loan?.no_rekening}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Nasabah:</span>
            <span className="font-semibold text-gray-800">
              {loan?.customer?.full_name}
            </span>
          </div>
        </div>

        {/* Ringkasan Saldo */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-orange-50 border border-orange-100 rounded-xl text-center">
          <div>
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
              Saldo Pokok
            </p>
            <p className="text-lg font-bold text-orange-700">
              {formatCurrency(loan.current_debt_principal)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
              Saldo Bunga
            </p>
            <p className="text-lg font-bold text-orange-700">
              {formatCurrency(loan.current_debt_interest)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "POKOK" })}
              className={`py-3 rounded-lg border-2 font-bold transition-all ${
                formData.type === "POKOK"
                  ? "border-amerta-600 bg-amerta-50 text-amerta-700"
                  : "border-gray-100 text-gray-400"
              }`}
            >
              Potong Pokok
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "BUNGA" })}
              className={`py-3 rounded-lg border-2 font-bold transition-all ${
                formData.type === "BUNGA"
                  ? "border-amerta-600 bg-amerta-50 text-amerta-700"
                  : "border-gray-100 text-gray-400"
              }`}
            >
              Potong Bunga
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
              Nominal Potongan
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none text-xl font-bold"
              placeholder="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
              Keterangan
            </label>
            <textarea
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none h-24"
              placeholder="Alasan pemotongan..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={loading || !formData.amount}
              className={`flex-[2] py-3 rounded-lg text-white font-bold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amerta-600 hover:bg-amerta-700 active:scale-95 shadow-lg shadow-amerta-100"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Diskon"}
            </button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
}
