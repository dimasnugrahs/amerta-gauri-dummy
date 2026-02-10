"use client";

import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";

export default function LogoutButton({ isMobile }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/signout");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );

  if (isMobile) {
    return (
      <button
        onClick={handleLogout}
        className="flex flex-col items-center justify-center w-full text-gray-500"
      >
        {icon}
        <span className="text-[10px] mt-1 font-medium">Keluar</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto"
    >
      {icon}
      <span className="font-medium">Logout</span>
    </button>
  );
}
