import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk, Globe2 } from "lucide-react";
import { getPortfolio } from "@/lib/db";

export const dynamic = "force-dynamic";

type Item = {
  title: string;
  description?: string;
  link?: string;
  date?: string;
};

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { portfolio, error } = await getPortfolio(slug);
  if (error || !portfolio) notFound();

  const socialLinks = Object.entries((portfolio.social_links || {}) as Record<string, string>);
  const sections = [
    { title: "Projects", items: (portfolio.projects || []) as Item[], type: "project" },
    { title: "Experience", items: (portfolio.experience || []) as Item[], type: "timeline" },
    { title: "Education", items: (portfolio.education || []) as Item[], type: "timeline" },
  ];

  return (
    <main id="top" className="min-h-screen bg-[#f5f5ee] text-[#19352e]">
      <header className="border-b border-[#dedfd5] px-5 sm:px-8">
        <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-[14px] font-bold tracking-[-0.05em]"><span className="brand-mark">p.</span> profolion.</Link>
          <span className="flex items-center gap-2 text-[11px] font-semibold text-[#68756c]"><span className="h-2 w-2 rounded-full bg-[#78a36a]" /> INDEPENDENT PORTFOLIO</span>
        </div>
      </header>

      <section className="hero-grid overflow-hidden px-5 py-14 text-[#f5f5ee] sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-[1120px] items-end gap-10 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Asterisk className="absolute -left-12 -top-12 hidden text-[#d7ff70]/20 md:block" size={100} strokeWidth={0.8} />
            <p className="eyebrow mb-5">A personal portfolio</p>
            <h1 className="serif-display max-w-[780px] text-[clamp(3.2rem,8vw,7.3rem)] leading-[0.91]">{portfolio.title}<span className="text-[#d7ff70]">.</span></h1>
            {portfolio.bio && <p className="mt-6 max-w-[550px] text-[15px] leading-7 text-white/65">{portfolio.bio}</p>}
            <a href="#work" className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-[#d7ff70]">Explore my work <ArrowDown size={14} /></a>
          </div>
          {portfolio.avatar_url && (
            <div className="relative h-36 w-36 overflow-hidden rounded-[26px] border border-white/20 md:h-48 md:w-48">
              <Image src={portfolio.avatar_url} alt={`${portfolio.title} profile`} fill sizes="(max-width: 768px) 144px, 192px" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[230px_1fr] md:gap-16">
        <aside className="space-y-8">
          {portfolio.skills && portfolio.skills.length > 0 && (
            <section>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#778478]">Things I do</p>
              <div className="flex flex-wrap gap-2">
                {(portfolio.skills as string[]).map((skill) => (
                  <span key={skill} className="rounded-full border border-[#d8dacf] bg-[#fffefa] px-3 py-1.5 text-[11px] font-medium">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {socialLinks.length > 0 && (
            <section>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#778478]">Find me elsewhere</p>
              <div className="space-y-2.5">
                {socialLinks.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 text-[12px] font-medium capitalize text-[#35634d] hover:underline">
                    {key}<ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </section>
          )}
          <div className="flex items-center gap-2 border-t border-[#dedfd5] pt-5 text-[11px] text-[#778478]"><Globe2 size={14} /> Open to new possibilities</div>
        </aside>

        <div id="work" className="space-y-14">
          {sections.map(({ title, items, type }) => items.length > 0 && (
            <section key={title}>
              <div className="mb-5 flex items-center justify-between border-b border-[#dedfd5] pb-3">
                <h2 className="serif-display text-[32px]">{title}</h2>
                <span className="font-mono text-[11px] text-[#778478]">{String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <article key={`${item.title}-${index}`} className={`surface-card p-5 sm:p-6 ${type === "project" ? "transition-transform hover:-translate-y-0.5" : ""}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7a9270]">{String(index + 1).padStart(2, "0")} / {title}</p>
                        <h3 className="serif-display text-[24px] leading-tight">{item.title}</h3>
                      </div>
                      {item.date && <span className="rounded-full bg-[#eaf0e5] px-3 py-1.5 text-[10px] font-medium text-[#526c58]">{item.date}</span>}
                    </div>
                    {item.description && <p className="mt-3 max-w-[640px] text-[13px] leading-6 text-[#68756c]">{item.description}</p>}
                    {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#35634d] hover:underline">Take a closer look <ArrowUpRight size={13} /></a>}
                  </article>
                ))}
              </div>
            </section>
          ))}
          {!portfolio.skills?.length && sections.every((section) => section.items.length === 0) && (
            <div className="surface-card p-8 text-center">
              <h2 className="serif-display text-[28px]">A story still unfolding.</h2>
              <p className="mt-2 text-[13px] text-[#68756c]">More work and details are on the way.</p>
            </div>
          )}
        </div>
      </div>
      <footer className="border-t border-[#dedfd5] px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between text-[11px] text-[#778478]">
          <span>Made with <Link href="/" className="font-semibold text-[#35634d]">profolion.</Link></span>
          <a href="#top" className="hover:text-[#19352e]">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
