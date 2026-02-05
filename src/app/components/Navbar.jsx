"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ href, name, icon: Icon, pathname }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center justify-center px-6 py-4 text-center
        transition-colors duration-200
        ${isActive ? "text-amerta-600" : "text-gray-700 hover:text-amerta-400"}
      `}
    >
      <span className="md:block">{name}</span>
    </Link>
  );
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sign In", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex justify-center">
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} pathname={pathname} />
        ))}
      </nav>
    </>
  );
}
