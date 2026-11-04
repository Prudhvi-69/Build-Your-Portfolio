import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

const CUT_BR = "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)";
const CUT_TR = "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)";
const CUT_TL = "polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)";

/**
 * Web Slinger — sticker-edged comic panels on a halftone field. Ported from the
 * canvas page `var_69e5b9965f73`; motion `scramble` decodes the three project
 * titles on hover.
 */
export default function WebSlingerLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const chip = `5px 5px 0 0 ${t.ink}`;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: alpha(t.ink, 0.15), background: alpha(t.bg, 0.95) }}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center border-2 text-[11px] font-semibold"
              style={{ borderColor: t.ink, background: t.accent, color: t.accentInk, fontFamily: f.mono, letterSpacing: "0.06em" }}
            >
              {content.initial}
            </span>
            <span className="text-[15px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-6 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b" style={{ borderColor: alpha(t.ink, 0.15) }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: `radial-gradient(${t.ink} 1px, transparent 1.2px)`, backgroundSize: "8px 8px" }}
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-[340px] w-[340px] opacity-[0.13]"
          viewBox="0 0 240 240"
          fill="none"
          stroke={t.ink}
          strokeWidth="1"
        >
          <path d="M120 0V240M0 120H240M36 36L204 204M204 36L36 204" />
          <ellipse cx="120" cy="120" rx="96" ry="96" />
          <ellipse cx="120" cy="120" rx="64" ry="64" />
          <ellipse cx="120" cy="120" rx="32" ry="32" />
        </svg>

        <div className="relative mx-auto max-w-[1180px] px-6 pb-10 pt-12">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-7">
              <div
                className="border-2 p-7"
                style={{ clipPath: CUT_BR, borderColor: t.ink, background: t.bg, boxShadow: `9px 9px 0 0 ${t.surface}` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                    {content.role}
                  </span>
                  <span aria-hidden className="grid h-5 w-5 place-items-center" style={{ background: t.accent }} />
                </div>
                <h1
                  className="mt-7 uppercase"
                  style={{
                    fontFamily: f.display,
                    fontSize: "clamp(2.6rem, 8vw, 84px)",
                    lineHeight: 0.86,
                    letterSpacing: "-0.035em",
                    textShadow: `6px 5px 0 ${alpha(t.accent, 0.85)}`,
                  }}
                >
                  <span className="block">{content.firstName}</span>
                  <span className="block">{content.lastName || "\u00A0"}</span>
                </h1>
                <div
                  className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-4"
                  style={{ borderTop: `2px solid ${t.ink}` }}
                >
                  <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
                    {content.initial} / {content.role}
                  </span>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.2em" }}
                  >
                    Selected work <ArrowUpRight size={12} style={{ color: t.accent }} />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-12 flex flex-col gap-5 md:col-span-5">
              <div
                className="border-2 p-6"
                style={{ clipPath: CUT_TR, borderColor: t.ink, background: t.surface }}
              >
                <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                  About
                </span>
                <p className="mt-4 text-[15px] leading-[1.65]">{content.bio}</p>
              </div>

              {content.socials.length > 0 && (
                <div
                  className="border-2 p-6"
                  style={{ clipPath: CUT_BR, borderColor: t.ink, background: t.bg, boxShadow: chip }}
                >
                  <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                    Links
                  </span>
                  <ul className="mt-3">
                    {content.socials.map((social, index) => (
                      <li key={social.label} style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.12)}` }}>
                        <a
                          href={social.url}
                          target={isExternal(social.url) ? "_blank" : undefined}
                          rel="noreferrer"
                          className="flex items-center justify-between py-2.5 text-[14px] font-medium"
                        >
                          <span>{social.label}</span>
                          <ArrowUpRight size={12} style={{ color: t.accent }} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {content.skills.length > 0 && (
              <div className="col-span-12 mt-1 flex flex-wrap items-center gap-3">
                <span className="mr-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                  Skills
                </span>
                {content.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="border-2 px-3 py-1.5 text-[10px] uppercase"
                    style={{
                      clipPath: CUT_TR,
                      borderColor: t.ink,
                      background: index % 2 === 0 ? t.bg : t.surface,
                      fontFamily: f.mono,
                      letterSpacing: "0.16em",
                      transform: `rotate(${index % 2 === 0 ? -1.4 : 0.9}deg)`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="relative mx-auto max-w-[1180px] px-6 pt-14">
          <div className="flex items-end justify-between pb-3" style={{ borderBottom: `2px solid ${t.ink}` }}>
            <h2
              className="text-[32px] uppercase leading-none md:text-[44px]"
              style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}
            >
              Selected work
            </h2>
            <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
              {String(content.projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-7 grid grid-cols-12 gap-5">
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className={`col-span-12 ${index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : ""}`}
              >
                <div
                  className={`relative flex h-full flex-col border-2 p-7 ${
                    index === 0 ? "border-2" : ""
                  }`}
                  style={{
                    clipPath: index === 0 ? CUT_TL : index === 1 ? CUT_TR : CUT_BR,
                    borderColor: t.ink,
                    background: index === 1 ? t.surface : t.bg,
                    boxShadow: index === 1 ? undefined : `7px 7px 0 0 ${t.accent}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
                      {project.date}
                    </span>
                    <span
                      className="text-[10px] uppercase"
                      style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.accent }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    data-scramble
                    className="mt-8 uppercase"
                    style={{
                      fontFamily: f.display,
                      fontSize: index === 0 ? "clamp(2rem, 4vw, 52px)" : index === 1 ? "clamp(1.6rem, 2.6vw, 36px)" : "clamp(1.7rem, 3vw, 42px)",
                      lineHeight: index === 0 ? 0.92 : 0.95,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className={`mt-5 text-[15px] leading-[1.65] ${index === 0 ? "max-w-[46ch]" : ""}`}>
                      {project.description}
                    </p>
                  )}
                  <div
                    className="mt-auto flex items-center justify-between gap-4 pt-4"
                    style={{ borderTop: `2px solid ${t.ink}` }}
                  >
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-[10px] uppercase"
                        style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.accent }}
                      >
                        Read case study
                      </a>
                    )}
                    <span
                      aria-hidden
                      className="h-2 w-2"
                      style={{ background: index === 1 ? t.ink : t.accent }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="mt-16 py-14" style={{ background: t.dark, color: t.bg }}>
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="flex items-end justify-between pb-3" style={{ borderBottom: `1px solid ${alpha(t.bg, 0.3)}` }}>
              <h2
                className="text-[30px] uppercase leading-none md:text-[42px]"
                style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}
              >
                Experience
              </h2>
              <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkMuted }}>
                Roles
              </span>
            </div>
            <div>
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid grid-cols-12 items-baseline gap-4 py-6"
                  style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.bg, 0.2)}` }}
                >
                  <span
                    className="col-span-3 text-[11px] uppercase md:col-span-2"
                    style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.darkMuted }}
                  >
                    {role.date}
                  </span>
                  <span className="col-span-9 text-[19px] font-semibold md:col-span-4" style={{ letterSpacing: "-0.01em" }}>
                    {role.title}
                  </span>
                  <span className="col-span-9 col-start-4 text-[14px] md:col-span-5 md:col-start-7" style={{ color: t.darkMuted }}>
                    {role.description}
                  </span>
                  <span className="col-span-12 hidden justify-self-end md:col-span-1 md:block">
                    <span aria-hidden className="block h-2 w-2" style={{ background: t.accent }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.education.length > 0 && (
        <section id="education" className="mx-auto max-w-[1180px] px-6 pt-14">
          <div className="flex items-end justify-between pb-3" style={{ borderBottom: `2px solid ${t.ink}` }}>
            <h2
              className="text-[30px] uppercase leading-none md:text-[42px]"
              style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}
            >
              Education
            </h2>
            <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
              {String(content.education.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-12 gap-6">
            {content.education.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`col-span-12 md:col-span-6 ${index > 0 ? "md:border-l-2 md:pl-6" : ""}`}
                style={{ borderColor: alpha(t.ink, 0.15) }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center border-2 text-[10px]"
                    style={{ borderColor: t.ink, fontFamily: f.mono }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[19px] font-semibold leading-snug" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                </div>
                <p className="ml-10 mt-2 text-[14px]" style={{ color: t.muted }}>
                  {item.description}
                </p>
                <p className="ml-10 mt-3 text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.muted }}>
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.socials.length > 0 && (
        <section id="elsewhere" className="mx-auto max-w-[1180px] px-6 pb-16 pt-14">
          <div className="flex items-end justify-between pb-3" style={{ borderBottom: `2px solid ${t.ink}` }}>
            <h2
              className="text-[30px] uppercase leading-none md:text-[42px]"
              style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}
            >
              Links
            </h2>
            <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
              {String(content.socials.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {content.socials.map((social, index) => {
              const last = index === content.socials.length - 1;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 border-2 px-4 py-4"
                  style={{
                    borderColor: t.ink,
                    background: last ? t.accent : t.bg,
                    color: last ? t.accentInk : t.ink,
                    boxShadow: chip,
                  }}
                >
                  <span className="text-[15px] font-semibold">{social.label}</span>
                  <ArrowUpRight size={14} />
                </a>
              );
            })}
          </div>
        </section>
      )}

      <footer className="border-t-2" style={{ borderColor: t.ink, background: t.surface }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-7">
          <div className="flex items-center gap-3">
            <span
              className="grid h-7 w-7 place-items-center border-2 text-[10px]"
              style={{ borderColor: t.ink, background: t.accent, color: t.accentInk, fontFamily: f.mono }}
            >
              {content.initial}
            </span>
            <span className="text-[13px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
              {content.name}
            </span>
          </div>
          <a href="#top" className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
