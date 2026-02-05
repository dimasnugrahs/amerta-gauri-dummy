"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); // pathname sekarang adalah string, misal "/dashboard"

  const isActive = (path) => {
    // Pastikan pathname tidak null/undefined sebelum panggil startsWith
    if (!pathname) return "";

    if (path === "/dashboard") {
      return pathname === "/dashboard" ? "bg-amerta-700 text-white" : "";
    }

    // Gunakan pathname langsung, bukan pathname.pathname
    return pathname.startsWith(path) ? "bg-amerta-700 text-white" : "";
  };

  return (
    <div className=" text-amerta-950 h-full">
      <h2 className="text-xl text-white font-normal px-4 py-4 text-center bg-amerta-700 mx-2 my-6 rounded">Amerta Gauri</h2>
      <nav className="space-y-3 px-2 mt-10">
        <Link
          href="/dashboard"
          className={`block px-3 py-4 rounded bg-amerta-200 hover:bg-amerta-700 hover:text-white transition duration-150 ${isActive(
            "/dashboard",
          )}`}
        >
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            Beranda
          </div>
        </Link>

        <Link
          href="/dashboard/customers"
          className={`block px-3 py-4 rounded bg-amerta-200 hover:bg-amerta-700 hover:text-white transition duration-150 ${isActive(
            "/dashboard/customers",
          )}`}
        >
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            Customers
          </div>
        </Link>

        <Link
          href="/dashboard/ledgers"
          className={`block px-3 py-4 rounded bg-amerta-200 hover:bg-amerta-700 hover:text-white transition duration-150 ${isActive(
            "/dashboard/ledgers",
          )}`}
        >
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Buku Besar
          </div>
        </Link>

        <Link
          href="/dashboard/transactions"
          className={`block px-3 py-4 rounded bg-amerta-200 hover:bg-amerta-700 hover:text-white transition duration-150 ${isActive(
            "/dashboard/transactions",
          )}`}
        >
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>
            Transaksi
          </div>
        </Link>

        <div className="border-b-2 border-gray-500 my-4"></div>
        <Link
          href="#"
          className={`block px-3 py-4 rounded bg-gray-200 hover:bg-gray-400 hover:text-white transition duration-150 ${isActive(
            "#",
          )}`}
        >
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
            Logout
          </div>
        </Link>
      </nav>
    </div>
  );
}
