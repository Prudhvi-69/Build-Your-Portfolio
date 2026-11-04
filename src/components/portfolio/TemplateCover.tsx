"use client";

import { alpha, type LayoutId, type TemplateDefinition } from "@/lib/templates/types";

/**
 * A bespoke layout borrows its archetype's cover: a cover is a small summary,
 * not a second implementation of the page it sits in front of.
 */
const COVER_ALIAS: Partial<Record<LayoutId, LayoutId>> = {
  "grand-line": "scene",
  "deep-field": "scene",
  "last-son": "editorial",
  "soul-reaper": "editorial",
  "iron-throne": "deco",
  "cursed-energy": "hud",
  "owl-post": "editorial",
  "breath-of-flame": "editorial",
  "vinland-coast": "editorial",
  "star-shield": "deco",
  "thunder-rune": "deco",
  amazonia: "deco",
  "emerald-oath": "hud",
  longship: "hud",
  "web-slinger": "scene",
  "scarlet-speed": "scene",
  "alpine-meadow": "packaging",
  "abyss-light": "scene",
};

/**
 * Compact, honest representation of a template inside the gallery and the
 * editor picker. It uses the template's real palette and type pairing and
 * follows its structural family, so two covers never look alike — the full
 * page lives at /templates/[id].
 */
