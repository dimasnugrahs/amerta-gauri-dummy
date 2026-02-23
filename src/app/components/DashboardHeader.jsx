"use client";

import { usePathname } from "next/navigation";
import UserProfile from "@/public/images/user-profile.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/src/lib/axios";

export default function DashboardHeader() {
  const pathname = usePathname(); // Mengambil path (contoh: /dashboard/categories)
  const [user, setUser] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi ☀️";
    if (hour < 17) return "Selamat Siang 🌤️";
    return "Selamat Malam 🌙";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/user");
        setUser(response.data.user);
      } catch (error) {
        console.error("Gagal mengambil data user");
      }
    };
    fetchUser();
  }, []);

  const getDynamicTitle = () => {
    // 1. Jika path adalah root dashboard atau home
    if (pathname === "/" || pathname === "/dashboard") {
      return "Dashboard";
    } // 2. Pecah string dan ambil bagian terakhir

    const segments = pathname.split("/").filter((item) => item !== "");
    let lastSegment = segments[segments.length - 1];

    if (lastSegment) {
      // Ganti hyphen dengan spasi dan ubah ke Title Case
      return lastSegment
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Halaman Tidak Dikenal";
  };

  const dynamicTitle = getDynamicTitle();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white mt-6 mb-2 md:mb-6 rounded py-4 shadow">
        <div className="flex items-center text-xl font-bold px-4">
          {getGreeting()} {user ? <>{user.full_name}</> : ""}, Welcome to
          Dashboard - {dynamicTitle}{" "}
        </div>
        <div className="md:block hidden">
          <div className="flex lg:justify-end items-center space-x-4 px-4 lg:px-10">
            <div>
              {user ? (
                <>
                  <span className="">{user.full_name}</span>
                </>
              ) : (
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div> // Skeleton loading
              )}{" "}
            </div>

            <div className="">
              <Image
                src={UserProfile}
                className="rounded-full w-12 shadow border"
                alt="Profile"
              />
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
