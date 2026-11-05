import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProfileView from "@/components/account/ProfileView";
import { getMyAccount, getMyPortfolios } from "@/lib/account";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your profile — Profolion",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [account, { portfolios }] = await Promise.all([getMyAccount(), getMyPortfolios()]);

  return (
    <ProfileView
      account={account}
      portfolios={portfolios.map((portfolio) => ({
        id: portfolio.id,
        title: portfolio.title,
        slug: portfolio.slug,
        template: portfolio.template,
        isPublished: portfolio.is_published,
        viewCount: Number(portfolio.view_count ?? 0),
        lastViewedAt: portfolio.last_viewed_at,
        updatedAt: portfolio.updated_at,
      }))}
    />
  );
}
