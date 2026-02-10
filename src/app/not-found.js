// src/app/not-found.js
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-amerta-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Opps! Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mt-2 mb-8">
        Sepertinya kamu tersesat. Halaman yang kamu cari tidak tersedia.
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-amerta-500 text-white rounded-md hover:bg-amerta-700 transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
