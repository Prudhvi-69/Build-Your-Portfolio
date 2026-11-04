import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PortfolioRenderer from "@/components/portfolio/PortfolioRenderer";
import { SAMPLE_CONTENT } from "@/lib/portfolio/content";
import { getTemplate, TEMPLATE_IDS } from "@/lib/templates/registry";

export function generateStaticParams() {
  return TEMPLATE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  return {
    title: `${template.name} — ${template.world} portfolio template`,
    description: template.tagline,
  };
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!TEMPLATE_IDS.includes(id)) notFound();
  const template = getTemplate(id);

  return (
    <div>
      <div className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f5ee]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#35544a] hover:underline"
            >
              <ArrowLeft size={13} /> All templates
            </Link>
            <span className="h-4 w-px bg-[#dedfd5]" />
            <span className="text-[12px] font-semibold">{template.name}</span>
            <span className="rounded-full bg-[#e9eee5] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6c54]">
              {template.world}
            </span>
            <span className="hidden text-[11px] text-[#68756c] sm:inline">{template.tagline}</span>
          </div>
          <Link
            href={`/portfolio/edit?template=${template.id}`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#164e42] px-5 text-[12px] font-semibold text-[#f7f6ef] transition-colors hover:bg-[#236657]"
          >
            Use this template <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <PortfolioRenderer content={SAMPLE_CONTENT} templateId={id} />
    </div>
  );
}
