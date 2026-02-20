"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

// Icon Wallet untuk Dashboard Ledgers
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
  const router = useRouter();
  const [ledgers, setLedgers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLedgers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/ledgers");
      setLedgers(response.data.data || []);
      setBalance(response.data.current_balance || 0);
    } catch (error) {
      console.error("Error fetching ledgers:", error);
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredLedgers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredLedgers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <LayoutDashboard>
      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-lg shadow border-l-4 border-amerta-600">
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
      </div>

      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Buku Besar Modal (Capital Ledger)
            </h1>
          </div>
          <Link
            href="/dashboard/ledgers/create"
            className="mt-2 md:mt-0 px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
          >
            + Mutasi Manual (Injeksi/OPS)
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Cari Deskripsi / Ref
            </label>
            <input
              type="text"
              placeholder="Cari keterangan mutasi atau nomor referensi..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-60">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Tipe Mutasi
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none bg-white cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Semua Tipe</option>
              <option value="INJECTION">Injection (Modal Masuk)</option>
              <option value="WITHDRAWAL">Withdrawal (Tarik Modal)</option>
              <option value="DISBURSEMENT">Disbursement (Pencairan)</option>
              <option value="REPAYMENT_PRINCIPAL">
                Repayment Principal (Pokok)
              </option>
              <option value="REPAYMENT_INTEREST">
                Repayment Interest (Bunga)
              </option>
              <option value="EXPENSE_OPS">Expense Ops (Biaya)</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg mx-2 shadow border border-gray-200">
          <table className="w-full min-w-200 border-collapse bg-white">
            <thead>
              <tr className="bg-amerta-600 text-white">
                <th className="font-semibold w-[5%] p-3 border border-amerta-700 text-center">
                  No
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-left">
                  Tanggal
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-left">
                  Tipe
                </th>
                <th className="font-semibold w-[30%] p-3 border border-amerta-700 text-left">
                  Deskripsi
                </th>
                <th className="font-semibold w-[20%] p-3 border border-amerta-700 text-right">
                  Nominal
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-left">
                  Admin
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan="6"
                      className="px-6 py-6 border border-gray-100 bg-gray-50/50"
                    ></td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((l, index) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center border border-gray-200 text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm">
                      {new Date(l.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-[9px] font-bold border uppercase ${getTypeBadge(l.type)}`}
                      >
                        {l.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700">
                        {l.description}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono italic">
                        {l.refrence_number || "-"}
                      </div>
                    </td>
                    <td
                      className={`p-3 border border-gray-200 text-right font-bold ${l.amount >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {l.amount >= 0 ? "+" : ""} Rp{" "}
                      {Number(l.amount).toLocaleString()}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm text-gray-600">
                      {l.user?.full_name || "System"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-12 text-center text-gray-400 bg-gray-50 italic"
                  >
                    Data mutasi tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 px-2">
            <p className="text-sm text-gray-500 font-medium">
              Menampilkan{" "}
              <span className="text-gray-800">{startIndex + 1}</span> -{" "}
              <span className="text-gray-800">
                {Math.min(startIndex + itemsPerPage, filteredLedgers.length)}
              </span>{" "}
              dari{" "}
              <span className="text-gray-800">{filteredLedgers.length}</span>{" "}
              mutasi
            </p>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-1 border rounded-md transition ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-amerta-600 hover:text-white"}`}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md transition ${currentPage === i + 1 ? "bg-amerta-600 text-white font-bold" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-1 border rounded-md transition ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-amerta-600 hover:text-white"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
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
