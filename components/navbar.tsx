"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import Logo from "@/components/logo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change — adjusted during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-shadow duration-300 bg-[#ededef]/80 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-12 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.8rem] transition-colors duration-200 ${
                    active ? "font-medium text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary px-5 py-2 text-[0.8rem]">
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
        >
          {open ? <X size={22} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-12 h-[calc(100dvh-3rem)] overflow-y-auto border-t border-line bg-[#ededef] lg:hidden"
        >
          <ul className="mx-auto max-w-[1200px] px-6 py-6">
            {site.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-line/60 last:border-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between text-2xl font-medium tracking-tight text-foreground"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-xl text-muted">›</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-6">
              <Link href="/contact" className="btn-primary min-h-12 w-full justify-center text-base">
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
