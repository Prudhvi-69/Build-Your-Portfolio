"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Eye, FilePlus2, Globe2, MoveUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Card from "@/components/ui/card";
import { useRouter } from "next/navigation";

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  updated_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (mounted) router.push("/login");
        return;
      }
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      if (mounted) {
        setPortfolios((data as PortfolioItem[]) || []);
        setError(error?.message || "");
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [supabase, router]);

  if (loading) return (
    <main className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8">
      <div className="surface-card flex h-64 items-center justify-center text-sm text-muted-foreground">Getting your studio ready…</div>
    </main>
  );

  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1120px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#67815c]">Your little corner of the internet</p>
          <h1 className="serif-display text-[44px] leading-none sm:text-[55px]">Your studio.</h1>
          <p className="mt-3 text-[14px] text-muted-foreground">The work you&apos;ve made, ready for what comes next.</p>
        </div>
        <Link href="/portfolio/edit" className="primary-action inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-semibold">
          <FilePlus2 size={16} /> New portfolio
        </Link>
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-[#dedfd5] pb-3">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.13em] text-[#68756c]">Your portfolios <span className="ml-1 font-mono text-[#879186]">({portfolios.length})</span></h2>
        <span className="text-[11px] text-[#879186]">Your work, your way</span>
      </div>

      {error && (
        <div role="alert" className="mb-5 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[13px] text-[#a7372b]">{error}</div>
      )}

      {portfolios.length === 0 ? (
        <div className="surface-card grid min-h-[330px] place-items-center px-6 py-10 text-center">
          <div className="max-w-[360px]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] bg-[#eaf0e5] text-[#35634d]"><Globe2 size={24} strokeWidth={1.6} /></span>
            <h2 className="serif-display mt-5 text-[30px]">A blank page is full of possibility.</h2>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">Make a home for the projects, skills, and ideas you can&apos;t wait to share.</p>
            <Link href="/portfolio/edit" className="primary-action mt-6 inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold">Create your first portfolio <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {portfolios.map((portfolio, index) => (
            <Card key={portfolio.id} className="surface-card overflow-hidden p-0">
              <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#67815c]">Portfolio {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="serif-display mt-2 text-[29px] leading-tight">{portfolio.title}</h3>
                  <p className="mt-2 text-[12px] text-muted-foreground">Updated {new Date(portfolio.updated_at).toLocaleDateString()}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eaf0e5] text-[#35634d]"><Globe2 size={18} /></span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dedfd5] bg-[#faf9f4] px-6 py-4 sm:px-7">
                <span className="min-w-0 truncate font-mono text-[11px] text-[#68756c]">/portfolio/{portfolio.slug}</span>
                <div className="flex items-center gap-4 text-[12px] font-semibold">
                  <Link href={`/portfolio/edit?id=${portfolio.id}`} className="text-[#35634d] hover:underline">Edit</Link>
                  <Link href={`/portfolio/${portfolio.slug}`} className="inline-flex items-center gap-1 text-[#19352e] hover:underline"><Eye size={14} /> View <MoveUpRight size={12} /></Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
