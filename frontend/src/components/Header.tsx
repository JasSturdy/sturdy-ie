"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Ventures", href: "/ventures" },
  { label: "My Insights", href: "/insight" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, handleClickOutside]);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md border border-lime-400/40 bg-gradient-to-br from-lime-400/10 to-lime-500/0" />
          <span className="text-sm font-medium tracking-wide text-zinc-300">
            Jason<span className="font-semibold text-white">Sturdy</span>
          </span>
        </Link>

        {/* Hamburger + dropdown wrapper */}

        <div className="relative z-10 rounded-md bg-[#c5f018] transition">
          <button
            ref={buttonRef}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-md transition ${
              menuOpen ? "bg-[#c5f018]" : ""
            }`}
          >
            <span className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[2px] w-5 transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-[7px] rotate-45 bg-black"
                    : "bg-black"
                }`}
              />
              <span
                className={`block h-[2px] w-5 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "bg-black"
                }`}
              />
              <span
                className={`block h-[2px] w-5 transition-all duration-300 ${
                  menuOpen
                    ? "-translate-y-[7px] -rotate-45 bg-black"
                    : "bg-black"
                }`}
              />
            </span>
          </button>

          {/* Dropdown panel */}
          <div
            ref={menuRef}
            className={`absolute right-0 top-full mt-2 w-[min(85vw,24rem)] max-w-sm origin-top-right rounded-2xl bg-[#c5f018] shadow-2xl transition-all duration-300 ease-out sm:right-1/2 sm:translate-x-1/2 sm:origin-top ${
              menuOpen
                ? "scale-y-100 opacity-100"
                : "pointer-events-none scale-y-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col px-6 py-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-2 py-4 text-lg font-semibold transition-opacity hover:opacity-70 ${
                      isActive ? "text-black" : "text-black/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
