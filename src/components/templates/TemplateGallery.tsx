"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Maximize2, MousePointerClick, Search } from "lucide-react";
import TemplateCover from "@/components/portfolio/TemplateCover";
import { alpha, FAMILY_LABEL, type TemplateDefinition, type TemplateFamily } from "@/lib/templates/types";
import { cn } from "@/components/ui/utils";

// TemplateCover is built for a 3:2 card. Scaling it must preserve that ratio,
// because the cover lays its own content out at these exact dimensions.
const COVER_WIDTH = 480;
const COVER_HEIGHT = 320;
// Half the card plus a comfortable gutter: a laptop shows it at 1.5x, and the
// pane never has to grow taller than the preview it contains.
const PREVIEW_SCALE = 1.5;

const FAMILIES: Array<{ id: TemplateFamily | "all"; label: string }> = [
  { id: "all", label: "All" },
  ...(Object.keys(FAMILY_LABEL) as TemplateFamily[]).map((id) => ({ id, label: FAMILY_LABEL[id] })),
];

export default function TemplateGallery({
  templates,
  demoName,
  demoRole,
  demoProjects,
  currentTemplateId,
}: {
  templates: TemplateDefinition[];
  demoName: string;
  demoRole: string;
  demoProjects: string[];
  currentTemplateId?: string | null;
}) {
  const [family, setFamily] = useState<TemplateFamily | "all">("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(templates[0]?.id ?? "");
  const [motionOn, setMotionOn] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return templates.filter(
      (template) =>
        (family === "all" || template.family === family) &&
        (!search || `${template.name} ${template.world}`.toLowerCase().includes(search))
    );
  }, [templates, family, query]);

  const active = templates.find((template) => template.id === activeId) ?? templates[0];
  const counts = useMemo(() => {
    const byFamily = { all: templates.length } as Record<TemplateFamily | "all", number>;
    (Object.keys(FAMILY_LABEL) as TemplateFamily[]).forEach((key) => {
      byFamily[key] = templates.filter((template) => template.family === key).length;
    });
    return byFamily;
  }, [templates]);

  function move(direction: 1 | -1) {
    if (visible.length === 0) return;
    const index = visible.findIndex((template) => template.id === activeId);
    const next = visible[(index + direction + visible.length) % visible.length];
    setActiveId(next.id);
  }

  return (
    <div className="mx-auto w-full max-w-[1392px] px-5 py-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <h1 className="serif-display text-[34px] leading-none sm:text-[38px]">Templates</h1>
          <span className="pb-1 font-mono text-[11px] text-[#7b877c]">{templates.length} templates</span>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="flex h-10 w-full items-center gap-2.5 rounded-full border border-[#dedfd5] bg-[#fffefa] px-4 sm:w-[300px]">
            <Search size={13} className="text-[#879186]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or world"
              aria-label="Search templates"
              className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-[#a3aca1]"
            />
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#dedfd5] px-4 text-[12px] font-semibold whitespace-nowrap text-[#35544a] transition-colors hover:bg-[#eef2e9]"
          >
            Back to studio
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:h-[calc(100vh-214px)] lg:min-h-[560px] lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="flex max-h-[720px] min-h-0 flex-col overflow-hidden rounded-[16px] border border-[#dedfd5] bg-[#fffefa] lg:max-h-none">
          {/* A wrapping row of pills, not a grid: five families in three columns
              truncate every label to "Anime ↕" and lose the counts. */}
          <div className="flex flex-wrap gap-1 border-b border-[#eceae1] p-1.5">
            {FAMILIES.map((item) => {
              const isActive = family === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFamily(item.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold whitespace-nowrap transition-colors",
                    isActive ? "bg-[#164e42] text-[#f7f6ef]" : "text-[#68756c] hover:bg-[#f2f4ed]"
                  )}
                >
                  {item.label}
                  <span className={cn("font-mono text-[9px]", isActive ? "text-[#cfe98a]" : "text-[#a3aca1]")}>
                    {counts[item.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1.5"
            tabIndex={0}
            role="listbox"
            aria-label="Templates"
            aria-activedescendant={active ? `template-row-${active.id}` : undefined}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                move(1);
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                move(-1);
              }
            }}
          >
            {visible.map((template) => {
              const isActive = template.id === activeId;
              const isCurrent = template.id === currentTemplateId;
              return (
                <button
                  key={template.id}
                  id={`template-row-${template.id}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActiveId(template.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-left transition-colors",
                    isActive ? "bg-[#164e42] text-[#f7f6ef]" : "hover:bg-[#f2f4ed]"
                  )}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-[6px] ring-1 ring-black/10"
                    style={{
                      background: `linear-gradient(135deg, ${template.theme.accent} 0 44%, ${template.theme.dark} 44% 72%, ${template.theme.bg} 72%)`,
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-[12px] font-semibold leading-[1.3]">{template.name}</span>
                      {isCurrent && <Check size={11} className={isActive ? "text-[#d7ff70]" : "text-[#76a568]"} />}
                    </span>
                    <span
                      className={cn(
                        "block truncate text-[9px] uppercase tracking-[0.13em]",
                        isActive ? "text-[#cfe98a]" : "text-[#98a298]"
                      )}
                    >
                      {template.world}
                    </span>
                  </span>
                </button>
              );
            })}
            {visible.length === 0 && (
              <p className="px-2 py-6 text-center text-[12px] text-[#879186]">No template matches that name.</p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#eceae1] px-3 py-2.5">
            <span className="font-mono text-[10px] text-[#93a094]">{visible.length} shown</span>
            <span className="font-mono text-[10px] text-[#93a094]">A–Z</span>
          </div>
        </aside>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-[16px] border border-[#dedfd5] bg-[#fffefa]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceae1] px-5 py-3.5">
            <div className="flex items-baseline gap-3">
              <span className="serif-display text-[21px] leading-none">{active?.name}</span>
              <span className="rounded-full bg-[#e9eee5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6c54]">
                {active?.world}
              </span>
              <span className="hidden text-[11px] text-[#879186] sm:inline">{active?.tagline}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMotionOn((value) => !value)}
                aria-pressed={motionOn}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-full border px-3 text-[11px] font-semibold transition-colors",
                  motionOn ? "border-[#c6d8c0] bg-[#eef2e9] text-[#35544a]" : "border-[#dedfd5] text-[#8b9488]"
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", motionOn ? "bg-[#76a568]" : "bg-[#c9d1c7]")} />
                Motion
              </button>
              {active && (
                <Link
                  href={`/templates/${active.id}`}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#eef2e9] px-3 text-[11px] font-semibold text-[#35544a] transition-colors hover:bg-[#e2ebdb]"
                >
                  <Maximize2 size={11} /> <span className="hidden sm:inline">Open</span> preview
                </Link>
              )}
            </div>
          </div>

          {/* Scaled 1.5x the cover is 720x480; the pane must be at least that
              tall or the frame is clipped at the bottom. */}
          <div className="relative hidden min-h-[540px] flex-1 overflow-hidden bg-[#e7eae2] p-3 md:block">
            {active && (
              <div
                className="relative flex h-full items-center justify-center overflow-hidden rounded-[10px] p-3 ring-1 ring-[#19352e]/10 sm:p-6"
                style={{ backgroundColor: active.theme.bg }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage: `radial-gradient(${alpha(active.theme.ink, 0.14)} 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <div
                  className={cn(
                    "relative origin-center overflow-hidden rounded-[10px] shadow-[0_28px_70px_rgba(9,32,26,0.26)]",
                    motionOn && "transition-transform duration-500 hover:scale-[1.015]"
                  )}
                  style={{ width: COVER_WIDTH, height: COVER_HEIGHT, transform: `scale(${PREVIEW_SCALE})` }}
                >
                  <TemplateCover template={active} name={demoName} role={demoRole} projects={demoProjects} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eceae1] px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 min-w-0 items-center gap-2 rounded-[10px] border border-[#dedfd5] bg-[#fffefa] px-3">
                <span className="truncate text-[12px] font-semibold">{demoName} — Portfolio</span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-[#879186]">
                <MousePointerClick size={12} /> {templates.length} worlds
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden font-mono text-[11px] text-[#879186] sm:inline">{active?.id}</span>
              {active && (
                <Link
                  href={`/portfolio/edit?template=${active.id}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#164e42] px-5 text-[13px] font-semibold whitespace-nowrap text-[#f7f6ef] transition-colors hover:bg-[#236657] sm:px-6"
                >
                  {active.id === currentTemplateId ? "Current template" : "Use template"}
                  {active.id === currentTemplateId ? <Check size={14} /> : <ArrowUpRight size={14} />}
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
