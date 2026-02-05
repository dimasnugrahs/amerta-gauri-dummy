import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Amerta Gauri",
  description: "Restu Dewata App for Internal Employee",
  icons: {
    icon: "/images/logo-amerta-gauri.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
