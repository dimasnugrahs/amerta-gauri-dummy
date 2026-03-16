"use client";

import LayoutDashboard from "../components/LayoutDashboard";
import { useMemo, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

export default function DashboardFinancial() {
  const [principalDue, setPrincipalDue] = useState([]);
  const [interestDue, setInterestDue] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resLedger, resDueSummary] = await Promise.all([
        axiosInstance.get("/ledgers"),
        axiosInstance.get("/loanaccounts/due-today"),
      ]);

      setLedgers(resLedger.data.data || []);

      const { principalDue = [], interestDue = [] } =
        resDueSummary.data.data || {};
      setPrincipalDue(principalDue);
      setInterestDue(interestDue);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Gagal", "Tidak dapat memuat data dashboard.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const financialStats = useMemo(() => {
    // const sisaKas = ledgers.reduce((acc, curr) => acc + Number(curr.amount), 0);

    const sisaKas = ledgers
      .filter((l) => l.type !== "REPAYMENT_INTEREST")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalBunga = ledgers
      .filter((l) => l.type === "REPAYMENT_INTEREST")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalOps = ledgers
      .filter((l) => l.type === "EXPENSE_OPS")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalDisbursed = ledgers
      .filter((l) => l.type === "DISBURSEMENT")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      sisaKas,
      totalLaba: totalBunga,
      labaBersih: totalBunga + totalOps,
      totalOps: Math.abs(totalOps),
      totalDisbursed: Math.abs(totalDisbursed),
    };
  }, [ledgers]);

  if (loading) {
    return (
      <LayoutDashboard>
        <div className="p-10 text-center animate-pulse text-gray-500 font-medium">
          Sinkronisasi data keuangan...
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      {/* Bagian 1: Overview Keuangan */}
      <div className="px-4 py-5 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
        <div className="mb-6 mx-2">
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">
            Financial <span className="text-amerta-600">Overview</span>
          </h1>
          <p className="text-xs text-gray-400">
            Ringkasan kondisi modal dan keuntungan real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Kas Tersedia"
            value={financialStats.sisaKas}
            color="black"
          />
          <StatCard
            title="Total Bunga"
            value={financialStats.totalLaba}
            color="green-500"
          />
          <StatCard
            title="Laba Bersih"
            value={financialStats.labaBersih}
            color="purple-500"
          />
          <StatCard
            title="Biaya Ops"
            value={financialStats.totalOps}
            color="orange-500"
          />
          <StatCard
            title="Pencairan Modal"
            value={financialStats.totalDisbursed}
            color="red-500"
          />
        </div>
      </div>

      {/* Bagian 2: Jatuh Tempo Pokok */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
        <HeaderTable
          title="Jatuh"
          highlight="Tempo"
          subtitle="Nasabah yang belum melakukan angsuran bulanan."
          count={principalDue.length}
          color="red"
        />
        <TableComponent
          key={`principal-${principalDue.length}`}
          data={principalDue}
          type="PRINCIPAL"
        />
      </div>

      {/* Bagian 3: Tunggakan Bunga */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-20">
        <HeaderTable
          title="Tunggakan"
          highlight="Bunga"
          subtitle="Nasabah yang belum membayar bunga bulan ini."
          count={interestDue.length}
          color="orange"
        />
        <TableComponent
          key={`interest-${interestDue.length}`}
          data={interestDue}
          type="INTEREST"
        />
      </div>
    </LayoutDashboard>
  );
}

// --- SUB COMPONENTS ---

function HeaderTable({ title, highlight, subtitle, count, color }) {
  const colors = {
    red: "bg-red-100 text-red-700 border-red-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
  };
  const textColors = {
    red: "text-red-600",
    orange: "text-orange-600",
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mx-2">
      <div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">
          {title} <span className={textColors[color]}>{highlight}</span>
        </h2>
        <p className="text-[12px] text-gray-400 font-medium">{subtitle}</p>
      </div>
      <span
        className={`px-3 py-1 text-xs font-bold rounded-full border ${colors[color]}`}
      >
        {count} Nasabah
      </span>
    </div>
  );
}

function TableComponent({ data, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage]);

  if (data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400 text-sm italic">
        Tidak ada data ditemukan.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold">
                Info Nasabah
              </th>
              <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold">
                Status
              </th>
              <th className="px-4 py-3 text-gray-400 text-[11px] uppercase font-bold text-right">
                Tagihan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="font-bold text-gray-800">
                    {item.customer?.full_name || "Tanpa Nama"}
                  </p>
                  <p className="text-xs text-gray-400">{item.no_rekening}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded ${type === "PRINCIPAL" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"}`}
                  >
                    {type === "PRINCIPAL" ? "POKOK AKTIF" : "BELUM BAYAR BUNGA"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-black text-gray-700">
                  Rp{" "}
                  {type === "PRINCIPAL"
                    ? Number(item.current_debt_principal).toLocaleString()
                    : Number(item.rate_amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-[11px] text-gray-400 font-medium">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[10px] font-bold border rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              PREV
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-[10px] font-bold border rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color, subtitle, isLabel = false }) {
  const colorStyles = {
    black: {
      border: "border-t-black",
      bg: "bg-gray-50",
      text: "text-gray-900",
    },
    "green-500": {
      border: "border-t-green-500",
      bg: "bg-green-50/50",
      text: "text-green-700",
    },
    "purple-500": {
      border: "border-t-purple-500",
      bg: "bg-purple-50/50",
      text: "text-purple-700",
    },
    "orange-500": {
      border: "border-t-orange-500",
      bg: "bg-orange-50/50",
      text: "text-orange-700",
    },
    "red-500": {
      border: "border-t-red-500",
      bg: "bg-red-50/50",
      text: "text-red-700",
    },
  };
  const currentStyle = colorStyles[color] || colorStyles.black;

  return (
    <div
      className={`p-5 rounded-xl shadow-sm border border-gray-100 border-t-4 transition-all hover:shadow-md ${currentStyle.border} ${currentStyle.bg}`}
    >
      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <h2 className="text-xl font-black text-gray-800 mt-2">
        Rp {(value || 0).toLocaleString()}
      </h2>
      {subtitle && (
        <p
          className={`text-[10px] mt-1 ${isLabel ? "text-green-700 bg-green-50 w-fit px-2 py-0.5 rounded font-bold" : currentStyle.text}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
