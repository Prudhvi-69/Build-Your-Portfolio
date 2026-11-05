"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Clock,
  Eye,
  LayoutGrid,
  LogOut,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { AdminOverview } from "@/lib/admin";
import { getTemplate } from "@/lib/templates/registry";

function when(value: string | null) {
  if (!value) return "never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "never";
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminConsole({ overview }: { overview: AdminOverview }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const users = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return overview.users;
    return overview.users.filter((user) =>
      [user.email, user.fullName, ...user.portfolios.map((p) => p.title)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle))
    );
  }, [overview.users, query]);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  const stats = [
    { label: "Accounts", value: overview.totals.users, icon: Users },
    { label: "Portfolios", value: overview.totals.portfolios, icon: LayoutGrid },
    { label: "Total visits", value: overview.totals.views, icon: Eye },
  ];

  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1240px] px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[#dedfd5] pb-7">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#67815c]">
            <ShieldCheck size={13} /> Admin console
          </p>
          <h1 className="serif-display text-[38px] leading-none sm:text-[54px]">Every account.</h1>
          <p className="mt-3 text-[14px] text-muted-foreground">
            Who signed up, what they published, and how many people have visited it.
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="inline-flex items-center gap-2 rounded-full border border-[#dedfd5] px-5 py-3 text-[13px] font-semibold text-[#35544a] transition-colors hover:bg-[#eef2e9] disabled:opacity-60"
        >
          <LogOut size={14} /> {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </header>

      {overview.error && (
        <div role="alert" className="mb-6 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-4 text-[13px] text-[#a7372b]">
          <p className="font-semibold">Could not load every account.</p>
          <p className="mt-1">
            The database said: <span className="font-mono text-[12px]">{overview.error}</span>
          </p>
          <p className="mt-2">
            Set <span className="font-mono text-[12px]">SUPABASE_SERVICE_ROLE_KEY</span> on the server so the
            console can read past row-level security, and make sure the admin migration has been run.
          </p>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface-card flex items-center justify-between p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#67815c]">{label}</p>
              <p className="mt-1 font-mono text-[32px] leading-none">{value.toLocaleString()}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf0e5] text-[#35634d]">
              <Icon size={17} />
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.13em] text-[#68756c]">
          Users <span className="ml-1 font-mono text-[#879186]">({users.length})</span>
        </h2>
        <label className="flex w-full items-center gap-2 rounded-full border border-[#dedfd5] bg-[#fffefa] px-4 py-2 sm:w-auto">
          <Search size={14} className="shrink-0 text-[#879186]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search email, name or portfolio"
            aria-label="Search users"
            className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#9aa49a] sm:w-[230px]"
          />
        </label>
      </div>

      {users.length === 0 ? (
        <div className="surface-card px-6 py-14 text-center">
          <p className="serif-display text-[26px]">{query ? "No account matches that." : "No accounts yet."}</p>
          <p className="mt-2 text-[13px] text-muted-foreground">
            {query ? "Try a different email, name or portfolio." : "New sign-ups appear here as soon as they join."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[18px] border border-[#dedfd5] bg-[#fffefa]">
          <div className="hidden grid-cols-[1.5fr_1fr_90px_130px_110px] gap-4 border-b border-[#dedfd5] bg-[#faf9f4] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#68756c] md:grid">
            <span>Account</span>
            <span>Portfolio</span>
            <span>Profolios</span>
            <span>Visits</span>
            <span className="text-right">Joined</span>
          </div>
          {users.map((user) => {
            const isOpen = expanded === user.id;
            const first = user.portfolios[0];
            return (
              <div key={user.id} className="border-b border-[#eceae1] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : user.id)}
                  aria-expanded={isOpen}
                  className="grid w-full gap-2 px-5 py-4 text-left transition-colors hover:bg-[#faf9f4] md:grid-cols-[1.5fr_1fr_90px_130px_110px] md:items-center md:gap-4"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold">
                      {user.fullName || "Unnamed account"}
                    </span>
                    <span className="block truncate font-mono text-[11px] text-[#68756c]">
                      {user.email || "no email on file"}
                    </span>
                  </span>
                  <span className="flex min-w-0 items-center justify-between gap-2 md:block md:justify-start">
                    <span className="min-w-0 truncate text-[12px] text-[#35544a]">
                      {first ? first.title : <span className="text-[#9aa49a]">No portfolio yet</span>}
                    </span>
                    {/* On a phone these three read as a summary line under the row. */}
                    <span className="flex shrink-0 items-center gap-3 md:hidden">
                      <span className="font-mono text-[11px] text-[#68756c]">{user.portfolioCount}</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <BarChart3 size={12} className="text-[#67815c]" />
                        {user.totalViews.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#879186]">{when(user.joinedAt)}</span>
                    </span>
                  </span>
                  <span className="hidden font-mono text-[12px] text-[#68756c] md:block">{user.portfolioCount}</span>
                  <span className="hidden items-center gap-2 font-mono text-[12px] md:flex">
                    <BarChart3 size={13} className="text-[#67815c]" />
                    {user.totalViews.toLocaleString()}
                  </span>
                  <span className="hidden text-[11px] text-[#879186] md:block md:text-right">{when(user.joinedAt)}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#eceae1] bg-[#faf9f4] px-5 py-4">
                    {user.portfolios.length === 0 ? (
                      <p className="text-[12px] text-[#68756c]">
                        This account has not created a portfolio yet.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {user.portfolios.map((portfolio) => (
                          <li
                            key={portfolio.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eceae1] bg-[#fffefa] px-4 py-3"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-semibold">{portfolio.title}</p>
                              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-[#68756c]">
                                <span className="rounded-full bg-[#eef2e9] px-2 py-0.5 font-semibold text-[#35634d]">
                                  {getTemplate(portfolio.template).name}
                                </span>
                                <span className="font-mono">/portfolio/{portfolio.slug}</span>
                                <span
                                  className={
                                    portfolio.isPublished
                                      ? "text-[#35634d]"
                                      : "text-[#a7372b]"
                                  }
                                >
                                  {portfolio.isPublished ? "Published" : "Draft"}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1.5 font-mono text-[12px]">
                                <Eye size={13} className="text-[#67815c]" />
                                {portfolio.viewCount.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1.5 text-[11px] text-[#879186]">
                                <Clock size={12} /> {when(portfolio.lastViewedAt)}
                              </span>
                              <Link
                                href={`/portfolio/${portfolio.slug}`}
                                className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#19352e] hover:underline"
                              >
                                Open <ArrowUpRight size={13} />
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
