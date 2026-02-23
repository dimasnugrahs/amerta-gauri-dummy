"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- ICONS ---
const EditIcon = () => (
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
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const TrashIcon = () => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const PrintIcon = () => (
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
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
    />
  </svg>
);

export default function DashboardLoanAccounts() {
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/loanaccounts");
      setLoans(response.data.data || []);
    } catch (error) {
      console.error("Error fetching loan accounts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch =
        loan.no_rekening.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.customer?.full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : loan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const handleDelete = (noRekening) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Account ${noRekening} akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/loanaccounts/${noRekening}`);
          Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          setLoans((prev) => prev.filter((l) => l.no_rekening !== noRekening));
        } catch (error) {
          Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
        }
      }
    });
  };

  const handlePrint = async (noRekening) => {
    Swal.fire({
      title: "Menyiapkan PDF...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axiosInstance.get(
        `/loanaccounts/${noRekening}/history`,
      );
      const account = res.data.data;
      const transactions = account.transactions || [];

      const doc = new jsPDF({
        orientation: "landscape",
      });

      // Header - Standar Hitam Putih
      doc.setFontSize(16);
      doc.text("RIWAYAT TRANSAKSI PINJAMAN", 14, 15);

      doc.setFontSize(10);
      doc.text(`No. Rekening : ${account.no_rekening}`, 14, 25);
      doc.text(`Nasabah      : ${account.customer?.full_name || "-"}`, 14, 30);
      doc.text(
        `Produk       : ${account.product?.product_name || "-"}`,
        14,
        35,
      );
      doc.text(`Tanggal Cetak: ${new Date().toLocaleString("id-ID")}`, 14, 40);

      const tableRows = transactions.map((t, index) => {
        const kredit = Number(t.amount_paid || 0);
        const debet = 0;
        const totalBayar = kredit;

        return [
          index + 1,
          new Date(t.paid_date || t.created_at).toLocaleDateString("id-ID"),
          `${t.payment_method} - ${t.payment_attachment || "N/A"}`,
          formatCurrency(kredit),
          formatCurrency(debet),
          formatCurrency(totalBayar),
          formatCurrency(Number(t.remaining_principal || 0)),
        ];
      });

      autoTable(doc, {
        startY: 45,
        head: [
          [
            "No",
            "Tanggal",
            "Keterangan Pembayaran",
            "Kredit",
            "Debet",
            "Total",
            "Sisa Hutang",
          ],
        ],
        body:
          tableRows.length > 0
            ? tableRows
            : [["-", "-", "Belum ada transaksi", "-", "-", "-", "-"]],
        theme: "grid", // Menggunakan grid standar tanpa warna background
        headStyles: {
          fillColor: false, // Menghilangkan warna biru
          textColor: [0, 0, 0], // Font kepala tabel jadi hitam
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
          halign: "center",
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 10 },
          1: { cellWidth: 30 },
          2: { cellWidth: 60 },
          3: { halign: "right" },
          4: { halign: "right" },
          5: { halign: "right" },
          6: { halign: "right", fontStyle: "bold" },
        },
        styles: {
          fontSize: 8,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
      });

      doc.save(`History_${noRekening}.pdf`);
      Swal.close();
    } catch (error) {
      console.error("Print Error:", error);
      Swal.fire(
        "Gagal",
        "Tidak dapat mengambil riwayat transaksi. Pastikan API history sudah benar.",
        "error",
      );
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <h1 className="text-xl font-bold text-gray-800">
            Dashboard Loan Accounts
          </h1>
          <Link
            href="/dashboard/accounts/create"
            className="px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 font-semibold shadow-sm"
          >
            + Tambah Rekening
          </Link>
        </div>

        {/* --- FILTER --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Cari Rekening
            </label>
            <input
              type="text"
              placeholder="No. Rekening atau nama..."
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-amerta-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-white outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="ACTIVE">Aktif</option>
              <option value="SETTLED">Lunas</option>
              <option value="CLOSED">Ditutup</option>
            </select>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="overflow-x-auto rounded-lg mx-2 shadow border border-gray-200">
          <table className="w-full min-w-200 bg-white">
            <thead>
              <tr className="bg-amerta-600 text-white">
                <th className="p-3 border border-amerta-700 text-center">No</th>
                <th className="p-3 border border-amerta-700 text-left">
                  No. Rekening
                </th>
                <th className="p-3 border border-amerta-700 text-left">
                  Nasabah
                </th>
                <th className="p-3 border border-amerta-700 text-left">
                  Sisa Hutang
                </th>
                <th className="p-3 border border-amerta-700 text-left">
                  Produk
                </th>
                <th className="p-3 border border-amerta-700 text-center">
                  Status
                </th>
                <th className="p-3 border border-amerta-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-10 text-center animate-pulse">
                    Memuat data...
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((loan, index) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-center border border-gray-200 text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-bold text-amerta-700">
                      {loan.no_rekening}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <div className="text-gray-800 font-medium">
                        {loan.customer?.full_name}
                      </div>
                      <div className="text-xs text-gray-400">
                        Marketing: {loan.user?.full_name}
                      </div>
                    </td>
                    <td className="p-3 border border-gray-200 font-semibold">
                      {formatCurrency(loan.current_debt_principal)}
                    </td>
                    <td className="p-3 border border-gray-200 text-sm">
                      {loan.product?.product_name || "-"}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                          loan.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handlePrint(loan.no_rekening)}
                          className="p-2 text-green-600 bg-green-50 hover:bg-green-600 hover:text-white rounded-md border border-green-200 transition-all"
                          title="Cetak Riwayat"
                        >
                          <PrintIcon />
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/accounts/edit/${loan.no_rekening}`,
                            )
                          }
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-md border border-blue-200 transition-all"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(loan.no_rekening)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-md border border-red-200 transition-all"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-12 text-center text-gray-400 italic"
                  >
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 px-2">
            <p className="text-sm text-gray-500">
              Menampilkan {startIndex + 1} -{" "}
              {Math.min(startIndex + itemsPerPage, filteredLoans.length)} dari{" "}
              {filteredLoans.length} data
            </p>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded bg-white hover:bg-amerta-600 hover:text-white disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded bg-white hover:bg-amerta-600 hover:text-white disabled:opacity-50"
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
