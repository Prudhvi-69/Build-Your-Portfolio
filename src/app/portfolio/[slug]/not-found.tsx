import Link from "next/link";
import { ArrowUpRight, Layers3, Link2Off, UserRound } from "lucide-react";

/**
 * Shown when a /portfolio/<slug> does not resolve — either the link is
 * mistyped or the portfolio is unpublished. A dead end here is a lost visitor,
 * so this page offers the two things they might actually want.
 */
export default function PortfolioNotFound() {
  return (
    <main className="auth-backdrop grid min-h-screen place-items-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-[560px] text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] bg-[#eaf0e5] text-[#35634d]">
          <Link2Off size={23} strokeWidth={1.6} />
        </span>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#67815c]">
          Portfolio not found
        </p>
        <h1 className="serif-display mt-3 text-[42px] leading-[0.98] sm:text-[54px]">
          This profile isn&apos;t live.
        </h1>
        <p className="mx-auto mt-4 max-w-[410px] text-[14px] leading-6 text-[#68756c]">
          The link may be mistyped, or this portfolio hasn&apos;t been published yet. You can start one of
          your own, or pick a template and see what your page would look like.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Link
            href="/templates"
            className="primary-action inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-semibold"
          >
            <Layers3 size={15} /> Browse the templates
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dedfd5] bg-[#fffefa] px-6 py-3.5 text-[13px] font-semibold text-[#35544a] transition-colors hover:bg-[#eef2e9]"
          >
            Create your studio <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#dedfd5] pt-6 text-[12px] font-semibold text-[#68756c]">
          <Link href="/" className="hover:text-[#19352e]">
            Profolion home
          </Link>
          <Link href="/profile" className="inline-flex items-center gap-1.5 hover:text-[#19352e]">
            <UserRound size={13} /> Your profile
          </Link>
          <Link href="/login" className="hover:text-[#19352e]">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
