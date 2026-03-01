"use client";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Akun Menunggu Verifikasi
      </h1>
      <p className="mt-2 text-gray-600">
        Pendaftaran berhasil! Namun, Anda belum memiliki izin untuk mengakses
        Dashboard.
        <br />
        Silakan hubungi Admin untuk mengaktifkan akun Anda.
      </p>
      <button
        onClick={() => (window.location.href = "/signin")}
        className="mt-6 px-4 py-2 bg-amerta-600 text-white rounded-md font-semibold"
      >
        Kembali ke Sign In
      </button>
    </div>
  );
}
