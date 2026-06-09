"use client";

import React from "react";
import { usePathname } from "next/navigation";
import PillNav from "./PillNav";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Book", href: "/#book" },
    { label: "Portfolio", href: "/archive" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full pointer-events-auto">
        <PillNav items={navItems} activeHref={pathname || "/"} />
      </div>
    </header>
  );
}

