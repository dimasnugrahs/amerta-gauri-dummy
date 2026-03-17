"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Icon Wallet
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

export default function DashboardLedgers() {
  const [ledgers, setLedgers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Report Date Range State
  const [reportDates, setReportDates] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLedgers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/ledgers");
      const dataLedgers = response.data.data || [];
      setLedgers(dataLedgers);

      // Hitung saldo kas yang tersedia untuk dipinjamkan kembali
      const calculatedBalance = dataLedgers
        .filter(
          (l) =>
            l.type !== "REPAYMENT_INTEREST" &&
            l.type !== "DISCOUNT_INTEREST" &&
            l.type !== "INTEREST_ACCRUAL" &&
            l.type !== "DISCOUNT_PRINCIPAL",
        )
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      setBalance(calculatedBalance);
    } catch (error) {
      Swal.fire("Gagal", "Tidak dapat mengambil data buku besar.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLedgers();
  }, [fetchLedgers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  // Fungsi Cetak Neraca
  const handleDownloadReport = async () => {
    setDownloading(true);
    try {
      const res = await axiosInstance.get(
        `/reports?start_date=${reportDates.start}&end_date=${reportDates.end}`,
      );
      const data = res.data;

      // 1. HITUNG DISKON
      const totalDiskonPokok = ledgers
        .filter((l) => l.type === "DISCOUNT_PRINCIPAL")
        .reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

      const totalDiskonBunga = ledgers
        .filter((l) => l.type === "DISCOUNT_INTEREST")
        .reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

      // 2. HITUNG KOMPONEN UNTUK KAS MURNI
      const totalInjection = ledgers
        .filter((l) => l.type === "INJECTION")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      const totalDisbursement = ledgers
        .filter((l) => l.type === "DISBURSEMENT")
        .reduce((acc, curr) => acc + Math.abs(Number(curr.amount)), 0);

      const totalRepaymentPrincipal = ledgers
        .filter((l) => l.type === "REPAYMENT_PRINCIPAL")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      // Rumus Kas Murni (Aset Lancar)
      const pureCashOnHand =
        totalInjection - totalDisbursement + totalRepaymentPrincipal;

      // 3. PIUTANG & LABA
      const loanReceivables = Number(data.assets?.loan_receivables || 0);
      const totalBungaDiterima = ledgers
        .filter(
          (l) =>
            l.type === "REPAYMENT_INTEREST" && l.type !== "INTEREST_ACCRUAL",
        )
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      const doc = new jsPDF();
      const formatIDR = (val) => "Rp " + Number(val).toLocaleString("id-ID");

      doc.setFontSize(14);
      doc.text("LAPORAN NERACA (BALANCE SHEET)", 105, 15, { align: "center" });
      doc.setFontSize(10);
      doc.text(
        `Periode: ${reportDates.start} s/d ${reportDates.end}`,
        105,
        22,
        { align: "center" },
      );

      autoTable(doc, {
        startY: 30,
        theme: "grid",
        head: [["Deskripsi Akun", "Nominal"]],
        body: [
          [
            {
              content: "AKTIVA (ASSETS)",
              styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
            },
            "",
          ],
          ["   Kas di Tangan (Murni Modal)", formatIDR(pureCashOnHand)],
          ["   Piutang Pokok Nasabah", formatIDR(loanReceivables)],
          [
            { content: "TOTAL AKTIVA", styles: { fontStyle: "bold" } },
            formatIDR(pureCashOnHand + loanReceivables),
          ],
          ["", ""],
          [
            {
              content: "PASIVA (EQUITY & LIABILITIES)",
              styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
            },
            "",
          ],
          ["   Modal Disetor (Net/Injection)", formatIDR(totalInjection)],
          ["   Laba (Total Bunga)", formatIDR(totalBungaDiterima)],
          [
            {
              content: "PENYESUAIAN (DISCOUNT)",
              styles: { fontStyle: "bold", fillColor: [255, 245, 230] },
            },
            "",
          ],
          ["   Total Diskon Pokok", `(${formatIDR(totalDiskonPokok)})`],
          ["   Total Diskon Bunga", `(${formatIDR(totalDiskonBunga)})`],
          ["", ""],
          [
            {
              content: "TOTAL PASIVA (Balance)",
              styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
            },
            formatIDR(totalInjection + totalBungaDiterima - totalDiskonPokok),
          ],
        ],
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
          halign: "center",
        },
        columnStyles: { 1: { halign: "right", cellWidth: 60 } },
      });

      doc.save(`Neraca_${reportDates.start}.pdf`);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Gagal mengunduh laporan neraca", "error");
    } finally {
      setDownloading(false);
    }
  };

  const filteredLedgers = useMemo(() => {
    return ledgers.filter((l) => {
      const description = (l.description || "").toLowerCase();
      const refNum = (l.refrence_number || "").toLowerCase();
      const matchesSearch =
        description.includes(searchTerm.toLowerCase()) ||
        refNum.includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" ? true : l.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [ledgers, searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredLedgers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredLedgers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <LayoutDashboard>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 p-5 bg-white rounded-lg shadow border-l-4 border-amerta-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">
                Saldo Kas Saat Ini
              </p>
              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Rp {Number(balance).toLocaleString()}
              </h2>
            </div>
            <div className="p-3 bg-amerta-50 text-amerta-600 rounded-full">
              <WalletIcon />
            </div>
          </div>
        </div>

        <div className="flex-2 p-5 bg-white rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">
            Cetak Laporan Neraca (PDF)
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="text-[10px] text-gray-500 block">Dari</label>
              <input
                type="date"
                className="text-sm border p-2 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={reportDates.start}
                onChange={(e) =>
                  setReportDates({ ...reportDates, start: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 block">Sampai</label>
              <input
                type="date"
                className="text-sm border p-2 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={reportDates.end}
                onChange={(e) =>
                  setReportDates({ ...reportDates, end: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold flex items-center gap-2 transition disabled:bg-gray-400"
            >
              {downloading ? "Memproses..." : "Cetak Neraca"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <h1 className="text-xl font-bold text-gray-800">
            Buku Besar Modal (Capital Ledger)
          </h1>
          <Link
            href="/dashboard/ledgers/create"
            className="px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
          >
            + Mutasi Manual
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Cari Deskripsi / Ref
            </label>
            <input
              type="text"
              placeholder="Cari keterangan mutasi..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-60">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Tipe Mutasi
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Semua Tipe</option>
              <option value="INJECTION">Injection</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="DISBURSEMENT">Disbursement</option>
              <option value="REPAYMENT_PRINCIPAL">Pokok</option>
              <option value="REPAYMENT_INTEREST">Bunga</option>
              <option value="EXPENSE_OPS">Biaya Ops</option>
              <option value="ADJUSTMENT">Adjustment</option>
              <option value="DISCOUNT_PRINCIPAL">Diskon Pokok</option>
              <option value="DISCOUNT_INTEREST">Diskon Bunga</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg mx-2 shadow border border-gray-200">
          <table className="w-full min-w-200 border-collapse bg-white">
            <thead>
              <tr className="bg-amerta-600 text-white">
                <th className="p-3 border border-amerta-700">No</th>
                <th className="p-3 border border-amerta-700 text-left">
                  Tanggal
                </th>
                <th className="p-3 border border-amerta-700">Tipe</th>
                <th className="p-3 border border-amerta-700 text-left">
                  Deskripsi
                </th>
                <th className="p-3 border border-amerta-700 text-right">
                  Nominal
                </th>
                <th className="p-3 border border-amerta-700 text-left">
                  Admin
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((l, index) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="p-3 text-center border border-gray-200">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm">
                      {new Date(l.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-[9px] font-bold border uppercase ${getTypeBadge(l.type)}`}
                      >
                        {l.type?.replace("_", " ") || "N/A"}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="text-sm font-semibold">
                        {l.description}
                      </div>
                      <div className="text-[10px] text-gray-400 italic">
                        {l.refrence_number || "-"}
                      </div>
                    </td>
                    <td
                      className={`p-3 border border-gray-200 text-right font-bold ${Number(l.amount) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {Number(l.amount) >= 0 ? "+" : ""} Rp{" "}
                      {Number(l.amount).toLocaleString()}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm">
                      {l.user?.full_name || "System"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-5 text-center text-gray-500 italic"
                  >
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center mx-2">
          <p className="text-sm text-gray-500">
            Halaman {currentPage} dari {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

function getTypeBadge(type) {
  switch (type) {
    case "INJECTION":
    case "REPAYMENT_PRINCIPAL":
    case "REPAYMENT_INTEREST":
      return "bg-green-50 text-green-700 border-green-200";
    case "WITHDRAWAL":
    case "DISBURSEMENT":
    case "EXPENSE_OPS":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}
