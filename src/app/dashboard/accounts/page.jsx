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

      // 1. Ambil data dari API
      const transactions = account.transactions || [];
      const interestAccruals = account.capital_ledgers || [];

      // 2. Gabungkan & Urutkan Kronologis
      // Kita buat format objek yang seragam agar mudah di-map ke tabel
      const combinedHistory = [
        ...transactions.map((t) => ({
          date: new Date(t.paid_date || t.created_at),
          description: `ANGSURAN - ${t.payment_method}\n(Pokok: ${formatCurrency(Number(t.principal_cut))} | Bunga: ${formatCurrency(Number(t.interest_cut))})`,
          kredit: Number(t.amount_paid),
          principal_cut: Number(t.principal_cut),
          interest_cut: Number(t.interest_cut),
          debet: 0,
          type: "PAYMENT",
        })),
        ...interestAccruals.map((l) => ({
          date: new Date(l.created_at),
          description: `BUNGA OTOMATIS (EOM)\n${l.description || ""}`,
          kredit: 0,
          principal_cut: 0,
          interest_cut: 0,
          debet: Number(l.amount), // Bunga menambah hutang
          type: "INTEREST",
        })),
      ].sort((a, b) => a.date - b.date); // Urutkan dari yang terlama ke terbaru

      const doc = new jsPDF({ orientation: "landscape" });

      const logoUrl = "/images/logo-amerta-gauri.png";

      try {
        // Jika menggunakan URL lokal, pastikan sudah di-load atau gunakan Base64

        doc.addImage(logoUrl, "PNG", 14, 10, 6, 6);
      } catch (e) {
        console.error("Gagal memuat logo:", e);
      }

      // --- HEADER PDF ---
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("RIWAYAT TRANSAKSI PINJAMAN", 23, 15);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      doc.setFontSize(10);
      doc.text(`No. Rekening`, 14, 25);
      doc.text(`:`, 44, 25);
      doc.text(`${account.no_rekening}`, 54, 25);

      doc.text(`Nasabah`, 14, 30);
      doc.text(`:`, 44, 30);
      doc.text(`${account.customer?.full_name || "-"}`, 54, 30);

      doc.text(`Produk`, 14, 35);
      doc.text(`:`, 44, 35);
      doc.text(`${account.product?.product_name || "-"}`, 54, 35);

      doc.text(`Tanggal Cetak`, 14, 40);
      doc.text(`:`, 44, 40);
      doc.text(`${new Date().toLocaleString("id-ID")}`, 54, 40);

      doc.setFontSize(10);
      doc.text(`Sisa Hutang`, 124, 25);
      doc.text(`:`, 154, 25);
      doc.text(
        `${formatCurrency(Number(account.current_debt_principal))}`,
        164,
        25,
      );

      doc.setFontSize(10);
      doc.text(`Tunggakan`, 124, 30);
      doc.text(`:`, 154, 30);
      doc.text(
        `${formatCurrency(Number(account.current_debt_interest))}`,
        164,
        30,
      );

      // --- LOGIKA SALDO BERJALAN (Running Balance) ---
      let runningBalance = Number(account.principal_amount); // Mulai dari nilai pencairan awal

      // Baris awal: Pencairan
      const tableRows = [
        [
          "1",
          new Date(account.created_at).toLocaleDateString("id-ID"),
          "PENCAIRAN PINJAMAN (POKOK AWAL)",
          "-",
          "-",
          formatCurrency(runningBalance),
        ],
      ];

      // Baris transaksi gabungan
      combinedHistory.forEach((item, index) => {
        if (item.type === "PAYMENT") {
          runningBalance -= item.principal_cut;
        }

        tableRows.push([
          (index + 2).toString(),
          item.date.toLocaleDateString("id-ID"),
          item.description,
          item.kredit > 0 ? formatCurrency(item.kredit) : "-",
          item.debet > 0 ? formatCurrency(item.debet) : "-",
          formatCurrency(runningBalance),
        ]);
      });

      // --- GENERATE TABLE ---
      autoTable(doc, {
        startY: 45,
        head: [
          [
            "No",
            "Tanggal",
            "Keterangan",
            "Kredit (Bayar)",
            "Debet (Bunga)",
            "Saldo Hutang",
          ],
        ],
        body: tableRows,
        theme: "grid",
        headStyles: {
          fillColor: [44, 62, 80],
          textColor: [255, 255, 255],
          halign: "center",
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 10 },
          1: { cellWidth: 30 },
          2: { cellWidth: 100 },
          3: { halign: "right" },
          4: { halign: "right" },
          5: { halign: "right", fontStyle: "bold" },
        },
        styles: { fontSize: 8, valign: "middle" },
        didParseCell: (data) => {
          if (data.section === "body") {
            // Ambil teks dari kolom keterangan (indeks 2)
            const deskripsi = data.row.cells[2].text[0] || "";

            if (deskripsi.includes("BUNGA OTOMATIS")) {
              // Cara aman mewarnai cell tanpa forEach
              data.cell.styles.fillColor = [255, 248, 240];
            }
          }
        },
      });

      doc.save(`Riwayat_${account.no_rekening}.pdf`);
      Swal.close();
    } catch (error) {
      console.error("Print Error:", error);
      Swal.fire("Gagal", "Terjadi kesalahan: " + error.message, "error");
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-5 rounded bg-white shadow mb-30">
        <div className="md:flex justify-between items-center mb-6 mx-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Dashboard Loan Accounts
            </h1>
          </div>
          <Link
            href="/dashboard/accounts/create"
            className="mt-2 md:mt-0 px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
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
                  Tunggakan Bunga
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
                      {formatCurrency(loan.current_debt_interest)}
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
