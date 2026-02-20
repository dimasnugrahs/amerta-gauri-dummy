"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";
import LayoutDashboard from "@/src/app/components/LayoutDashboard";

export default function CreateTransactionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loanData, setLoanData] = useState(null);
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [formData, setFormData] = useState({
    loan_account_id: "",
    amount_paid: "",
    payment_method: "Tunai",
    approved_by_id: "",
    paid_date: new Date().toISOString().split("T")[0],
    payment_attachment: "",
  });

  // --- HELPER MATA UANG ---
  const formatDisplay = (value) => {
    if (!value) return "";
    return parseInt(value).toLocaleString("id-ID");
  };

  const cleanNumber = (value) => {
    return value.replace(/\./g, "").replace(/[^0-9]/g, "");
  };

  const handleAmountChange = (e) => {
    const rawValue = cleanNumber(e.target.value);
    setFormData({ ...formData, amount_paid: rawValue });
  };

  // --- LOGIKA PERHITUNGAN PREVIEW (Sinkron dengan API POST) ---
  const preview = useMemo(() => {
    if (!loanData) {
      return {
        interest_cut: 0,
        principal_cut: 0,
        monthly_interest: 0,
        total_interest_due: 0,
      };
    }

    const transactionDate = new Date(formData.paid_date);
    const selectedMonth = transactionDate.getMonth();
    const selectedYear = transactionDate.getFullYear();

    const amountPaid = Number(formData.amount_paid || 0);
    const tunggakanBungaDB = Number(loanData.current_debt_interest);
    const rateAmount = Number(loanData.rate_amount);
    const sisaPokok = Number(loanData.current_debt_principal);

    // --- LOGIKA PENGECEKAN TRANSAKSI ---
    // 1. Cek flag 'has_transaction_this_month' dari API
    // 2. ATAU Cek apakah ada history transaksi sukses di bulan ini pada array transactions (jika ada)
    const sudahAdaTransaksiBulanIni =
      loanData.has_transaction_this_month === true ||
      (loanData.transactions &&
        loanData.transactions.some((t) => {
          const tDate = new Date(t.paid_date);
          return (
            tDate.getMonth() === selectedMonth &&
            tDate.getFullYear() === selectedYear &&
            t.payment_status === "SUCCESS"
          );
        }));

    let bungaBulanIni = 0;

    // BUNGA HANYA DITAMBAHKAN JIKA:
    // - Belum ada transaksi bulan ini
    // - Sisa pokok masih ada
    if (!sudahAdaTransaksiBulanIni && sisaPokok > 0) {
      bungaBulanIni = rateAmount;
    }

    const totalKewajibanBunga = tunggakanBungaDB + bungaBulanIni;

    // ... (Logika interestCut dan principalCut tetap sama)
    let interestCut = 0;
    let principalCut = 0;

    if (totalKewajibanBunga > 0) {
      if (amountPaid >= totalKewajibanBunga) {
        interestCut = totalKewajibanBunga;
        principalCut = amountPaid - totalKewajibanBunga;
      } else {
        interestCut = amountPaid;
        principalCut = 0;
      }
    } else {
      interestCut = 0;
      principalCut = amountPaid;
    }

    if (principalCut > sisaPokok) principalCut = sisaPokok;

    return {
      interest_cut: interestCut,
      principal_cut: principalCut,
      monthly_interest: bungaBulanIni,
      total_interest_due: totalKewajibanBunga,
    };
  }, [loanData, formData.amount_paid]);

  // --- SEARCH REKENING ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length >= 3 && !loanData) {
        setIsSearching(true); // <--- Start loading
        try {
          const response = await axiosInstance.get(
            `/loanaccounts/search?query=${search}`,
          );
          if (response.data.success) {
            setSearchResults(response.data.data);
            setShowDropdown(true);
          }
        } catch (error) {
          console.error("Gagal mencari rekening:", error);
        } finally {
          setIsSearching(false); // <--- Stop loading
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, loanData]);

  const handleSelectLoan = (loan) => {
    // Pastikan loan yang dipilih membawa data has_transaction_this_month terbaru
    setLoanData(loan);
    setSearch(`${loan.no_rekening} - ${loan.customer?.full_name}`);
    setFormData((prev) => ({ ...prev, loan_account_id: loan.id }));
    setShowDropdown(false);
  };

  // --- FETCH APPROVERS ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        if (response.data.success) {
          const allowed = response.data.data.filter(
            (u) =>
              u.role?.toUpperCase() === "ADMIN" ||
              u.role?.toUpperCase() === "SUPERADMIN",
          );
          setUsers(allowed);
        }
      } catch (error) {
        console.error("Gagal mengambil user:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loanData || !formData.approved_by_id) {
      return Swal.fire("Peringatan", "Data belum lengkap", "warning");
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/transactions", formData);
      if (response.status === 201 || response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/transactions");
      }
    } catch (error) {
      Swal.fire(
        "Gagal",
        error.response?.data?.message || "Terjadi kesalahan",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutDashboard>
      <div className="px-4 py-6 rounded bg-white shadow-sm border border-gray-100 mb-10">
        <div className="flex items-center gap-4 mb-8 mx-2 text-gray-800">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full bg-amerta-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Input Transaksi Pembayaran</h1>
        </div>

        {/* Search Section */}
        <div className="mx-2 mb-6 bg-amerta-50 p-4 rounded-lg border border-amerta-100 relative">
          <label className="block text-sm font-bold text-amerta-700 mb-2 uppercase tracking-wide">
            Cari Rekening
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all"
            placeholder="Cari Nasabah..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (loanData) setLoanData(null); // Reset loan data jika user mengetik ulang
            }}
          />
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 w-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {searchResults.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => handleSelectLoan(loan)}
                  className="p-3 hover:bg-amerta-50 cursor-pointer border-b last:border-0"
                >
                  <div className="font-bold text-gray-800">
                    {loan.customer?.full_name}
                  </div>
                  <div className="text-xs text-amerta-600 font-mono">
                    {loan.no_rekening}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-2">
          {loanData && (
            <>
              {/* Informasi Rekening */}
              <div className="pt-2 border-t border-gray-100">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Informasi Rekening
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nama Nasabah
                    </p>
                    <p className="font-bold text-gray-800">
                      {loanData.customer?.full_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Bunga Bulan Ini
                    </p>
                    {/* Visualisasi logic bunga */}
                    <p
                      className={`font-bold ${preview.monthly_interest > 0 ? "text-amerta-600" : "text-gray-400"}`}
                    >
                      Rp {preview.monthly_interest.toLocaleString("id-ID")}
                    </p>
                    {preview.monthly_interest === 0 && (
                      <span className="text-[10px] text-green-600 font-semibold italic">
                        * Terbayar / Bebas Bunga
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Tunggakan Bunga
                    </p>
                    <p className="font-bold text-red-600">
                      Rp{" "}
                      {Number(loanData.current_debt_interest).toLocaleString(
                        "id-ID",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Sisa Pokok
                    </p>
                    <p className="font-bold text-gray-800">
                      Rp{" "}
                      {Number(loanData.current_debt_principal).toLocaleString(
                        "id-ID",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Nominal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nominal Pembayaran
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-amerta-700 text-lg">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none text-xl font-bold text-amerta-700"
                      value={formatDisplay(formData.amount_paid)}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
                {/* Sisanya tetap sama... */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Metode
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    value={formData.payment_method}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payment_method: e.target.value,
                      })
                    }
                  >
                    <option value="Tunai">Tunai</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    value={formData.paid_date}
                    onChange={(e) =>
                      setFormData({ ...formData, paid_date: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Disetujui Oleh
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    value={formData.approved_by_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        approved_by_id: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Pilih Approver --</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.full_name} ({u.role?.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preview Section */}
              {Number(formData.amount_paid) > 0 && (
                <div className="bg-amerta-600 text-white p-5 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in duration-300">
                  <div className="text-center md:text-left">
                    <p className="text-xs opacity-80 uppercase font-bold tracking-widest">
                      Kewajiban Bunga
                    </p>
                    <p className="text-xl font-bold">
                      Rp {preview.total_interest_due.toLocaleString("id-ID")}
                    </p>
                    {preview.monthly_interest === 0 ? (
                      <p className="text-[10px] text-yellow-300 font-semibold italic">
                        (Hanya Tunggakan - Bulan ini sudah bayar)
                      </p>
                    ) : (
                      <p className="text-[10px] opacity-70 italic">
                        (Tunggakan + Bunga{" "}
                        {new Date(formData.paid_date).toLocaleString("id-ID", {
                          month: "long",
                        })}
                        )
                      </p>
                    )}
                  </div>
                  <div className="h-px w-full md:h-12 md:w-px bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-xs opacity-80 uppercase font-bold text-yellow-300">
                      Potong Bunga
                    </p>
                    <p className="text-xl font-bold">
                      Rp {preview.interest_cut.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs opacity-80 uppercase font-bold text-green-300">
                      Potong Pokok
                    </p>
                    <p className="text-xl font-bold">
                      Rp {preview.principal_cut.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.amount_paid}
                  className={`py-3 rounded-lg text-white font-bold ${loading ? "bg-gray-400" : "bg-amerta-600 hover:bg-amerta-700"}`}
                >
                  {loading ? "Memproses..." : "Simpan Transaksi"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </LayoutDashboard>
  );
}
