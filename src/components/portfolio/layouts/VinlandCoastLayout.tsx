import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** Weathered hairline: dashes of ink separated by gaps, like a worn edge. */
const WORN = (color: string) =>
  `repeating-linear-gradient(90deg, ${color} 0 34px, transparent 34px 43px)`;

/** The axe-cut lower edge of the poster band. */
const AXE = "polygon(0 0, 100% 0, 100% 52%, 88% 100%, 68% 48%, 44% 94%, 22% 46%, 0 82%)";

/**
 * Vinland Coast — a rugged poster band over wide numbered rows. Ported from
 * the canvas page `var_7d267dd03e67`; motion `magnet` leans the skill chips
 * and the three work rows.
 */
export default function VinlandCoastLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.15);

  return (
    <div
      className="min-h-screen"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
      data-template-root
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: alpha(t.ink, 0.15), background: alpha(t.bg, 0.95) }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3.5">
            <span
              className="grid h-9 w-9 place-items-center text-[15px]"
              style={{ background: t.accent, color: alpha(t.ink, 1), fontFamily: f.display, letterSpacing: "0.06em" }}
            >
              {content.initial}
            </span>
            <span
              className="text-[24px] uppercase leading-none"
              style={{ fontFamily: f.display, letterSpacing: "0.08em" }}
            >
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <span
            className="text-[10px] uppercase"
            style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
          >
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden" style={{ background: t.surface }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(${t.ink} 1px, transparent 1.3px), radial-gradient(${t.ink} 1px, transparent 1.1px)`,
            backgroundSize: "13px 13px, 19px 19px",
            backgroundPosition: "0 0, 6px 8px",
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-6 pt-12">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="block h-[3px] w-11" style={{ background: t.accent }} />
              <span
                className="text-[10px] uppercase"
                style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
              >
                {content.role}
              </span>
            </div>
            <span
              className="text-[10px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
            >
              {content.initial}
            </span>
          </div>

          <h1
            className="mt-5 text-[76px] uppercase leading-[0.78] md:text-[148px]"
            style={{ fontFamily: f.display, letterSpacing: "0.005em" }}
          >
            {content.name}
          </h1>

          <div
            className="mt-9 grid grid-cols-12 gap-x-8 gap-y-7 pt-7"
            style={{ borderTop: `1px solid ${alpha(t.ink, 0.25)}` }}
          >
            <div className="col-span-12 md:col-span-7">
              <p className="max-w-[54ch] text-[17px] leading-[1.7]">{content.bio}</p>
            </div>
            {content.skills.length > 0 && (
              <div className="col-span-12 md:col-span-5">
                <span
                  className="text-[10px] uppercase"
                  style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
                >
                  Skills
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {content.skills.map((skill) => (
                    <span
                      key={skill}
                      data-magnet
                      className="border px-2.5 py-1.5 text-[10px] uppercase will-change-transform"
                      style={{
                        borderColor: alpha(t.ink, 0.55),
                        background: t.bg,
                        fontFamily: f.mono,
                        letterSpacing: "0.14em",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {content.socials.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-x-9 gap-y-3 pb-12">
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-[10px] uppercase underline decoration-2 underline-offset-[6px]"
                  style={{ fontFamily: f.mono, letterSpacing: "0.2em", textDecorationColor: t.accent }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div aria-hidden className="h-16 w-full" style={{ background: t.dark, clipPath: AXE }} />
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1180px] px-6 pb-4 pt-12">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[44px] uppercase leading-none md:text-[60px]" style={{ fontFamily: f.display }}>
              Selected work
            </h2>
            <div className="mb-2 hidden flex-1 md:block" style={{ height: 1, backgroundImage: WORN(alpha(t.ink, 0.55)) }} />
            <span
              className="text-[11px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
            >
              {String(content.projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-4">
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                data-magnet
                className={`group grid grid-cols-12 items-baseline gap-x-5 gap-y-2 border-b py-7 will-change-transform ${
                  index === 1 ? "md:pl-12" : index === 2 ? "md:pr-12" : ""
                }`}
                style={{ borderColor: line }}
              >
                <span
                  className="col-span-2 text-[11px] md:col-span-1"
                  style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.muted }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="col-span-10 text-[34px] uppercase leading-[0.95] md:col-span-5 md:text-[46px]"
                  style={{ fontFamily: f.display }}
                >
                  {project.title}
                </h3>
                <p className="col-span-12 text-[14px] leading-[1.6] md:col-span-4" style={{ color: t.muted }}>
                  {project.description}
                </p>
                <span
                  className="col-span-12 text-[11px] md:col-span-2 md:text-right"
                  style={{ fontFamily: f.mono, letterSpacing: "0.14em" }}
                >
                  {project.date}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target={isExternal(project.link) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="col-span-12 inline-flex items-center gap-1.5 text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.16em", color: t.accent }}
                  >
                    Case study <ArrowUpRight size={12} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="mt-14 py-16" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mb-9 flex items-center gap-5">
              <div className="h-[2px] flex-1" style={{ background: alpha(t.darkInk, 0.35) }} />
              <span className="block h-3 w-3 rotate-45" style={{ background: t.accent }} />
              <div className="h-[2px] flex-1" style={{ background: alpha(t.darkInk, 0.35) }} />
            </div>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-[40px] uppercase leading-none md:text-[54px]" style={{ fontFamily: f.display }}>
                Experience
              </h2>
              <div className="mb-2 hidden flex-1 md:block" style={{ height: 1, backgroundImage: WORN(alpha(t.darkInk, 0.5)) }} />
              <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkMuted }}>
                Roles
              </span>
            </div>
            <div className="mt-4">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid grid-cols-12 items-baseline gap-x-5 gap-y-2 py-6"
                  style={{ borderTop: `1px solid ${alpha(t.darkInk, 0.15)}` }}
                >
                  <span
                    className="col-span-12 text-[11px] md:col-span-2"
                    style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.darkMuted }}
                  >
                    {role.date}
                  </span>
                  <span
                    className="col-span-12 text-[26px] uppercase leading-none md:col-span-5 md:text-[32px]"
                    style={{ fontFamily: f.display }}
                  >
                    {role.title}
                  </span>
                  <span className="col-span-12 text-[14px] md:col-span-5" style={{ color: t.darkMuted }}>
                    {role.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.education.length > 0 && (
        <section id="education" className="mx-auto max-w-[1180px] px-6 pb-4 pt-14">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[40px] uppercase leading-none md:text-[54px]" style={{ fontFamily: f.display }}>
              Education
            </h2>
            <div className="mb-2 hidden flex-1 md:block" style={{ height: 1, backgroundImage: WORN(alpha(t.ink, 0.55)) }} />
            <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
              {String(content.education.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-8 pt-6" style={{ borderTop: `1px solid ${line}` }}>
            {content.education.map((item, index) => (
              <div key={`${item.title}-${index}`} className="col-span-12 grid grid-cols-12 gap-x-4 md:col-span-6">
                <span className="col-span-2 text-[30px] leading-none" style={{ fontFamily: f.display, color: t.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10">
                  <h3 className="text-[26px] uppercase leading-tight" style={{ fontFamily: f.display }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14px]" style={{ color: t.muted }}>
                    {item.description}
                  </p>
                  <p className="mt-2 text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.muted }}>
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.socials.length > 0 && (
        <section id="elsewhere" className="mx-auto max-w-[1180px] px-6 pb-16 pt-14">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[40px] uppercase leading-none md:text-[54px]" style={{ fontFamily: f.display }}>
              Links
            </h2>
            <div className="mb-2 hidden flex-1 md:block" style={{ height: 1, backgroundImage: WORN(alpha(t.ink, 0.55)) }} />
            <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
              {String(content.socials.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {content.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={isExternal(social.url) ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center justify-between border px-4 py-3.5"
                style={{
                  borderColor: isExternal(social.url) ? alpha(t.ink, 0.5) : t.accent,
                  background: isExternal(social.url) ? t.surface : t.accent,
                }}
              >
                <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.18em" }}>
                  {social.label}
                </span>
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t" style={{ borderColor: alpha(t.ink, 0.2), background: t.surface }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div className="flex items-center gap-3.5">
            <span className="block h-[3px] w-8" style={{ background: t.accent }} />
            <span className="text-[22px] uppercase leading-none" style={{ fontFamily: f.display, letterSpacing: "0.08em" }}>
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