export default function TemplateCover({
  template,
  name,
  role,
  projects,
}: {
  template: TemplateDefinition;
  name: string;
  role: string;
  projects?: string[];
}) {
  const t = template.theme;
  const f = template.fonts;
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");
  const titleAt = (index: number) => projects?.[index] ?? "\u00A0";
  const hasProjects = (projects?.length ?? 0) > 0;

  const coverLayout = COVER_ALIAS[template.layout] ?? template.layout;

  switch (coverLayout) {
    case "scroll":
      return (
        <div className="flex h-full" style={{ background: t.bg, fontFamily: f.body }}>
          <div className="flex w-[46%] flex-col justify-between p-3.5" style={{ background: t.dark, color: t.darkInk }}>
            <span className="text-[6px] uppercase" style={{ letterSpacing: "0.24em", color: t.darkMuted }}>
              {role}
            </span>
            <div>
              <p style={{ fontFamily: f.display, fontSize: 21, lineHeight: 0.95, fontWeight: 800 }}>
                {first}
                <br />
                {last}
              </p>
              <span className="mt-2.5 block h-5 w-5" style={{ background: t.accent }} />
            </div>
            <div className="space-y-1.5">
              {[0.22, 0.14, 0.1].map((opacity, row) => (
                <span
                  key={opacity}
                  className="block h-[2px]"
                  style={{ background: alpha(t.darkInk, opacity), width: `${86 - row * 18}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 p-3.5">
            <span className="text-[6px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted }}>
              Selected work
            </span>
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-baseline justify-between border-b pb-1" style={{ borderColor: alpha(t.ink, 0.14) }}>
                <span className="truncate" style={{ fontFamily: f.display, fontSize: 11, color: t.ink }}>
                  {hasProjects ? titleAt(row) : "\u00A0"}
                </span>
                <span style={{ fontSize: 5.5, color: t.muted }}>202{5 - row}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "hud":
      return (
        <div className="flex h-full flex-col justify-between p-3.5" style={{ background: t.dark, color: t.darkInk, fontFamily: f.body }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[6px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
                {role}
              </span>
              <p className="mt-1 uppercase" style={{ fontFamily: f.display, fontSize: 15, lineHeight: 0.95 }}>
                {first} {last}
              </p>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full text-[6px]" style={{ border: `1px solid ${t.darkInk}`, color: t.darkInk }}>
              {name.slice(0, 1)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((cell) => (
              <span
                key={cell}
                className="h-7"
                style={{
                  background: cell === 0 ? alpha(t.darkInk, 0.16) : alpha(t.darkInk, 0.06),
                  boxShadow: `inset 0 0 0 1px ${alpha(t.darkInk, 0.28)}`,
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              />
            ))}
          </div>
        </div>
      );

    case "editorial":
      return (
        <div className="flex h-full flex-col justify-between p-3.5" style={{ background: t.bg, color: t.ink }}>
          <div className="flex items-center justify-between">
            <span className="text-[6px] uppercase" style={{ letterSpacing: "0.24em", color: t.muted }}>
              {role}
            </span>
            <span className="text-[6px]" style={{ color: t.muted }}>
              01
            </span>
          </div>
          <p
            style={{
              fontFamily: f.display,
              fontSize: 26,
              lineHeight: 0.82,
              letterSpacing: "0.01em",
              textTransform: /Bebas|Archivo/i.test(f.display) ? "uppercase" : "none",
            }}
          >
            {first}
            <br />
            <span style={{ color: t.accent }}>{last}</span>
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((index) => (
              <span key={index} className="h-1" style={{ background: alpha(t.ink, 0.16) }} />
            ))}
          </div>
        </div>
      );

    case "deco":
      return (
        <div
          className="flex h-full flex-col items-center justify-center gap-1.5 p-3.5 text-center"
          style={{ background: t.dark, color: t.darkInk }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full text-[6px]" style={{ border: `1px solid ${t.accent}`, color: t.accent }}>
            {first.slice(0, 1)}
            {last.slice(0, 1)}
          </span>
          <p className="uppercase" style={{ fontFamily: f.display, fontSize: 12, letterSpacing: "0.18em" }}>
            {first} {last}
          </p>
          <span className="flex w-full items-center gap-1">
            <i className="h-px flex-1" style={{ background: alpha(t.accent, 0.6) }} />
            <i className="h-1 w-1 rotate-45" style={{ border: `1px solid ${t.accent}` }} />
            <i className="h-px flex-1" style={{ background: alpha(t.accent, 0.6) }} />
          </span>
          <span className="text-[5.5px] uppercase" style={{ letterSpacing: "0.3em", color: t.darkMuted }}>
            {role}
          </span>
        </div>
      );

    case "packaging":
      return (
        <div className="flex h-full flex-col justify-between p-3" style={{ background: t.bg, color: t.ink }}>
          <div className="flex items-start justify-between">
            <div>
              <p style={{ fontFamily: f.display, fontSize: 19, lineHeight: 0.95, fontWeight: 600 }}>
                {first}
                <br />
                {last}
              </p>
              <span className="mt-1 block text-[6px] uppercase" style={{ letterSpacing: "0.16em", color: t.muted }}>
                {role}
              </span>
            </div>
            <span
              className="h-9 w-9 rounded-full"
              style={{ background: t.accent, boxShadow: `0 0 0 3px #fff, 0 2px 0 ${alpha(t.ink, 0.14)}` }}
            />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="h-4 flex-1 rounded-full"
                style={{ background: index === 0 ? t.accent : index === 1 ? t.dark : "#FFFFFF" }}
              />
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="relative flex h-full flex-col justify-between overflow-hidden p-3.5" style={{ background: t.dark, color: t.darkInk }}>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: `radial-gradient(50% 50% at 20% 0%, ${alpha(t.accent, 0.4)}, transparent 70%)` }}
          />
          <span className="relative text-[6px] uppercase" style={{ letterSpacing: "0.26em", color: alpha(t.darkInk, 0.7) }}>
            {role}
          </span>
          <p
            className="relative"
            style={{
              fontFamily: f.display,
              fontSize: 24,
              lineHeight: 0.84,
              textTransform: /Bebas|Archivo/i.test(f.display) ? "uppercase" : "none",
            }}
          >
            {first}
            <br />
            <span style={{ color: t.accent }}>{last}</span>
          </p>
          <div className="relative flex gap-1">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="h-5 flex-1 opacity-80"
                style={{ background: alpha(t.darkInk, 0.16), borderRadius: 3 }}
              />
            ))}
          </div>
        </div>
      );
  }
}
