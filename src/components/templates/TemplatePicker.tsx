"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Search, X } from "lucide-react";
import TemplateCover from "@/components/portfolio/TemplateCover";
import { cn } from "@/components/ui/utils";
import { FAMILY_LABEL, type TemplateDefinition, type TemplateFamily } from "@/lib/templates/types";

const FAMILIES: Array<TemplateFamily | "all"> = [
  "all",
  ...(Object.keys(FAMILY_LABEL) as TemplateFamily[]),
];

/**
 * Inline template region plus a full-screen picker. Choosing a template here
 * only stages it on the draft — publishing still goes through Save and publish.
 */
export default function TemplatePicker({
  templates,
  value,
  name,
  role,
  projects,
  onChange,
}: {
  templates: TemplateDefinition[];
  value: string;
  name: string;
  role: string;
  projects?: string[];
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [family, setFamily] = useState<TemplateFamily | "all">("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = templates.find((template) => template.id === value) ?? templates[0];

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return templates.filter(
      (template) =>
        (family === "all" || template.family === family) &&
        (!search || `${template.name} ${template.world}`.toLowerCase().includes(search))
    );
  }, [templates, family, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 sm:flex-nowrap sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className="h-12 w-14 shrink-0 rounded-[8px] ring-1 ring-black/10"
            aria-hidden
            style={{
              background: `linear-gradient(135deg, ${selected.theme.accent} 0 44%, ${selected.theme.dark} 44% 72%, ${selected.theme.bg} 72%)`,
            }}
          />
          <div className="min-w-0">
            <p className="field-label mb-1">Template</p>
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              {selected.name}
              <span className="rounded-full bg-[#e9eee5] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6c54]">
                {selected.world}
              </span>
            </p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">{selected.tagline}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-[#dedfd5] px-4 py-2.5 text-[12px] font-semibold text-[#35544a] transition-colors hover:bg-[#eef2e9]"
        >
          Change template
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#0d221c]/45 p-3 backdrop-blur-sm sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose a template"
            className="flex max-h-full w-full max-w-[1120px] flex-col overflow-hidden rounded-[20px] border border-[#dedfd5] bg-[#f7f7f0] shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dedfd5] bg-[#fffefa] px-5 py-4">
              <div>
                <h2 className="serif-display text-[24px] leading-none">Choose a template</h2>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {templates.length} worlds. Your content stays exactly as it is.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-[220px] items-center gap-2 rounded-full border border-[#dedfd5] bg-[#fffefa] px-3.5">
                  <Search size={13} className="text-[#879186]" />
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name or world"
                    aria-label="Search templates"
                    className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#a3aca1]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close template picker"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#dedfd5] text-[#35544a] transition-colors hover:bg-[#eef2e9]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 border-b border-[#dedfd5] px-5 py-2.5">
              {FAMILIES.map((item) => {
                const isActive = family === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFamily(item)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-colors",
                      isActive ? "bg-[#164e42] text-[#f7f6ef]" : "text-[#68756c] hover:bg-[#eef2e9]"
                    )}
                  >
                    {item === "all" ? "All" : FAMILY_LABEL[item]}
                  </button>
                );
              })}
              <span className="ml-auto font-mono text-[10px] text-[#93a094]">{visible.length} shown</span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {visible.map((template) => {
                  const isSelected = template.id === value;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => {
                        onChange(template.id);
                        setOpen(false);
                      }}
                      aria-pressed={isSelected}
                      className={cn(
                        "group overflow-hidden rounded-[14px] border bg-[#fffefa] text-left transition-colors",
                        isSelected
                          ? "border-[#164e42] ring-2 ring-[#164e42]/20"
                          : "border-[#dedfd5] hover:border-[#b9c7ae]"
                      )}
                    >
                      <div className="h-[142px] w-full overflow-hidden border-b border-[#eceae1]">
                        <TemplateCover template={template} name={name} role={role} projects={projects} />
                      </div>
                      <div className="flex items-start justify-between gap-2 px-3 py-2.5">
                        <span className="min-w-0">
                          <span className="block truncate text-[12.5px] font-semibold">{template.name}</span>
                          <span className="block truncate text-[9px] uppercase tracking-[0.13em] text-[#98a298]">
                            {template.world}
                          </span>
                        </span>
                        {isSelected && <Check size={14} className="mt-0.5 shrink-0 text-[#35634d]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {visible.length === 0 && (
                <p className="py-10 text-center text-[13px] text-[#879186]">No template matches that name.</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#dedfd5] bg-[#fffefa] px-5 py-3">
              <span className="text-[11.5px] text-muted-foreground">Saved when you press Save and publish.</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#164e42] px-5 py-2.5 text-[12px] font-semibold text-[#f7f6ef] transition-colors hover:bg-[#236657]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
