"use client";

import LayoutDashboard from "../components/LayoutDashboard";
import { useMemo, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

export default function DashboardFinancial() {
  const [ledgers, setLedgers] = useState([]);
  const [dueToday, setDueToday] = useState([]); // State untuk nasabah jatuh tempo
  const [loading, setLoading] = useState(true);

  // 1. Ambil data gabungan (Ledger & Jatuh Tempo)
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Mengambil dua data secara paralel untuk performa lebih cepat
      const [resLedger, resDue] = await Promise.all([
        axiosInstance.get("/ledgers"),
        axiosInstance.get("/loanaccounts/due-today"),
      ]);

      setLedgers(resLedger.data.data || []);
      setDueToday(resDue.data.data || []);
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

  // 2. Hitung Statistik Finansial
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
          {/* Item Statistik tetap sama seperti sebelumnya */}
          <StatCard
            title="Kas Tersedia"
            value={financialStats.sisaKas}
            color="black"
            subtitle="*Liquidity"
          />
          <StatCard
            title="Total Bunga"
            value={financialStats.totalLaba}
            color="green-500"
            subtitle="Laba Kotor"
            isLabel
          />
          <StatCard
            title="Laba Bersih"
            value={financialStats.labaBersih}
            color="purple-500"
            subtitle="Potong Ops"
          />
          <StatCard
            title="Biaya Ops"
            value={financialStats.totalOps}
            color="orange-500"
            subtitle="Gaji, Listrik, dll"
          />
          <StatCard
            title="Pencairan Modal"
            value={financialStats.totalDisbursed}
            color="red-500"
            subtitle="Pinjaman Aktif"
          />
        </div>
      </div>

      {/* Bagian 2: Pengingat Jatuh Tempo */}
      <div className="px-4 py-6 rounded-xl bg-white shadow-sm border border-gray-100 mb-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mx-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tighter uppercase">
              Tunggakan & Jatuh Tempo{" "}
              <span className="text-red-600">Bulan Ini</span>
            </h2>
            <p className="text-[12px] text-gray-400 font-medium">
              Daftar tagihan dari tanggal 1 sampai hari ini yang masih aktif.
            </p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200">
            {dueToday.length} Nasabah Belum Bayar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-3 text-gray-400 uppercase">Tgl Tempo</th>
                <th className="px-4 py-3 text-gray-400 uppercase">Nasabah</th>
                <th className="px-4 py-3 text-gray-400 uppercase">
                  Total Tagihan
                </th>
                {/* <th className="px-4 py-3 text-gray-400 uppercase text-right">
                  Aksi
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dueToday.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-red-50/30 transition-colors group"
                >
                  <td className="px-4 py-4">
                    {/* Tampilkan tanggal tempo untuk membedakan mana yang sudah lewat hari */}
                    <span
                      className={`text-[11px] font-bold px-2 py-1 rounded ${
                        new Date(item.due_date).getDate() < new Date().getDate()
                          ? "bg-red-100 text-red-600" // Lewat hari ini (Menunggak)
                          : "bg-orange-100 text-orange-600" // Jatuh tempo hari ini
                      }`}
                    >
                      {new Date(item.due_date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className=" font-bold text-gray-800">
                      {item.customer_name}
                    </p>
                    <p className=" text-gray-400 font-medium">
                      {item.loan_number}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className=" font-black text-red-600">
                      Rp {(item.interest_due || 0).toLocaleString()}
                    </p>
                  </td>
                  {/* <td className="px-4 py-4 text-right">
                    <a
                      // KOREKSI 2: Ganti installment_amount menjadi interest_due di dalam teks WhatsApp
                      href={`https://wa.me/${item.phone_number.replace(/\D/g, "")}?text=Halo%20${
                        item.customer_name
                      },%20mengingatkan%20tagihan%20bunga%20pinjaman%20Anda%20sebesar%20Rp%20${(
                        item.interest_due || 0
                      ).toLocaleString()}%20yang%20jatuh%20tempo%20pada%20tanggal%20${new Date(
                        item.due_date,
                      ).toLocaleDateString(
                        "id-ID",
                      )}.%20Mohon%20segera%20melakukan%20pembayaran.%20Terima%20kasih.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-lg transition-all shadow-sm"
                    >
                      INGATKAN WA
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutDashboard>
  );
}

// Sub-komponen kecil untuk Card agar kode utama bersih
function StatCard({ title, value, color, subtitle, isLabel = false }) {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-${color}`}
    >
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <h2 className="text-xl font-black text-gray-800 mt-2">
        Rp {value.toLocaleString()}
      </h2>
      {isLabel ? (
        <p
          className={`text-[9px] text-green-700 bg-green-50 w-fit px-2 py-0.5 rounded mt-1 font-bold italic`}
        >
          {subtitle}
        </p>
      ) : (
        <p className="text-[9px] text-gray-400 mt-1 italic">{subtitle}</p>
      )}
    </div>
  );
}
