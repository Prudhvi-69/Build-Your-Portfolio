"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex h-64 items-center justify-center text-muted-foreground">Loading…</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Portfolios</h1>
          <p className="text-muted-foreground">Manage and edit your portfolios.</p>
        </div>
        <Link href="/portfolio/edit" className="bg-primary text-primary-foreground px-4 py-2 rounded-medium hover:bg-primary/90 transition-colors">
          Create new
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-medium bg-destructive/10 border border-destructive/50 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {portfolios.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No portfolios yet. Create your first one to get started.
          </div>
        )}
        {portfolios.map((p) => (
          <Card key={p.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <Link href={`/portfolio/${p.slug}`} className="text-sm text-primary hover:underline">
                View
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-mono">
              yourname.portfoliohost.dev/{p.slug}
            </div>
            <div className="flex items-center justify-between">
              <Link
                href={`/portfolio/edit?id=${p.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Edit
              </Link>
              <span className="text-xs text-muted-foreground">
                Updated {new Date(p.updated_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
