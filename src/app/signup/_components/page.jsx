export default function Form() {
  return (
    <>
      <div className="mt-4">
        <div className="mb-2 md:mb-3">
          <label className="font-light">Nama Lengkap</label>
          <input
            type="text"
            required
            placeholder="Silahkan masukkan nama lengkap"
            className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="mb-2 md:mb-3">
          <label className="font-light">Username</label>
          <input
            type="text"
            required
            placeholder="Silahkan masukkan username"
            className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="mb-2 md:mb-3">
          <label className="font-light">Email</label>
          <input
            type="email"
            required
            placeholder="Silahkan masukkan email"
            className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="mb-4">
          <label className="font-light">Password</label>
          <input
            type="password"
            required
            placeholder="Silahkan masukkan password"
            className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amerta-600 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="submit"
            className="text-amerta-50 bg-amerta-500 hover:bg-amerta-700 w-full py-2 rounded"
          >
            Daftar Sekarang
          </button>
          <button
            type="submit"
            className="text-amerta-700 border border-amerta-700 hover:bg-amerta-800 hover:text-white w-full py-2 rounded"
          >
            Sudah Memiliki Akun
          </button>
        </div>
        {/* <div className="text-end font-light text-sm text-gray-500 underline mt-2">
          Lupa password
        </div> */}
      </div>
    </>
  );
}
