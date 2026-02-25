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

      // Destructuring dari struktur API: resDueSummary.data.data
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
    const sisaKas = ledgers.reduce((acc, curr) => acc + Number(curr.amount), 0);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
          <StatCard
            title="Kas Tersedia"
            value={financialStats.sisaKas}
            color="black"
            // subtitle="*Modal Tersedia"
          />
          <StatCard
            title="Total Bunga"
            value={financialStats.totalLaba}
            color="green-500"
            // subtitle="Laba Kotor"
            // isLabel
          />
          <StatCard
            title="Laba Bersih"
            value={financialStats.labaBersih}
            color="purple-500"
            // subtitle="Potong Ops"
          />
          <StatCard
            title="Biaya Ops"
            value={financialStats.totalOps}
            color="orange-500"
            // subtitle="Gaji, Listrik, dll"
          />
          <StatCard
            title="Pencairan Modal"
            value={financialStats.totalDisbursed}
            color="red-500"
            // subtitle="Pinjaman Aktif"
          />
        </div>
      </div>

      {/* Bagian 2: List Jatuh Tempo Pokok (Dulu: dueToday) */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mx-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">
              Jatuh <span className="text-red-600">Tempo</span>
            </h2>
            <p className="text-[12px] text-gray-400 font-medium">
              Nasabah yang belum melakukan angsuran bulanan.
            </p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200">
            {principalDue.length} Nasabah
          </span>
        </div>
        <TableComponent data={principalDue} type="PRINCIPAL" />
      </div>

      {/* Bagian 3: List Tunggakan Bunga */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mx-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">
              Tunggakan <span className="text-orange-600">Bunga</span>
            </h2>
            <p className="text-[12px] text-gray-400 font-medium">
              Nasabah yang belum membayar bunga bulan ini.
            </p>
          </div>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
            {interestDue.length} Nasabah
          </span>
        </div>
        <TableComponent data={interestDue} type="INTEREST" />
      </div>
    </LayoutDashboard>
  );
}

// KOREKSI 2: Membuat TableComponent agar tidak mengulang kode (DRY)
function TableComponent({ data, type }) {
  if (data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400 text-sm italic">
        Tidak ada data ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase">
              Info Nasabah
            </th>
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-gray-400 text-[11px] uppercase text-right">
              Tagihan
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
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
  );
}

// StatCard tetap sama...
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

  const currentStyle = colorStyles[color] || {
    border: "border-t-gray-500",
    bg: "bg-gray-50",
    text: "text-gray-600",
  };

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
      {isLabel ? (
        <p
          className={`text-[10px] text-green-700 bg-green-50 w-fit px-2 py-0.5 rounded mt-1 font-bold`}
        >
          {subtitle}
        </p>
      ) : (
        <p className={`text-[10px] ${currentStyle.text} mt-1`}>{subtitle}</p>
      )}
    </div>
  );
}
