import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates/registry";

/**
 * A palette-true wall of covers, built from the same registry the showroom
 * uses, so the landing page can never advertise a template that does not exist.
 * Server-rendered on purpose: no client JS for a decorative strip.
 */
export default function TemplateStrip({ ids, title }: { ids: string[]; title: string }) {
  const picks = ids
    .map((id) => TEMPLATES.find((template) => template.id === id))
    .filter((template): template is (typeof TEMPLATES)[number] => Boolean(template));

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#68756c]">{title}</p>
        <Link href="/templates" className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#35634d] hover:underline">
          All {TEMPLATES.length} <ArrowUpRight size={13} />
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {picks.map((template) => (
          <li key={template.id}>
            <Link
              href={`/templates/${template.id}`}
              className="group block overflow-hidden rounded-[14px] border border-[#dedfd5] bg-[#fffefa] transition-transform hover:-translate-y-0.5"
            >
              <span
                className="flex h-[86px] flex-col justify-between p-3"
                style={{ backgroundColor: template.theme.dark, color: template.theme.darkInk }}
              >
                <span
                  className="block h-[3px] w-8 rounded-full"
                  style={{ backgroundColor: template.theme.accent }}
                />
                <span
                  className="block truncate text-[13px] leading-tight"
                  style={{ fontFamily: template.fonts.display }}
                >
                  {template.name}
                </span>
              </span>
              <span className="block truncate px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#68756c]">
                {template.world}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
