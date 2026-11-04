import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** The four-stroke rune this template engraves on plates and rail rows. */
function RuneGlyph({ color, className }: { color: string; className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 16 24" fill="none">
      <path d="M8 2 V22 M8 8 L14 4 M8 8 L2 4 M8 16 L14 20 M8 16 L2 20" stroke={color} strokeWidth="1.1" />
    </svg>
  );
}

/**
 * Thunder Rune — a rune-ringed centre under gold keylines. Ported from the
 * canvas page `var_962b49e55f61`; motion `tilt` leans the nine engraved plates
 * and rune cells individually.
 */
export default function ThunderRuneLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.1);
  const gold = (o: number) => alpha(t.accent, o);
  const plate = `linear-gradient(180deg, ${t.surface} 0%, ${alpha(t.bg, 0.85)} 100%)`;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-40 border-b" style={{ borderColor: gold(0.45), background: t.dark }}>
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-6 px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-7 w-7 rotate-45 place-items-center border"
              style={{ borderColor: gold(0.7) }}
            >
              <span className="-rotate-45 text-[9px] font-semibold" style={{ color: t.accent, letterSpacing: "0.06em" }}>
                {content.initial}
              </span>
            </span>
            <span
              className="text-[11px] uppercase"
              style={{ fontFamily: f.display, letterSpacing: "0.36em", color: t.bg }}
            >
              {content.name}
            </span>
          </a>
          <nav
            className="flex items-center gap-5 text-[9px] uppercase sm:gap-7"
            style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.darkMuted }}
          >
            <a href="#about" className="hidden sm:inline">
              About
            </a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <span className="h-3 w-px" style={{ background: gold(0.4) }} />
            <a href="#elsewhere">Contact</a>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden border-b"
        style={{
          borderColor: line,
          background: `radial-gradient(92% 72% at 50% 46%, ${gold(0.13)} 0%, ${gold(0)} 72%)`,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-4 border" style={{ borderColor: gold(0.35) }} />
        <div aria-hidden className="pointer-events-none absolute inset-[26px] border" style={{ borderColor: gold(0.15) }} />

        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[53%] z-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[560px] lg:w-[560px]">
            <svg aria-hidden className="h-full w-full" viewBox="0 0 640 640" fill="none">
              <g stroke={t.accent} strokeWidth="1.3" strokeOpacity=".7">
                <path d="M381.96 28.52 A298 298 0 0 1 616.86 294.03" />
                <path d="M616.86 345.97 A298 298 0 0 1 345.97 616.86" />
                <path d="M294.03 616.86 A298 298 0 0 1 23.14 345.97" />
                <path d="M23.14 294.03 A298 298 0 0 1 258.04 28.52" />
              </g>
              <circle cx="320" cy="320" r="276" stroke={t.accent} strokeDasharray="14 9" strokeOpacity=".3" />
              <circle cx="320" cy="320" r="248" stroke={t.ink} strokeDasharray="2 12" strokeOpacity=".18" />
              <g stroke={t.accent} strokeOpacity=".9">
                <path d="M320 4 V34 M320 24 L338 14 M320 24 L302 14" />
                <path d="M636 320 H606 M616 320 L626 302 M616 320 L626 338" />
                <path d="M320 636 V606 M320 616 L338 626 M320 616 L302 626" />
                <path d="M4 320 H34 M24 320 L14 302 M24 320 L14 338" />
                <path d="M106 106 L120 120 M112 118 L120 104 M112 118 L98 110" />
                <path d="M534 106 L520 120 M528 118 L520 104 M528 118 L542 110" />
                <path d="M106 534 L120 520 M112 522 L120 536 M112 522 L98 530" />
                <path d="M534 534 L520 520 M528 522 L520 536 M528 522 L542 530" />
              </g>
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-8 pb-20 pt-16 text-center">
          <h1
            className="uppercase"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(2.5rem, 8vw, 100px)",
              lineHeight: 0.92,
              letterSpacing: "0.04em",
            }}
          >
            {content.name}
          </h1>
          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span style={{ display: "block", height: 1, width: 96, background: gold(0.7) }} />
            <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 1 V23 M12 7 L20 3 M12 7 L4 3 M12 17 L20 21 M12 17 L4 21" stroke={t.accent} strokeWidth="1.2" />
            </svg>
            <span style={{ display: "block", height: 1, width: 96, background: gold(0.7) }} />
          </div>
          <p className="mt-6 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.44em", color: t.muted }}>
            {content.role}
          </p>
          {content.socials.length > 0 && (
            <div
              className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[9px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: alpha(t.ink, 0.7) }}
            >
              {content.socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-5"
                >
                  {social.label}
                  {index < content.socials.length - 1 && (
                    <span aria-hidden className="h-1 w-1 rotate-45" style={{ background: t.accent }} />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <div aria-hidden className="overflow-hidden border-b py-4" style={{ borderColor: line, background: t.surface }}>
        <svg className="h-full w-full" height="26" viewBox="0 0 1280 26" preserveAspectRatio="none">
          <defs>
            <pattern id="runeTile" width="78" height="26" patternUnits="userSpaceOnUse">
              <path
                d="M10 4 V22 M10 9 L17 5 M10 9 L3 5 M10 16 L17 20 M10 16 L3 20"
                fill="none"
                stroke={t.accent}
                strokeOpacity=".75"
                strokeWidth="1"
              />
              <path d="M38 6 L48 20 M48 6 L38 20" fill="none" stroke={t.ink} strokeOpacity=".22" strokeWidth="1" />
              <rect x="60" y="11" width="3" height="3" fill={t.accent} />
              <rect x="66" y="13" width="3" height="3" fill={t.accent} transform="rotate(45 66 13)" />
            </pattern>
          </defs>
          <rect width="1280" height="26" fill="url(#runeTile)" />
        </svg>
      </div>

      <section id="about" className="border-b" style={{ borderColor: line, background: t.surface }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-8 py-20 md:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span style={{ display: "block", height: 1, width: 36, background: t.accent }} />
              <h2 className="text-[34px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.08em" }}>
                About
              </h2>
              <span style={{ display: "block", height: 1, width: 36, background: t.accent }} />
            </div>
            <p className="mt-8 text-[21px] leading-[1.7]" style={{ color: alpha(t.ink, 0.85) }}>
              <span
                aria-hidden
                className="float-left mr-3.5 mt-2.5 leading-[0.78]"
                style={{ fontFamily: f.display, fontSize: 62 }}
              >
                {content.bio.slice(0, 1)}
              </span>
              {content.bio.slice(1)}
            </p>
          </div>

          {content.skills.length > 0 && (
            <div className="relative border p-6" style={{ borderColor: alpha(t.accent, 0.45), background: alpha(t.bg, 0.7) }}>
              <div className="flex items-center justify-between gap-4 border-b pb-3" style={{ borderColor: alpha(t.accent, 0.35) }}>
                <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em" }}>
                  Skills
                </span>
                <RuneGlyph color={t.accent} className="h-4 w-3" />
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                {content.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: t.accent }} />
                    <span className="text-[15px] leading-tight" style={{ color: alpha(t.ink, 0.9) }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto max-w-[1180px] px-8 py-20">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex items-center gap-4">
                <h2 className="text-[36px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
                  Selected work
                </h2>
                <span style={{ display: "block", height: 1, width: 56, background: t.accent }} />
              </div>
              <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.muted }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
            {content.projects.map((project, index) => {
              const featured = index === 0;
              return (
                <article
                  key={`${project.title}-${index}`}
                  data-tilt
                  className={`border will-change-transform ${featured ? "p-8 md:col-span-2" : "p-7"}`}
                  style={{ background: plate, borderColor: alpha(t.accent, featured ? 0.45 : 0.35) }}
                >
                  {featured ? (
                    <div className="grid gap-7 md:grid-cols-[86px_1fr_auto] md:items-center">
                      <div className="flex items-center gap-3 md:flex-col md:items-start">
                        <RuneGlyph color={t.accent} className="h-6 w-4" />
                        <span className="text-[11px]" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: alpha(t.ink, 0.55) }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[34px] leading-none" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.6]" style={{ color: alpha(t.ink, 0.72) }}>
                            {project.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-3">
                        <span className="text-[11px]" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: alpha(t.ink, 0.6) }}>
                          {project.date}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target={isExternal(project.link) ? "_blank" : undefined}
                            rel="noreferrer"
                            className="pb-1 text-[9px] uppercase"
                            style={{ borderBottom: `1px solid ${t.accent}`, fontFamily: f.mono, letterSpacing: "0.26em" }}
                          >
                            Read case study
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: alpha(t.ink, 0.55) }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <RuneGlyph color={t.accent} className="h-5 w-3.5" />
                      </div>
                      <h3 className="mt-5 text-[27px] leading-tight" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="mt-3 text-[16px] leading-[1.6]" style={{ color: alpha(t.ink, 0.72) }}>
                          {project.description}
                        </p>
                      )}
                      <div className="mt-6 flex items-center justify-between gap-4 border-t pt-4" style={{ borderColor: alpha(t.ink, 0.12) }}>
                        <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: alpha(t.ink, 0.6) }}>
                          {project.date}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target={isExternal(project.link) ? "_blank" : undefined}
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[9px] uppercase"
                            style={{ fontFamily: f.mono, letterSpacing: "0.26em" }}
                          >
                            Read case study <ArrowUpRight size={11} style={{ color: t.accent }} />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="relative overflow-hidden" style={{ background: t.dark, color: t.bg }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(75% 65% at 50% -10%, ${alpha(t.darkInk, 0.18)} 0%, ${alpha(t.darkInk, 0)} 68%)` }}
          />
          <div className="relative mx-auto max-w-[1180px] px-8 py-20">
            <div className="flex items-center justify-center gap-4">
              <span style={{ display: "block", height: 1, width: 64, background: gold(0.7) }} />
              <h2 className="text-[38px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
                Experience
              </h2>
              <span style={{ display: "block", height: 1, width: 64, background: gold(0.7) }} />
            </div>

            <div className="mt-12">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid items-baseline gap-3 py-7 md:grid-cols-[150px_1fr_24px] md:gap-8"
                  style={{ borderTop: `1px solid ${alpha(t.darkInk, 0.22)}` }}
                >
                  <span
                    className="text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: alpha(t.darkInk, 0.85) }}
                  >
                    {role.date}
                  </span>
                  <div>
                    <h3 className="text-[26px] leading-none" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                      {role.title}
                    </h3>
                    <p className="mt-2 text-[17px]" style={{ color: t.darkMuted }}>
                      {role.description}
                    </p>
                  </div>
                  <RuneGlyph color={alpha(t.accent, 0.8)} className="hidden h-4 w-3 md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(content.education.length > 0 || content.socials.length > 0) && (
        <section id="education" className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto max-w-[1180px] px-8 py-20">
            {content.education.length > 0 && (
              <>
                <div className="flex items-center gap-4">
                  <span style={{ display: "block", height: 1, width: 36, background: t.accent }} />
                  <h2 className="text-[34px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.08em" }}>
                    Education
                  </h2>
                  <span style={{ display: "block", height: 1, width: 36, background: t.accent }} />
                </div>
                <div className="mt-9 grid gap-5 md:grid-cols-2">
                  {content.education.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      data-tilt
                      className="relative border p-7 will-change-transform"
                      style={{ borderColor: alpha(t.accent, 0.4), background: t.surface }}
                    >
                      <RuneGlyph color={alpha(t.accent, 0.8)} className="absolute right-5 top-5 h-4 w-3" />
                      <span
                        className="text-[10px] uppercase"
                        style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.muted }}
                      >
                        {item.date}
                      </span>
                      <h3 className="mt-3 text-[21px] leading-tight" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[16px]" style={{ color: alpha(t.ink, 0.7) }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {content.socials.length > 0 && (
              <div id="elsewhere" className="mt-12 border-y" style={{ borderColor: alpha(t.accent, 0.4) }}>
                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-1 py-5">
                  <h2 className="text-[22px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.14em" }}>
                    Elsewhere
                  </h2>
                  <div
                    className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: alpha(t.ink, 0.7) }}
                  >
                    {content.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target={isExternal(social.url) ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <footer style={{ background: t.dark }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-8 py-6">
          <span
            className="text-[10px] uppercase"
            style={{ fontFamily: f.display, letterSpacing: "0.38em", color: alpha(t.bg, 0.85) }}
          >
            {content.name}
          </span>
          <a href="#top" className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.darkInk }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
