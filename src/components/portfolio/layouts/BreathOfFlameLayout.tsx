import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/**
 * Breath of Flame — an oversized poster band over a two-column ledger. Ported
 * from the canvas page `var_75dff8ddd5f3`; motion `streak` spawns ember lines
 * across the poster band.
 */
export default function BreathOfFlameLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.15);
  const onDark = alpha(t.bg, 0.15);
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

      <header className="sticky top-0 z-30" style={{ background: t.dark }}>
        <div className="mx-auto flex h-[58px] max-w-[1240px] items-center justify-between px-6">
          <a
            href="#top"
            className="text-[12px] uppercase"
            style={{ fontFamily: f.display, letterSpacing: "0.14em", color: t.accentInk }}
          >
            {content.name}
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkMuted }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <span
            className="text-[10px] uppercase"
            style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}
          >
            {content.role}
          </span>
        </div>
        <div className="h-[3px]" style={{ background: t.accent }} />
      </header>

      <section
        id="top"
        data-streak-host
        className="relative overflow-hidden border-b"
        style={{
          borderColor: line,
          backgroundImage: `radial-gradient(ellipse at 78% 8%, ${alpha(t.accent, 0.14)}, transparent 58%), radial-gradient(ellipse at 8% 92%, ${alpha(t.darkInk, 0.12)}, transparent 52%)`,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-24 -top-16 h-[420px] w-[520px] -rotate-[18deg]"
            style={{ background: alpha(t.accent, 0.1) }}
          />
          <div
            className="absolute right-14 top-24 h-[300px] w-[104px] -rotate-[18deg]"
            style={{ background: alpha(t.accent, 0.15) }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-[240px] w-[420px] -rotate-[18deg]"
            style={{ background: alpha(t.surface, 0.8) }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-14 pt-12">
          <span
            className="inline-block -rotate-[1.5deg] border-2 px-3 py-1 text-[10px] uppercase"
            style={{ borderColor: t.ink, fontFamily: f.mono, letterSpacing: "0.24em" }}
          >
            {content.role}
          </span>
          <h1
            className="mt-7 uppercase"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(2.6rem, 10.6vw, 112px)",
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
            }}
          >
            {content.firstName} <span style={{ color: t.accent }}>{content.lastName}</span>
          </h1>

          <div
            className="mt-9 grid gap-x-14 gap-y-8 pt-7 md:grid-cols-[1.05fr_1fr]"
            style={{ borderTop: `1px solid ${alpha(t.ink, 0.2)}` }}
          >
            <p className="max-w-[52ch] text-[16px] leading-[1.65]" style={{ color: t.muted }}>
              {content.bio}
            </p>
            <div>
              {content.skills.length > 0 && (
                <div
                  className="grid grid-cols-2 gap-x-6 py-1"
                  style={{ borderTop: `1px solid ${alpha(t.ink, 0.2)}`, borderBottom: `1px solid ${alpha(t.ink, 0.2)}` }}
                >
                  {content.skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 py-2 text-[12px] font-medium uppercase"
                      style={{ letterSpacing: "0.07em", borderBottom: `1px solid ${alpha(t.ink, 0.1)}` }}
                    >
                      <span
                        aria-hidden
                        className="h-[5px] w-[5px] shrink-0 rotate-45"
                        style={{ background: t.accent }}
                      />
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {content.socials.length > 0 && (
                <div
                  className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] uppercase"
                  style={{ fontFamily: f.mono, letterSpacing: "0.18em" }}
                >
                  {content.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target={isExternal(social.url) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5"
                      style={{ color: isExternal(social.url) ? t.ink : t.accent }}
                    >
                      {social.label}
                      {isExternal(social.url) && <ArrowUpRight size={12} />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto max-w-[1180px] px-6 py-14">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                className="text-[15px] uppercase"
                style={{ fontFamily: f.display, letterSpacing: "0.1em" }}
              >
                Selected work
              </h2>
              <span
                className="text-[10px] uppercase"
                style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
              >
                {years}
              </span>
            </div>
            <div
              className="mt-4 h-[3px] w-full"
              style={{ backgroundImage: `linear-gradient(to right, ${t.accent} 0 92px, ${t.ink} 92px 100%)` }}
            />
            <ol>
              {content.projects.map((project, index) => (
                <li
                  key={`${project.title}-${index}`}
                  className="grid grid-cols-[38px_1fr] gap-x-5 border-b py-7 md:grid-cols-[56px_1fr_120px]"
                  style={{ borderColor: line }}
                >
                  <span
                    className="pt-1.5 text-[11px]"
                    style={{ fontFamily: f.mono, letterSpacing: "0.12em", color: t.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="text-[24px] uppercase"
                      style={{ fontFamily: f.display, lineHeight: 1.05, letterSpacing: "-0.005em" }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.6]" style={{ color: t.muted }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase"
                        style={{ fontFamily: f.mono, letterSpacing: "0.18em", color: t.ink }}
                      >
                        Case study <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                  <span
                    className="col-start-2 mt-3 text-[11px] md:col-start-3 md:mt-1.5 md:text-right"
                    style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.muted }}
                  >
                    {project.date}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="relative" style={{ background: t.dark, color: t.accentInk }}>
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[7px]"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${t.accent} 0%, ${alpha(t.accent, 0.55)} 34%, ${alpha(
                t.accent,
                0.1
              )} 68%, ${alpha(t.accent, 0)} 100%)`,
            }}
          />
          <div className="mx-auto max-w-[1180px] px-6 py-14 pl-9">
            <h2 className="text-[15px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.1em", color: t.darkInk }}>
              Experience
            </h2>
            <div className="mt-4 h-px w-full" style={{ background: onDark }} />
            <ul>
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b py-5"
                  style={{ borderColor: onDark }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="text-[19px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.01em" }}>
                      {role.title}
                    </span>
                    <span className="text-[14px]" style={{ color: t.darkMuted }}>
                      {role.description}
                    </span>
                  </div>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: f.mono, letterSpacing: "0.14em", color: t.darkInk }}
                  >
                    {role.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.education.length > 0 && (
        <section id="education" className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto max-w-[1180px] px-6 py-14">
            <h2 className="text-[15px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.1em" }}>
              Education
            </h2>
            <div className="mt-4 h-px w-full" style={{ background: alpha(t.ink, 0.2) }} />
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {content.education.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="px-6 py-5"
                  style={{ background: t.surface, borderLeft: `3px solid ${t.accent}` }}
                >
                  <p className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.18em", color: t.muted }}>
                    {item.date}
                  </p>
                  <p className="mt-2 text-[16px] uppercase" style={{ fontFamily: f.display, lineHeight: 1.25 }}>
                    {item.title}
                  </p>
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
        <section id="elsewhere" style={{ background: t.surface }}>
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-6 py-9">
            <h2 className="text-[13px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.12em" }}>
              Elsewhere
            </h2>
            <div
              className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.18em" }}
            >
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5"
                  style={{ color: isExternal(social.url) ? t.ink : t.accent }}
                >
                  {social.label}
                  {isExternal(social.url) && <ArrowUpRight size={12} />}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: t.dark }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-6">
          <span className="text-[11px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.14em", color: t.accentInk }}>
            {content.name}
          </span>
          <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.18em", color: t.darkMuted }}>
            {content.role}
          </span>
        </div>
      </footer>
    </div>
  );
}
