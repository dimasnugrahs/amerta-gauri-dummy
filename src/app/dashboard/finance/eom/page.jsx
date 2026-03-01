"use client";

import LayoutDashboard from "@/src/app/components/LayoutDashboard";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

export default function EOMDashboard() {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchPreview = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/eom/preview");
      setPreviewData(res.data);
    } catch (error) {
      console.error("Error fetching preview:", error);
      Swal.fire(
        "Gagal",
        "Tidak dapat memuat data preview tutup buku.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  const handleExecuteEOM = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi Tutup Buku",
      text: `Sistem akan menambahkan bunga otomatis ke ${previewData?.summary?.total_accounts} rekening. Tindakan ini tidak dapat dibatalkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Proses Sekarang",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setProcessing(true);
      try {
        await axiosInstance.post("/eom/execute");
        await Swal.fire(
          "Berhasil",
          "Proses tutup buku periode ini telah selesai.",
          "success",
        );
        fetchPreview();
      } catch (error) {
        Swal.fire(
          "Gagal",
          error.response?.data?.message ||
            "Terjadi kesalahan saat proses tutup buku.",
          "error",
        );
      } finally {
        setProcessing(false);
      }
    }
  };

  if (loading) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center animate-pulse text-gray-500 font-medium italic">
          Mempersiapkan data penyesuaian bunga...
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      {/* Bagian 1: Header & Control */}
      <div className="px-4 py-5 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mx-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">
              End of Month <span className="text-blue-600">Process</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Periode: {previewData?.summary?.period?.name}{" "}
              {previewData?.summary?.period?.year}
            </p>
          </div>

          {previewData?.alreadyDone ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 uppercase text-[10px] font-black tracking-widest">
              ● Tutup Buku Selesai
            </div>
          ) : (
            <button
              onClick={handleExecuteEOM}
              disabled={processing || previewData?.data?.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md disabled:opacity-50"
            >
              {processing ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span className="text-[10px]">▶</span>
              )}
              <span className="text-xs font-bold uppercase tracking-widest">
                Jalankan EOM
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <StatCard
            title="Rekening Target"
            value={previewData?.summary?.total_accounts}
            color="orange-500"
            subtitle="Nasabah Tanpa Transaksi"
            isCount
          />
          <StatCard
            title="Total Akrual Bunga"
            value={previewData?.summary?.total_potential_interest}
            color="black"
            subtitle="Potensi Pendapatan Bunga"
          />
        </div>
      </div>

      {/* Bagian 2: Daftar Preview Rekening */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-20">
        <div className="mb-6 mx-2 border-l-4 border-orange-500 pl-4">
          <h2 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">
            Preview <span className="text-gray-400">Penyesuaian</span>
          </h2>
          <p className="text-[12px] text-gray-400 font-medium">
            Daftar nasabah yang akan dikenakan bunga bulanan otomatis.
          </p>
        </div>

        <TablePreview
          data={previewData?.data || []}
          alreadyDone={previewData?.alreadyDone}
        />
      </div>
    </LayoutDashboard>
  );
}

function TablePreview({ data, alreadyDone }) {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400 text-sm italic">
        {alreadyDone
          ? "Semua rekening telah diproses untuk periode ini."
          : "Tidak ada rekening yang memerlukan penyesuaian bunga."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold tracking-wider">
              Nasabah
            </th>
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold tracking-wider text-right">
              Saldo Pokok
            </th>
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold tracking-wider text-right">
              Bunga Otomatis
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {safeData.map(
            (
              item, // Menggunakan safeData
            ) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="font-bold text-gray-800 uppercase tracking-tighter text-sm">
                    {item.customer_name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono tracking-tighter">
                    {item.no_rekening}
                  </p>
                </td>
                <td className="px-4 py-4 text-right text-xs font-bold text-gray-600">
                  Rp {item.current_debt_principal?.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right">
                  <p className="font-black text-orange-600 text-sm">
                    + Rp {item.rate_amount?.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">
                    Accrual Interest
                  </p>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ title, value, color, subtitle, isCount = false }) {
  const colorStyles = {
    black: "border-t-black bg-gray-50",
    "orange-500": "border-t-orange-500 bg-orange-50/50",
  };

  return (
    <div
      className={`p-5 rounded-xl border border-gray-100 border-t-4 transition-all hover:shadow-sm ${colorStyles[color] || "border-t-gray-500 bg-gray-50"}`}
    >
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {title}
      </p>
      <h2 className="text-xl font-black text-gray-800 mt-1">
        {isCount ? value : `Rp ${Number(value || 0).toLocaleString()}`}
      </h2>
      <p className="text-[10px] text-gray-500 mt-1 font-bold italic">
        {subtitle}
      </p>
    </div>
  );
}
