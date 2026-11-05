"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LogOut, Menu, UserRound, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/** The links that used to be desktop-only. */
const SECTIONS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Why Profolion" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [supabase] = useState(createClient);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setAuthError("");
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Every item in the panel closes the menu in its own onClick, so a
  // navigation can never leave the sheet open behind the next page.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  async function handleSignOut() {
    setAuthError("");
    setMenuOpen(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Could not sign out:", error);
      setAuthError("Could not sign out. Please try again.");
    }
  }

  // A published portfolio and a full template preview are the owner's page, so
  // the product's own navigation stays out of them.
  const onTemplateSurface =
    /^\/portfolio\/(?!edit).+/.test(pathname ?? "") || /^\/templates\/.+/.test(pathname ?? "");

  if (onTemplateSurface) return null;

  return (
    <nav className="site-nav sticky top-0 z-40">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="brand-mark">p.</span>
          <span className="text-[20px] font-bold tracking-[-0.06em]">profolion<span className="text-[#749454]">.</span></span>
        </Link>

        <div className="hidden items-center gap-9 text-[13px] font-medium text-[#68756c] lg:flex">
          {SECTIONS.map(({ href, label }) => (
            <Link key={href} href={href} className="transition-colors hover:text-[#19352e]">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated === null ? (
            <div aria-hidden="true" className="h-10 w-32 animate-pulse rounded-full bg-[#e9eee5]" />
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="hidden items-center gap-1.5 px-2 py-2 text-[13px] font-semibold text-[#68756c] transition-colors hover:text-[#19352e] sm:flex"
              >
                <UserRound size={14} /> Profile
              </Link>
              <Link href="/dashboard" className="primary-action flex items-center gap-2 px-4 py-3 text-[13px] font-semibold sm:px-5">
                My studio <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden items-center gap-1.5 px-2 py-2 text-[13px] font-semibold text-[#68756c] transition-colors hover:text-[#19352e] md:flex"
              >
                <LogOut size={14} /> <span className="hidden sm:inline">Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-[13px] font-semibold transition-colors hover:text-[#558c73] sm:block">Log in</Link>
              <Link href="/signup" className="primary-action hidden items-center gap-2 px-4 py-3 text-[13px] font-semibold sm:flex sm:px-5">
                Build yours <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#dedfd5] text-[#19352e] transition-colors hover:bg-[#eef2e9] lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {authError && (
          <p role="alert" className="absolute right-5 top-full mt-2 rounded-lg bg-[#fff2ef] px-3 py-2 text-xs text-[#a7372b] shadow sm:right-8">
            {authError}
          </p>
        )}
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="site-nav-panel lg:hidden">
          <div className="mx-auto max-w-[1320px] px-5 py-5 sm:px-8">
            <nav className="flex flex-col" aria-label="Site sections">
              {SECTIONS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#dedfd5] py-3.5 text-[16px] font-medium text-[#19352e]"
                >
                  {label}
                  <ArrowUpRight size={16} className="text-[#879186]" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-full border border-[#dedfd5] px-5 py-3.5 text-[14px] font-semibold text-[#35544a]"
                  >
                    <UserRound size={15} /> Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-full border border-[#dedfd5] px-5 py-3.5 text-left text-[14px] font-semibold text-[#35544a]"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-full border border-[#dedfd5] px-5 py-3.5 text-[14px] font-semibold text-[#35544a]"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="primary-action flex items-center justify-center gap-2 px-5 py-3.5 text-[14px] font-semibold"
                  >
                    Build yours <ArrowUpRight size={15} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
