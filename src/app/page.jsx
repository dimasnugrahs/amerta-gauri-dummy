"use client";

import Image from "next/image";
import LayoutDefault from "./components/LayoutDefault";
import Background from "../../public/images/background.png";
import Link from "next/link";

export default function Home() {
  return (
    <LayoutDefault>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center items-center h-full">
          <Image
            src={Background}
            className="w-[80%] md:w-[70%]"
            alt="Profile"
          />
        </div>
        <div className="text-center md:text-left">
          <div className="md:px-6 pt-10 md:pt-24 font-extrabold md:font-bold text-2xl md:text-4xl">
            Selamat Datang di Dashboard Amerta Gauri
          </div>
          <div className="font-light md:px-6">
            Pencatatan, pelaporan, monitoring dan operasional kini lebih mudah,
            semuanya dalam satu genggaman.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mt-4 md:pl-6 grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
              <Link
                href="/signin"
                className=" py-2 bg-amerta-500 text-white rounded hover:bg-amerta-700 transition-all shadow-md"
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className=" py-2 bg-transparent text-amerta-500 border border-amerta-700 rounded hover:bg-amerta-700 hover:text-white transition-all shadow-md"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
