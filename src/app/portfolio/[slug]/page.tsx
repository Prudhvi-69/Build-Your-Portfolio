import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioRenderer from "@/components/portfolio/PortfolioRenderer";
import ViewTracker from "@/components/portfolio/ViewTracker";
import { getPortfolio } from "@/lib/db";
import { toContent } from "@/lib/portfolio/content";
import { getTemplate } from "@/lib/templates/registry";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { portfolio } = await getPortfolio(slug);
  if (!portfolio) return { title: "Portfolio not found — Profolion" };
  return {
    title: `${portfolio.title} — Portfolio`,
    description: portfolio.bio || "A personal portfolio on Profolion.",
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { portfolio, error } = await getPortfolio(slug);
  if (error || !portfolio) notFound();

  const template = getTemplate(portfolio.template);

  return (
    <main className="min-h-screen">
      <ViewTracker slug={portfolio.slug} />
      <PortfolioRenderer content={toContent(portfolio)} templateId={template.id} />
    </main>
  );
}
