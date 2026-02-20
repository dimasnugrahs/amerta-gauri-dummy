"use client";

import LayoutDashboard from "../components/LayoutDashboard";
import { useMemo, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

export default function DashboardFinancial() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data dari API Capital Ledger
  const fetchLedgers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/ledgers");
      setLedgers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Swal.fire("Gagal", "Tidak dapat memuat ringkasan keuangan.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLedgers();
  }, [fetchLedgers]);

  // 2. Hitung Statistik Finansial
  const financialStats = useMemo(() => {
    // Sisa Kas (Running Balance)
    const sisaKas = ledgers.reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Total Keuntungan (Bunga)
    const totalBunga = ledgers
      .filter((l) => l.type === "REPAYMENT_INTEREST")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Biaya Operasional (Listrik, Gaji, dll)
    const pengeluaranOps = ledgers
      .filter((l) => l.type === "EXPENSE_OPS")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Total Pencairan Modal (Uang yang sedang dipinjam nasabah)
    const totalDisbursed = ledgers
      .filter((l) => l.type === "DISBURSEMENT")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      sisaKas,
      totalLaba: totalBunga,
      labaBersih: totalBunga + pengeluaranOps, // Bunga (pos) + Ops (neg)
      totalKeluar: Math.abs(pengeluaranOps + totalDisbursed),
    };
  }, [ledgers]);

  if (loading) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center">Memuat Ringkasan Keuangan...</div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="mb-6 mx-2">
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">
            Financial <span className="text-amerta-600">Overview</span>
          </h1>
          <p className="text-xs text-gray-400">
            Ringkasan kondisi modal dan keuntungan real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 ">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden border-t-4 border-t-black">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Kas Tersedia (Liquidity)
            </p>
            <h2 className="text-2xl font-black text-gray-800 mt-2">
              Rp {financialStats.sisaKas.toLocaleString()}
            </h2>
            <p className="text-[10px] text-amerta-600 mt-1 font-medium italic">
              *Modal siap salur
            </p>
          </div>

          {/* Laba Kotor */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Keuntungan (Bunga)
            </p>
            <h2 className="text-2xl font-black text-green-600 mt-2">
              Rp {financialStats.totalLaba.toLocaleString()}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                Laba Kotor
              </span>
            </div>
          </div>

          {/* Laba Bersih */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Laba Bersih (Real)
            </p>
            <h2 className="text-2xl font-black text-purple-600 mt-2">
              Rp {financialStats.labaBersih.toLocaleString()}
            </h2>
            <p className="text-[10px] text-gray-400 mt-1">
              Setelah dipotong biaya operasional
            </p>
          </div>

          {/* Total Cash Out */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Cash Out
            </p>
            <h2 className="text-2xl font-black text-red-600 mt-2">
              Rp {financialStats.totalKeluar.toLocaleString()}
            </h2>
            <p className="text-[10px] text-red-400 mt-1 font-medium italic">
              Ops + Pencairan Pinjaman
            </p>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
