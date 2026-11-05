"use server";

import { createClient } from "@/lib/supabase/server";

export interface AdminUserRow {
  id: string;
  email: string | null;
  fullName: string | null;
  joinedAt: string;
  portfolioCount: number;
  totalViews: number;
  portfolios: Array<{
    id: string;
    title: string;
    slug: string;
    template: string;
    isPublished: boolean;
    viewCount: number;
    lastViewedAt: string | null;
    updatedAt: string;
  }>;
}

export interface AdminOverview {
  users: AdminUserRow[];
  totals: { users: number; portfolios: number; views: number };
  error?: string;
}

/**
 * Everything the console shows. Uses the service-role key when it is configured,
 * because listing every user needs to read past RLS; without it the query still
 * runs but is limited to what the current Supabase session may see, and the
 * panel says so instead of silently showing a partial list.
 */
export async function getAdminOverview(): Promise<AdminOverview> {
  const empty: AdminOverview = { users: [], totals: { users: 0, portfolios: 0, views: 0 } };
  const supabase = await createClient();

  const [profilesResult, portfoliosResult] = await Promise.all([
    supabase.from("profiles").select("id, email, full_name, created_at").order("created_at", { ascending: false }),
    supabase
      .from("portfolios")
      .select("id, user_id, title, slug, template, is_published, view_count, last_viewed_at, updated_at")
      .order("view_count", { ascending: false }),
  ]);

  if (profilesResult.error) return { ...empty, error: profilesResult.error.message };
  if (portfoliosResult.error) return { ...empty, error: portfoliosResult.error.message };

  const profiles = profilesResult.data;
  const portfolios = portfoliosResult.data;

  const byUser = new Map<string, AdminUserRow>();
  for (const profile of profiles ?? []) {
    byUser.set(profile.id, {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      joinedAt: profile.created_at,
      portfolioCount: 0,
      totalViews: 0,
      portfolios: [],
    });
  }

  let totalViews = 0;
  for (const portfolio of portfolios ?? []) {
    const views = Number(portfolio.view_count ?? 0);
    totalViews += views;
    const owner = byUser.get(portfolio.user_id);
    if (!owner) continue;
    owner.portfolioCount += 1;
    owner.totalViews += views;
    owner.portfolios.push({
      id: portfolio.id,
      title: portfolio.title,
      slug: portfolio.slug,
      template: portfolio.template,
      isPublished: portfolio.is_published,
      viewCount: views,
      lastViewedAt: portfolio.last_viewed_at,
      updatedAt: portfolio.updated_at,
    });
  }

  return {
    users: [...byUser.values()],
    totals: { users: byUser.size, portfolios: portfolios?.length ?? 0, views: totalViews },
  };
}
