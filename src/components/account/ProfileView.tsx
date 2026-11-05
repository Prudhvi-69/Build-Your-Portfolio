"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Eye,
  FilePenLine,
  Globe2,
  Mail,
  Pencil,
  Save,
  UserRound,
} from "lucide-react";
import { saveAccountProfile, setPortfolioVisibility } from "@/lib/account";
import { getTemplate } from "@/lib/templates/registry";
import Input from "@/components/ui/input";

interface PortfolioRow {
  id: string;
  title: string;
  slug: string;
  template: string;
  isPublished: boolean;
  viewCount: number;
  lastViewedAt: string | null;
  updatedAt: string;
}

interface AccountRow {
  email: string | null;
  fullName: string | null;
  createdAt: string | null;
}

function when(value: string | null) {
  if (!value) return "never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "never";
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function ProfileView({
  account,
  portfolios,
}: {
  account: AccountRow;
  portfolios: PortfolioRow[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(account.fullName ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const totalViews = portfolios.reduce((sum, portfolio) => sum + portfolio.viewCount, 0);
  const published = portfolios.filter((portfolio) => portfolio.isPublished).length;

  function save() {
    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await saveAccountProfile({ fullName: name, portfolioId: portfolios[0]?.id });
      if (result.error) {
        setError(result.error);
        return;
      }
      setEditing(false);
      setMessage("Saved. Your name now appears on your portfolio.");
      router.refresh();
    });
  }

  function togglePublish(portfolio: PortfolioRow) {
    startTransition(async () => {
      const result = await setPortfolioVisibility(portfolio.id, !portfolio.isPublished);
      if (result.error) setError(result.error);
      else router.refresh();
    });
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1120px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[#dedfd5] pb-7">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#67815c]">Your account</p>
          <h1 className="serif-display text-[44px] leading-none sm:text-[54px]">Profile.</h1>
          <p className="mt-3 text-[14px] text-muted-foreground">
            The details behind your portfolios, and who has been visiting them.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-[#dedfd5] px-5 py-3 text-[13px] font-semibold text-[#35544a] transition-colors hover:bg-[#eef2e9]"
        >
          Back to studio <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-[#164e42] text-[19px] font-bold text-[#d7ff70]">
                {(account.fullName || account.email || "P").slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#67815c]">Display name</p>
                <p className="truncate text-[19px] font-semibold leading-tight">
                  {account.fullName || "Not set yet"}
                </p>
              </div>
            </div>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#dedfd5] px-3.5 py-2 text-[12px] font-semibold text-[#35544a] hover:bg-[#eef2e9]"
              >
                <Pencil size={13} /> Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="mt-6 space-y-3">
              <Input
                label="Display name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={save}
                  disabled={pending}
                  className="primary-action inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold disabled:opacity-60"
                >
                  <Save size={13} /> {pending ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setName(account.fullName ?? "");
                    setError("");
                  }}
                  className="px-3 py-2 text-[12px] font-semibold text-[#68756c] hover:text-[#19352e]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}

          {message && !editing && (
            <p role="status" className="mt-4 rounded-xl border border-[#cfe0c2] bg-[#f2f7ee] p-3 text-[12px] text-[#35634d]">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[12px] text-[#a7372b]">
              {error}
            </p>
          )}

          <dl className="mt-7 space-y-3 border-t border-[#eceae1] pt-5 text-[12px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-[#68756c]"><Mail size={13} /> Email</dt>
              <dd className="truncate font-mono text-[11px]">{account.email || "—"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-[#68756c]"><CalendarDays size={13} /> Member since</dt>
              <dd className="font-mono text-[11px]">{when(account.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-[#68756c]"><Globe2 size={13} /> Published</dt>
              <dd className="font-mono text-[11px]">
                {published} of {portfolios.length}
              </dd>
            </div>
          </dl>
        </section>

        <section className="surface-card flex flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#67815c]">
              <BarChart3 size={13} /> Portfolio visits
            </p>
            <p className="mt-3 font-mono text-[54px] leading-none">{totalViews.toLocaleString()}</p>
            <p className="mt-2 text-[12px] leading-5 text-[#68756c]">
              One visit is counted per person per browser session, on each published link.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-[11px] text-[#879186]">
            <UserRound size={13} /> Only you can see this number.
          </div>
        </section>
      </div>

      <h2 className="mb-4 mt-10 border-b border-[#dedfd5] pb-3 text-[12px] font-bold uppercase tracking-[0.13em] text-[#68756c]">
        Your portfolios <span className="ml-1 font-mono text-[#879186]">({portfolios.length})</span>
      </h2>

      {portfolios.length === 0 ? (
        <div className="surface-card px-6 py-12 text-center">
          <p className="serif-display text-[26px]">Nothing published yet.</p>
          <p className="mt-2 text-[13px] text-muted-foreground">Create a portfolio and its visits show up here.</p>
          <Link href="/portfolio/edit" className="primary-action mt-5 inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold">
            <FilePenLine size={15} /> Create one
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {portfolios.map((portfolio) => (
            <article key={portfolio.id} className="surface-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold">{portfolio.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#68756c]">
                    <span className="rounded-full bg-[#eef2e9] px-2 py-0.5 font-semibold text-[#35634d]">
                      {getTemplate(portfolio.template).name}
                    </span>
                    <span className="font-mono">/portfolio/{portfolio.slug}</span>
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-[15px]">
                  <Eye size={14} className="text-[#67815c]" /> {portfolio.viewCount.toLocaleString()}
                </span>
              </div>

              <p className="mt-4 text-[11px] text-[#879186]">
                Last visit {when(portfolio.lastViewedAt)} · Updated {when(portfolio.updatedAt)}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#eceae1] pt-4 text-[12px] font-semibold">
                <Link href={`/portfolio/edit?id=${portfolio.id}`} className="text-[#35634d] hover:underline">
                  Edit
                </Link>
                <Link href={`/portfolio/${portfolio.slug}`} className="inline-flex items-center gap-1 text-[#19352e] hover:underline">
                  View <ArrowUpRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => togglePublish(portfolio)}
                  disabled={pending}
                  className="ml-auto rounded-full border border-[#dedfd5] px-3 py-1.5 text-[11px] font-semibold text-[#35544a] hover:bg-[#eef2e9] disabled:opacity-60"
                >
                  {portfolio.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
