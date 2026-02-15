"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Tambahkan ini
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2"; // Gunakan Swal agar konsisten dengan halaman Create/Edit

export default function DashboardCustomers() {
  const router = useRouter(); // Inisialisasi router
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Delete Confirmation
  const [showConfirm, setShowConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/customers");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customerId) => {
    // Sesuaikan path dengan struktur folder: dashboard/customers/edit/[id]
    router.push(`/dashboard/customers/edit/${customerId}`);
  };

  const handleDelete = (customerId) => {
    // Kita bisa gunakan SweetAlert2 langsung agar lebih modern tanpa buat modal manual
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data customer ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Menggunakan axiosInstance agar header auth/cookie ikut terkirim
          await axiosInstance.delete(`/customers/${customerId}`);

          Swal.fire("Terhapus!", "Customer berhasil dihapus.", "success");

          // Refresh data tanpa reload halaman
          setCustomers(customers.filter((c) => c.id !== customerId));
        } catch (error) {
          console.error("Error deleting customer:", error);
          Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
        }
      }
    });
  };

  return (
    <>
      <LayoutDashboard>
        <div className="px-4 py-5 rounded bg-white shadow mb-30">
          <div className="md:flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">
              Daftar Customer
            </div>
            <div className="mt-2 md:mt-0">
              <Link
                href={"/dashboard/customers/create"}
                className="px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold"
              >
                + Tambah Customer
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg mt-5 shadow border border-gray-200">
            <table className="w-full min-w-200 border-collapse bg-white">
              <thead>
                <tr className="bg-amerta-600 text-white">
                  <th className="font-semibold w-[5%] p-3 border border-amerta-700 text-center">
                    No
                  </th>
                  <th className="font-semibold w-[20%] p-3 border border-amerta-700 text-left">
                    Nama
                  </th>
                  <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-left">
                    Telepon
                  </th>
                  <th className="font-semibold w-[25%] p-3 border border-amerta-700 text-left">
                    Alamat
                  </th>
                  <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-center">
                    Status
                  </th>
                  <th className="font-semibold w-[20%] p-3 border border-amerta-700 text-center">
                    Aksi
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
                ) : customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-center border border-gray-200">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-gray-200 font-medium">
                        {customer.full_name}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {customer.phone_number || "-"}
                      </td>
                      <td className="p-3 border border-gray-200 text-sm">
                        {customer.address || "-"}
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${
                            customer.isActive
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {customer.isActive ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(customer.id)}
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-200 transition-all"
                            title="Edit"
                          >
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
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 transition-all"
                            title="Hapus"
                          >
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
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-10 text-center text-gray-500 bg-gray-50"
                    >
                      Belum ada data customer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}
