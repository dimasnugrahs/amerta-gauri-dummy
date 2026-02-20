"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

// Icon Reverse (Mengganti Trash karena ini sistem keuangan)
const ReverseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2z"
    />
  </svg>
);

export default function DashboardTransactions() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/transactions");
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Swal.fire("Gagal", "Tidak dapat mengambil data transaksi.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const customerName = (
        tx.loan_account?.customer?.full_name || ""
      ).toLowerCase();
      const invoiceNum = (tx.invoice_number || "").toLowerCase();

      const matchesSearch =
        customerName.includes(searchTerm.toLowerCase()) ||
        invoiceNum.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : tx.payment_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleReverse = (txId, invoice) => {
    Swal.fire({
      title: "Reverse Transaksi?",
      text: `Transaksi ${invoice} akan dibatalkan dan saldo akan dikembalikan ke nasabah.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Reverse Transaksi!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.post("/transactions/reverse", {
            transaction_id: txId,
          });
          if (res.data.success) {
            Swal.fire("Berhasil!", "Transaksi telah di-reverse.", "success");
            fetchTransactions(); // Refresh data
          }
        } catch (error) {
          const msg = error.response?.data?.message || "Terjadi kesalahan.";
          Swal.fire("Gagal", msg, "error");
        }
      }
    });
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Riwayat Transaksi
            </h1>
          </div>
          <Link
            href="/dashboard/transactions/create"
            className="mt-2 md:mt-0 px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
          >
            + Pembayaran Angsuran
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Cari Transaksi
            </label>
            <input
              type="text"
              placeholder="Cari nama nasabah atau nomor invoice..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Status Pembayaran
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none bg-white cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="SUCCESS">Sukses</option>
              <option value="REFUNDED">Dibatalkan (Reverse)</option>
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
                  Invoice / Tgl
                </th>
                <th className="font-semibold w-[20%] p-3 border border-amerta-700 text-left">
                  Nasabah
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-right">
                  Nominal
                </th>
                <th className="font-semibold w-[20%] p-3 border border-amerta-700 text-left">
                  Alokasi (P/I)
                </th>
                <th className="font-semibold w-[10%] p-3 border border-amerta-700 text-center">
                  Status
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan="7"
                      className="px-6 py-6 border border-gray-100 bg-gray-50/50"
                    ></td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((tx, index) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-center border border-gray-200 text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">
                      <div className="text-sm">{tx.invoice_number}</div>
                      <div className="text-[10px] text-gray-400 font-normal">
                        {new Date(tx.paid_date).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700">
                        {tx.loan_account?.customer?.full_name || "-"}
                      </div>
                      <div className="text-[10px] text-amerta-600 font-mono uppercase">
                        {tx.loan_account?.no_rekening}
                      </div>
                    </td>
                    <td className="p-3 border border-gray-200 text-right font-bold text-gray-800">
                      Rp {Number(tx.amount_paid).toLocaleString()}
                    </td>
                    <td className="p-3 border border-gray-200 text-[11px]">
                      <div className="flex justify-between text-blue-600">
                        <span>Pokok:</span>
                        <span className="font-bold">
                          Rp {Number(tx.principal_cut).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-orange-600">
                        <span>Bunga:</span>
                        <span className="font-bold">
                          Rp {Number(tx.interest_cut).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold border uppercase ${
                          tx.payment_status === "SUCCESS"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {tx.payment_status === "SUCCESS" ? "Sukses" : "Reverse"}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      {tx.payment_status === "SUCCESS" && (
                        <button
                          onClick={() =>
                            handleReverse(tx.id, tx.invoice_number)
                          }
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-md border border-red-200 transition-all"
                          title="Reverse Transaksi"
                        >
                          <ReverseIcon />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-12 text-center text-gray-400 bg-gray-50 italic"
                  >
                    {searchTerm || statusFilter !== "all"
                      ? "Hasil pencarian tidak ditemukan."
                      : "Belum ada data transaksi."}
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
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredTransactions.length,
                )}
              </span>{" "}
              dari{" "}
              <span className="text-gray-800">
                {filteredTransactions.length}
              </span>{" "}
              transaksi
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
