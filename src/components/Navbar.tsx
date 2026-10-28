"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">P</span>
            <span className="text-xl font-bold tracking-tight">PortfolioHost</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/features" className="text-muted-foreground hover:text-primary">
              Features
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-primary">Log in</Link>
            <Link href="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-medium hover:bg-primary/90 transition-colors text-sm">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
