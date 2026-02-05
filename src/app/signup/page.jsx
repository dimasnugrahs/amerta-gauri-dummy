"use client";

import Image from "next/image";
import LayoutDefault from "../components/LayoutDefault";
import Background from "@/public/images/background.png";
import Link from "next/link";
import Form from "./_components/page";

export default function SignUpPage() {
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
        <div className="amerta-form-signin bg-amerta-100 rounded-xl px-4 md:px-10 py-6 md:py-13">
          <div className="text-center md:text-left font-extrabold md:font-bold text-2xl md:text-3xl">
            Saatnya Memulai Digitalisasi
          </div>
          <div className="font-light text-center md:text-left">
            Mulai dari sini, saatnya membuka gerbang digitalisasi.
          </div>
          <Form />
        </div>
      </div>
    </LayoutDefault>
  );
}
