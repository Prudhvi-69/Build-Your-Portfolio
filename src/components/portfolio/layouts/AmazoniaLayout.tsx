import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** The small four-point crest that opens the hero and closes the footer. */
function Crest({ size, color }: { size: number; color: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ color }}>
      <path d="M24 3 L42 24 L24 45 L6 24 Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 13 L33 24 L24 35 L15 24 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 20 L27 24 L24 28 L21 24 Z" fill={color} stroke="none" />
    </svg>
  );
}

/** Split hairline rule the `runeDraw` mechanic completes on hover. */
function RuneRule({ color, width }: { color: string; width: number }) {
  return (
    <svg aria-hidden className="mt-3 block" width={width} height="8" viewBox="0 0 230 8" style={{ color }}>
      <path
        data-rune
        d="M0 4 H96 M112 4 H230"
        fill="none"
        stroke={color}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Amazonia — layered bronze frames around a centred crest. Ported from the
 * canvas page `var_11bbd5e66616`; motion `runeDraw` draws the split rule under
 * every section heading.
 */
export default function AmazoniaLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.12);
  const onDark = alpha(t.darkInk, 0.22);
  const years = [content.projects[0]?.date, content.projects[content.projects.length - 1]?.date]
    .filter(Boolean)
    .join(" — ");

  const heading = (label: string, ruleWidth: number, ruleColor: string) => (
    <div data-rune-host className="inline-block">
      <h2 className="text-[11px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.36em", color: t.muted }}>
        {label}
      </h2>
      <RuneRule color={ruleColor} width={ruleWidth} />
    </div>
  );

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b backdrop-blur-sm"
        style={{ borderColor: line, background: alpha(t.bg, 0.95) }}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative grid h-8 w-8 place-items-center border" style={{ borderColor: t.accent }}>
              <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.accent, letterSpacing: "0.04em" }}>
                {content.initial}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[3px] rotate-45 border"
                style={{ borderColor: alpha(t.accent, 0.35) }}
              />
            </span>
            <span className="text-[12px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.26em" }}>
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase lg:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
          >
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          <span
            className="hidden text-[10px] uppercase sm:block"
            style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}
          >
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <svg
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 opacity-[0.12]"
          width="640"
          height="540"
          viewBox="0 0 620 520"
          fill="none"
          style={{ color: t.accent }}
        >
          <g stroke="currentColor" strokeWidth="1.4">
            <path d="M310 40 L462 260 L310 480 L158 260 Z" />
            <path d="M310 104 L404 260 L310 416 L216 260 Z" />
            <path d="M310 168 L356 260 L310 352 L264 260 Z" />
            <path d="M150 260 H28 M170 186 H52 M170 334 H52 M470 186 H588 M470 334 H588 M490 260 H592" />
          </g>
        </svg>

        <div className="relative mx-auto max-w-[1180px]">
          <div className="border p-[6px]" style={{ borderColor: alpha(t.accent, 0.45) }}>
            <div className="border p-1" style={{ borderColor: alpha(t.ink, 0.18) }}>
              <div className="border px-5 py-11 md:px-12 md:py-14" style={{ borderColor: alpha(t.ink, 0.1) }}>
                <div className="flex items-center justify-center gap-4">
                  <span className="h-px w-10 md:w-20" style={{ background: alpha(t.accent, 0.35) }} />
                  <Crest size={34} color={t.accent} />
                  <span className="h-px flex-1" style={{ background: alpha(t.ink, 0.15) }} />
                  <span className="h-px flex-1" style={{ background: alpha(t.ink, 0.15) }} />
                  <span className="h-px w-10 md:w-20" style={{ background: alpha(t.accent, 0.35) }} />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-6">
                    <div
                      className="flex items-center gap-3 text-[10px] uppercase"
                      style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.accent }}
                    >
                      <span aria-hidden className="inline-block h-[6px] w-[6px] rotate-45" style={{ background: t.accent }} />
                      <span>{content.role}</span>
                    </div>
                    <h1
                      className="mt-6 text-[62px] leading-[0.9] md:text-[104px]"
                      style={{ fontFamily: f.display, letterSpacing: "0.01em" }}
                    >
                      <span className="block">{content.firstName}</span>
                      <span className="block" style={{ color: t.accent }}>
                        {content.lastName || "\u00A0"}
                      </span>
                    </h1>
                    <div className="mt-7 h-px w-24" style={{ background: t.accent }} />
                  </div>
                  <div className="md:col-span-5 md:col-start-8 md:border-l md:pl-9" style={{ borderColor: line }}>
                    <p className="text-[19px] leading-[1.72] md:text-[21px]" style={{ color: alpha(t.ink, 0.8) }}>
                      {content.bio}
                    </p>
                  </div>
                </div>

                {content.socials.length > 0 && (
                  <div
                    className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6 md:mt-12"
                    style={{ borderColor: line }}
                  >
                    {content.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target={isExternal(social.url) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2.5 text-[10px] uppercase"
                        style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: alpha(t.ink, 0.75) }}
                      >
                        <span aria-hidden className="inline-block h-[5px] w-[5px] rotate-45 border" style={{ borderColor: t.accent }} />
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.skills.length > 0 && (
        <section id="skills" className="px-5 pb-14 md:px-10 md:pb-20">
          <div className="mx-auto max-w-[1180px] border-t pt-12 md:pt-16" style={{ borderColor: alpha(t.ink, 0.15) }}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {heading("Skills", 230, t.accent)}
            </div>
            <ul
              className="mt-8 grid grid-cols-1 gap-px border sm:grid-cols-2 md:grid-cols-3"
              style={{ borderColor: alpha(t.ink, 0.1), background: alpha(t.ink, 0.1) }}
            >
              {content.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-4 px-6 py-7" style={{ background: t.bg }}>
                  <span aria-hidden className="inline-block h-[7px] w-[7px] rotate-45 border" style={{ borderColor: t.accent }} />
                  <span className="text-[14px]" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.projects.length > 0 && (
        <section id="work" className="px-5 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {heading("Selected work", 290, t.accent)}
              <p className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}>
                {years}
              </p>
            </div>
            <ol className="mt-10 border-t" style={{ borderColor: line }}>
              {content.projects.map((project, index) => (
                <li
                  key={`${project.title}-${index}`}
                  className="group grid grid-cols-1 items-start gap-4 border-b px-3 py-8 hover:bg-[color:var(--plate)] md:grid-cols-12 md:gap-6 md:px-6 md:py-10"
                  style={{ borderColor: line, ["--plate" as string]: t.surface }}
                >
                  <div className="md:col-span-3">
                    <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                      {project.date}
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-[25px] leading-[1.15] md:text-[31px]" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-3 max-w-[56ch] text-[17px] leading-[1.65] md:text-[18px]" style={{ color: alpha(t.ink, 0.75) }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-3 inline-block text-[10px] uppercase"
                        style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.accent }}
                      >
                        Read case study
                      </a>
                    )}
                  </div>
                  <div className="flex md:col-span-1 md:justify-end">
                    <span
                      aria-hidden
                      className="block h-px w-10 transition-colors group-hover:bg-[color:var(--plate-rule)] md:mt-3 md:h-10 md:w-px"
                      style={{ background: alpha(t.ink, 0.25), ["--plate-rule" as string]: t.accent }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="px-5 py-16 md:px-10 md:py-24" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {heading("Experience", 250, t.darkInk)}
              <p className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.darkMuted }}>
                {[content.experience[content.experience.length - 1]?.date, content.experience[0]?.date]
                  .filter(Boolean)
                  .join(" — ")}
              </p>
            </div>
            <ol className="mt-10">
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="grid grid-cols-1 gap-2 py-7 md:grid-cols-12 md:items-baseline"
                  style={{
                    borderTop: `1px solid ${onDark}`,
                    borderBottom:
                      index === content.experience.length - 1 ? `1px solid ${onDark}` : undefined,
                  }}
                >
                  <span
                    className="text-[11px] uppercase md:col-span-3"
                    style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkMuted }}
                  >
                    {role.date}
                  </span>
                  <h3 className="text-[21px] leading-tight md:col-span-6 md:text-[25px]" style={{ fontFamily: f.display }}>
                    {role.description || role.title}
                  </h3>
                  <p className="text-[16px] md:col-span-3 md:text-right" style={{ letterSpacing: "0.04em", color: t.darkMuted }}>
                    {role.description ? role.title : ""}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {content.education.length > 0 && (
            <div id="education">
              {heading("Education", 210, t.accent)}
              <ol className="mt-8 space-y-8">
                {content.education.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="border-l pl-5" style={{ borderColor: alpha(t.accent, 0.45) }}>
                    <span
                      className="text-[10px] uppercase"
                      style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}
                    >
                      {item.date}
                    </span>
                    <h3 className="mt-2 text-[19px] leading-snug" style={{ fontFamily: f.display }}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[17px]" style={{ color: alpha(t.ink, 0.7) }}>
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {content.socials.length > 0 && (
            <div id="elsewhere">
              {heading("Elsewhere", 210, t.accent)}
              <ul className="mt-8 border-t" style={{ borderColor: line }}>
                {content.socials.map((social) => (
                  <li key={social.label} className="border-b" style={{ borderColor: line }}>
                    <a
                      href={social.url}
                      target={isExternal(social.url) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between py-5 hover:text-[color:var(--link)]"
                      style={{ ["--link" as string]: t.accent }}
                    >
                      <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}>
                        {social.label}
                      </span>
                      <span
                        aria-hidden
                        className="block h-px w-8 transition-colors group-hover:bg-[color:var(--plate-rule)]"
                        style={{ background: alpha(t.ink, 0.3), ["--plate-rule" as string]: t.accent }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t px-5 py-10 md:px-10" style={{ borderColor: alpha(t.ink, 0.15), background: t.surface }}>
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Crest size={26} color={t.accent} />
            <span className="text-[12px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.26em" }}>
              {content.name}
            </span>
          </div>
          <a
            href="#top"
            className="text-[10px] uppercase"
            style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
          >
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
