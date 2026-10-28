"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [supabase] = useState(createClient);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setAuthError("");
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleSignOut() {
    setAuthError("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Could not sign out:", error);
      setAuthError("Could not sign out. Please try again.");
    }
  }

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
          {isAuthenticated === null ? (
            <div aria-hidden="true" className="h-10 w-32 animate-pulse rounded-full bg-[#e9eee5]" />
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" className="primary-action flex items-center gap-2 px-5 py-3 text-[13px] font-semibold">
                My studio <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-2 py-2 text-[13px] font-semibold text-[#68756c] transition-colors hover:text-[#19352e]"
              >
                <LogOut size={14} /> <span className="hidden sm:inline">Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-[13px] font-semibold transition-colors hover:text-[#558c73] sm:block">Log in</Link>
              <Link href="/signup" className="primary-action flex items-center gap-2 px-5 py-3 text-[13px] font-semibold">
                Build yours <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </>
          )}
        </div>
        {authError && (
          <p role="alert" className="absolute right-5 top-full mt-2 rounded-lg bg-[#fff2ef] px-3 py-2 text-xs text-[#a7372b] shadow sm:right-8">
            {authError}
          </p>
        )}
      </div>
    </nav>
  );
}
