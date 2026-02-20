"use client";

import Link from "next/link";
import LayoutDashboard from "../../components/LayoutDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import Swal from "sweetalert2";

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

export default function DashboardUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Gagal", "Tidak dapat mengambil data user.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (userId, name) => {
    if (userId === "1") {
      // Proteksi sederhana untuk super admin ID 1
      return Swal.fire("Dilarang", "User utama tidak dapat dihapus.", "error");
    }

    Swal.fire({
      title: "Hapus User?",
      text: `User ${name} tidak akan bisa mengakses dashboard lagi.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/users/${userId}`);
          Swal.fire("Berhasil!", "User telah dihapus.", "success");
          setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (error) {
          Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
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
              Manajemen User & Staff
            </h1>
            <p className="text-xs text-gray-400">
              Kelola hak akses admin dan staff lapangan
            </p>
          </div>
          <Link
            href="/dashboard/users/create"
            className="mt-2 md:mt-0 px-4 py-2 rounded text-white bg-amerta-600 hover:bg-amerta-700 transition font-semibold shadow-sm inline-block"
          >
            + Tambah User Baru
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 mx-2 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Cari User
            </label>
            <input
              type="text"
              placeholder="Cari nama atau email user..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Role / Jabatan
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amerta-600 outline-none bg-white cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Semua Role</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff Lapangan</option>
              <option value="MANAGER">Manager</option>
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
                <th className="font-semibold w-[30%] p-3 border border-amerta-700 text-left">
                  Nama Lengkap
                </th>
                <th className="font-semibold w-[25%] p-3 border border-amerta-700 text-left">
                  Email
                </th>
                <th className="font-semibold w-[15%] p-3 border border-amerta-700 text-center">
                  Role
                </th>
                <th className="font-semibold w-[10%] p-3 border border-amerta-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td
                      colSpan="5"
                      className="px-6 py-6 border border-gray-100 bg-gray-50/50"
                    ></td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-center border border-gray-200 text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">
                      {user.full_name}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold border uppercase ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/users/edit/${user.id}`)
                          }
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-md border border-blue-200 transition-all"
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.full_name)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-md border border-red-200 transition-all"
                          title="Hapus"
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
                    colSpan="5"
                    className="p-12 text-center text-gray-400 bg-gray-50 italic"
                  >
                    Data user tidak ditemukan.
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
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
              </span>{" "}
              dari <span className="text-gray-800">{filteredUsers.length}</span>{" "}
              user
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
