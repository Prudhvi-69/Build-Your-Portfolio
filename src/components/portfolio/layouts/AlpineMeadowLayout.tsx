import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** Rolling hills closing the hero panel. */
const HILL_FAR = "M0 118 C 150 52 300 138 452 108 C 610 76 742 156 878 112 C 986 78 1082 106 1180 86 L1180 170 L0 170 Z";
const HILL_NEAR = "M0 146 C 190 92 352 164 520 138 C 700 110 848 172 1004 136 C 1090 116 1140 130 1180 122 L1180 170 L0 170 Z";

/**
 * Alpine Meadow — soft rounded panels on a meadow palette. Ported from the
 * canvas page `var_87fee726cd4d`; motion `caustics` moves the light wash across
 * the hero panel with the pointer.
 */
export default function AlpineMeadowLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.1);
  const years = [content.projects[0]?.date, content.projects[content.projects.length - 1]?.date]
    .filter(Boolean)
    .join(" — ");

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-30 px-4 pt-4 md:px-8 md:pt-5">
        <div
          className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 rounded-full border px-3 py-2 shadow-[0_10px_30px_-24px_rgba(60,58,42,0.7)] backdrop-blur-md sm:px-5"
          style={{ borderColor: alpha(t.ink, 0.1), background: alpha(t.bg, 0.92) }}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold"
              style={{ background: t.accent, color: t.accentInk }}
            >
              {content.initial}
            </span>
            <span className="hidden text-[15px] font-semibold sm:block">{content.name}</span>
            <span className="text-[15px] font-semibold sm:hidden">{content.firstName}</span>
          </a>
          <nav className="hidden items-center gap-6 text-[13px] font-semibold md:flex" style={{ color: t.muted }}>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
          </nav>
          <a
            href="#elsewhere"
            className="rounded-full px-4 py-1.5 text-[12px] font-semibold"
            style={{ background: t.ink, color: t.bg }}
          >
            Contact
          </a>
        </div>
      </header>

      <section id="top" className="px-4 pt-5 md:px-8 md:pt-6">
        <div
          className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[34px] border"
          style={{ borderColor: line, background: t.surface }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(760px circle at var(--caustic-x, 30%) var(--caustic-y, 12%), ${alpha(
                t.accent,
                0.34
              )}, ${alpha(t.accent, 0)} 68%)`,
            }}
          />
          <div className="relative px-6 pt-11 md:px-14 md:pt-16">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase"
                style={{ background: t.accent, color: t.accentInk, letterSpacing: "0.12em" }}
              >
                {content.role}
              </span>
            </div>
            <h1
              className="mt-5 max-w-[15ch] text-[46px] font-semibold leading-[0.98] sm:text-[60px] md:text-[82px]"
              style={{ fontFamily: f.display }}
            >
              {content.name}
            </h1>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.72] md:text-[19px]" style={{ color: alpha(t.ink, 0.8) }}>
              {content.bio}
            </p>
            {content.socials.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2 pb-8">
                {content.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="rounded-full border px-4 py-2 text-[13px] font-semibold"
                    style={{ borderColor: alpha(t.ink, 0.12), background: t.bg }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <svg aria-hidden className="relative block w-full" viewBox="0 0 1180 170" preserveAspectRatio="none">
            <path d={HILL_FAR} fill={t.accent} opacity="0.26" />
            <path d={HILL_NEAR} fill={t.accent} opacity="0.46" />
          </svg>
        </div>
      </section>

      {content.skills.length > 0 && (
        <section className="px-4 pt-6 md:px-8 md:pt-7">
          <div
            className="mx-auto max-w-[1180px] rounded-[26px] border px-5 py-5 md:px-8 md:py-6"
            style={{ borderColor: line, background: alpha(t.surface, 0.7) }}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.18em", color: t.muted }}>
                Skills
              </span>
              {content.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-4 py-2 text-[13px] font-semibold"
                  style={{ borderColor: alpha(t.ink, 0.12), background: t.bg }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.projects.length > 0 && (
        <section id="work" className="px-4 pt-12 md:px-8 md:pt-16">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-wrap items-end justify-between gap-3 px-1">
              <h2 className="text-[26px] font-semibold md:text-[32px]" style={{ fontFamily: f.display }}>
                Selected work
              </h2>
              <span className="text-[11px]" style={{ fontFamily: f.mono, letterSpacing: "0.16em", color: t.muted }}>
                {years}
              </span>
            </div>
            <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:gap-5">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="min-w-[280px] max-w-[400px] flex-1 snap-start rounded-[26px] border p-6"
                  style={{ borderColor: line, background: t.surface }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[10px]"
                      style={{ background: t.bg, color: t.muted, fontFamily: f.mono, letterSpacing: "0.14em" }}
                    >
                      {project.date}
                    </span>
                    <svg aria-hidden width="34" height="22" viewBox="0 0 34 22">
                      <path
                        d="M1 20 C 7 8 12 6 17 13 C 22 20 27 9 33 2"
                        fill="none"
                        opacity="0.75"
                        stroke={t.accent}
                        strokeLinecap="round"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-[22px] font-semibold" style={{ fontFamily: f.display }}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-2.5 text-[15px] leading-[1.65]" style={{ color: alpha(t.ink, 0.75) }}>
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold"
                      style={{ color: t.accent }}
                    >
                      Read case study <ArrowUpRight size={12} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="px-4 pt-12 md:px-8 md:pt-16">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="px-1 text-[26px] font-semibold md:text-[32px]" style={{ fontFamily: f.display }}>
              Experience
            </h2>
            <ol className="mt-6 space-y-3">
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="flex flex-col gap-2 rounded-[22px] border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
                  style={{ borderColor: line, background: t.bg }}
                >
                  <div>
                    <p className="text-[18px] font-semibold" style={{ fontFamily: f.display }}>
                      {role.description || role.title}
                    </p>
                    <p className="mt-0.5 text-[14px]" style={{ color: t.muted }}>
                      {role.description ? role.title : ""}
                    </p>
                  </div>
                  <span
                    className="w-fit rounded-full px-3 py-1 text-[10px]"
                    style={{ background: t.surface, color: t.muted, fontFamily: f.mono, letterSpacing: "0.12em" }}
                  >
                    {role.date}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.education.length > 0 && (
        <section id="education" className="px-4 pt-12 md:px-8 md:pt-16">
          <div
            className="mx-auto max-w-[1180px] rounded-[30px] border p-4 md:p-6"
            style={{ borderColor: line, background: t.surface }}
          >
            <div className="flex items-end justify-between gap-3 px-2 pb-4">
              <h2 className="text-[26px] font-semibold md:text-[32px]" style={{ fontFamily: f.display }}>
                Education
              </h2>
              <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.18em", color: t.muted }}>
                {[content.education[content.education.length - 1]?.date, content.education[0]?.date]
                  .filter(Boolean)
                  .join(" — ")}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {content.education.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-[22px] p-5" style={{ background: t.bg }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold" style={{ fontFamily: f.mono, letterSpacing: "0.1em", color: t.accent }}>
                      {item.date}
                    </span>
                    <span className="h-px flex-1" style={{ background: alpha(t.accent, 0.3) }} />
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold leading-snug" style={{ fontFamily: f.display }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14px]" style={{ color: t.muted }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.socials.length > 0 && (
        <section id="elsewhere" className="px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="px-1 text-[26px] font-semibold md:text-[32px]" style={{ fontFamily: f.display }}>
              Elsewhere
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-full border px-5 py-3 text-[13px] font-semibold"
                  style={{ borderColor: line, background: t.surface }}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: t.accent }} />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t px-4 py-8 md:px-8" style={{ borderColor: alpha(t.ink, 0.1) }}>
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[15px] font-semibold" style={{ fontFamily: f.display }}>
            {content.name}
          </span>
          <a href="#top" className="text-[12px] font-semibold" style={{ color: t.muted }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
