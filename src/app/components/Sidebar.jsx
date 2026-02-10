"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

  // 1. Definisi Menu dalam Array
  const menuItems = [
    {
      name: "Beranda",
      href: "/dashboard",
      icon: (className) => (
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
      ),
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: (className) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      name: "Buku Besar",
      href: "/dashboard/ledgers",
      icon: (className) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      ),
    },
    {
      name: "Transaksi",
      href: "/dashboard/transactions",
      icon: (className) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      ),
    },
  ];

  const getActiveClasses = (path) => {
    const active =
      path === "/dashboard"
        ? pathname === "/dashboard"
        : pathname?.startsWith(path);

    return active
      ? "bg-amerta-700 text-white shadow-md"
      : "bg-amerta-100 text-amerta-900";
  };

  return (
    <>
      {/* DESKTOP SIDEBAR (Kiri - Muncul di md keatas) */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 sticky top-0">
        <div className="px-6 py-8">
          <h2 className="text-xl text-white font-semibold px-4 py-4 text-center bg-amerta-700 rounded-xl shadow-lg">
            Amerta Gauri
          </h2>
        </div>

        <nav className="flex-1 space-y-2 px-4 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-amerta-600 hover:text-white group ${getActiveClasses(item.href)}`}
            >
              {item.icon("size-6 group-hover:scale-110 transition-transform")}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="border-b border-gray-200 my-6"></div>
          <LogoutButton />
        </nav>
      </aside>

      {/* MOBILE NAVIGATION (Bawah - Muncul di layar kecil) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 flex justify-around items-center">
        {menuItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${active ? "text-amerta-700" : "text-gray-500"}`}
            >
              {item.icon("size-6")}
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
        {/* Tombol Logout Mobile bisa disisipkan di sini atau di Profile Header */}
        <div className="flex flex-col items-center justify-center flex-1">
          <LogoutButton isMobile />
        </div>
      </nav>
    </>
  );
}
