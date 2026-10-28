"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="site-nav sticky top-0 z-40">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="brand-mark">p.</span>
            <span className="text-[20px] font-bold tracking-[-0.06em]">profolion<span className="text-[#749454]">.</span></span>
          </Link>

          <div className="hidden items-center gap-9 text-[13px] font-medium text-[#68756c] md:flex">
            <Link href="/#how-it-works" className="transition-colors hover:text-[#19352e]">
              How it works
            </Link>
            <Link href="/features" className="transition-colors hover:text-[#19352e]">
              Why Profolion
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden px-3 py-2 text-[13px] font-semibold transition-colors hover:text-[#558c73] sm:block">Log in</Link>
            <Link href="/signup" className="primary-action flex items-center gap-2 px-5 py-3 text-[13px] font-semibold">
              Build yours <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>
      </div>
    </nav>
  );
}
