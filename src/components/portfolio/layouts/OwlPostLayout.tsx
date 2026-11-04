import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** Hand-drawn quill rule the `runeDraw` mechanic completes on hover / focus. */
function Quill({ color }: { color: string }) {
  return (
    <svg aria-hidden className="mt-3 h-[7px] w-[236px]" viewBox="0 0 240 7" preserveAspectRatio="none">
      <path
        data-rune
        d="M1 4 C 34 1.4, 68 6.2, 104 4 S 176 1.2, 239 4.2"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Owl Post — a parchment letter. Ported from the canvas page
 * `var_e34fda6ffc14`; motion `runeDraw` completes the quill rule under each
 * section heading, and the wax seal anchors the skills sheet in the hero.
 */
export default function OwlPostLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.12);
  const rule = alpha(t.ink, 0.16);
  const paper = `radial-gradient(circle at 14% 6%, ${alpha(t.accent, 0.055)}, transparent 42%), radial-gradient(circle at 88% 74%, ${alpha(t.darkInk, 0.13)}, transparent 46%)`;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-30 border-b" style={{ borderColor: line, background: alpha(t.bg, 0.95) }}>
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-semibold"
              style={{ background: t.accent, color: t.accentInk, fontFamily: f.display, letterSpacing: "0.06em" }}
            >
              {content.initial}
            </span>
            <span
              className="hidden text-[12px] font-semibold uppercase sm:block"
              style={{ fontFamily: f.display, letterSpacing: "0.22em" }}
            >
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          {content.socials.length > 0 && (
            <a
              href={content.socials[0].url}
              target={isExternal(content.socials[0].url) ? "_blank" : undefined}
              rel="noreferrer"
              className="border px-3 py-1.5 text-[10px] uppercase"
              style={{ borderColor: alpha(t.accent, 0.5), color: t.accent, fontFamily: f.mono, letterSpacing: "0.2em" }}
            >
              {content.socials[0].label}
            </a>
          )}
        </div>
      </header>

      <section id="top" className="border-b" style={{ borderColor: line, backgroundImage: paper }}>
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-14 px-6 py-16 lg:grid-cols-[1fr_400px] lg:gap-16 lg:py-20">
          <div className="max-w-[560px]">
            <div
              className="flex items-center gap-3 text-[10px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.accent }}
            >
              <span className="h-px w-9" style={{ background: alpha(t.accent, 0.6) }} />
              {content.role}
            </div>
            <h1
              className="mt-6 text-[52px] font-semibold uppercase leading-[0.94] sm:text-[66px]"
              style={{ fontFamily: f.display, letterSpacing: "0.015em" }}
            >
              {content.firstName}
              <span className="block" style={{ color: t.accent }}>
                {content.lastName || "\u00A0"}
              </span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.72]" style={{ color: alpha(t.ink, 0.8) }}>
              {content.bio}
            </p>
            {content.socials.length > 0 && (
              <div
                className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] uppercase"
                style={{ fontFamily: f.mono, letterSpacing: "0.2em" }}
              >
                {content.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                    style={{ color: isExternal(social.url) ? t.ink : t.accent }}
                  >
                    {social.label}
                    {isExternal(social.url) && <ArrowUpRight size={12} />}
                  </a>
                ))}
              </div>
            )}
          </div>

          {content.skills.length > 0 && (
            <div className="relative mx-auto w-full max-w-[400px]">
              <div
                aria-hidden
                className="absolute inset-x-5 -bottom-3 h-full rounded-[2px] border"
                style={{ borderColor: line, background: alpha(t.surface, 0.7) }}
              />
              <div className="relative border" style={{ borderColor: alpha(t.ink, 0.2), background: t.surface }}>
                <div
                  className="relative h-[92px] border-b"
                  style={{ borderColor: alpha(t.ink, 0.15), background: alpha(t.bg, 0.55) }}
                >
                  <svg aria-hidden className="h-full w-full" viewBox="0 0 420 92" preserveAspectRatio="none">
                    <path
                      d="M0 0 L210 84 L420 0"
                      fill={alpha(t.ink, 0.045)}
                      stroke={alpha(t.ink, 0.16)}
                      strokeWidth="1"
                    />
                  </svg>
                  <span
                    className="absolute left-1/2 top-[86px] grid h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px]"
                    style={{
                      background: t.accent,
                      color: t.accentInk,
                      fontFamily: f.display,
                      letterSpacing: "0.06em",
                      boxShadow: `0 0 0 1px ${alpha(t.accent, 0.42)}, inset 0 0 0 6px ${alpha(t.bg, 0.18)}, inset 0 0 0 7px ${alpha(t.bg, 0.32)}`,
                    }}
                  >
                    {content.initial}
                  </span>
                </div>
                <div className="px-7 pb-7 pt-12">
                  <p className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.muted }}>
                    Skills
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6">
                    {content.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border-b py-2.5 text-[12.5px]"
                        style={{ fontFamily: f.display, letterSpacing: "0.03em", borderColor: alpha(t.ink, 0.1) }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="border-b" style={{ borderColor: line }}>
          <div className="mx-auto max-w-[1180px] px-6 py-16">
            <div data-rune-host className="inline-block">
              <h2 className="text-[12px] font-semibold uppercase" style={{ fontFamily: f.display, letterSpacing: "0.34em" }}>
                Selected work
              </h2>
              <Quill color={t.accent} />
            </div>
            <ol className="mt-10">
              {content.projects.map((project, index) => (
                <li
                  key={`${project.title}-${index}`}
                  className="grid grid-cols-1 gap-x-10 gap-y-3 py-8 sm:grid-cols-[1fr_104px]"
                  style={{ borderTop: `1px solid ${rule}` }}
                >
                  <div>
                    <h3 className="text-[26px] font-medium" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 max-w-[62ch] text-[16px] leading-[1.66]" style={{ color: t.muted }}>
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="flex items-baseline justify-between gap-3 text-[10px] uppercase sm:flex-col sm:items-end sm:gap-2"
                    style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}
                  >
                    <span>{project.date}</span>
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="underline underline-offset-4"
                        style={{ color: t.accent }}
                      >
                        Case study
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.bg }}>
          <div className="mx-auto max-w-[1180px] px-6 py-16">
            <div data-rune-host className="inline-block">
              <h2
                className="text-[12px] font-semibold uppercase"
                style={{ fontFamily: f.display, letterSpacing: "0.34em", color: t.darkInk }}
              >
                Experience
              </h2>
              <Quill color={t.darkInk} />
            </div>
            <ul className="mt-9">
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="flex flex-wrap items-baseline justify-between gap-4 py-6"
                  style={{ borderTop: `1px solid ${alpha(t.bg, 0.15)}` }}
                >
                  <div>
                    <p className="text-[21px]" style={{ fontFamily: f.display, letterSpacing: "0.03em", color: t.bg }}>
                      {role.title}
                    </p>
                    <p className="mt-1 text-[15px]" style={{ color: t.darkMuted }}>
                      {role.description}
                    </p>
                  </div>
                  <span
                    className="border border-dashed px-2.5 py-1 text-[10px] uppercase"
                    style={{ borderColor: alpha(t.darkInk, 0.45), color: t.darkInk, fontFamily: f.mono, letterSpacing: "0.16em" }}
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
        <section id="education" style={{ borderBottom: `1px solid ${line}` }}>
          <div className="mx-auto max-w-[1180px] px-6 py-16">
            <div data-rune-host className="inline-block">
              <h2 className="text-[12px] font-semibold uppercase" style={{ fontFamily: f.display, letterSpacing: "0.34em" }}>
                Education
              </h2>
              <Quill color={t.accent} />
            </div>
            <div className="mt-9 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {content.education.map((item, index) => (
                <div key={`${item.title}-${index}`} className="pt-4" style={{ borderTop: `1px solid ${alpha(t.ink, 0.25)}` }}>
                  <p className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
                    {item.date}
                  </p>
                  <p className="mt-2 text-[19px]" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                    {item.title}
                  </p>
                  <p className="text-[15px]" style={{ color: t.muted }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.socials.length > 0 && (
        <section id="elsewhere" style={{ backgroundImage: paper }}>
          <div className="mx-auto max-w-[1180px] px-6 py-14">
            <div data-rune-host className="inline-block">
              <h2 className="text-[12px] font-semibold uppercase" style={{ fontFamily: f.display, letterSpacing: "0.34em" }}>
                Elsewhere
              </h2>
              <Quill color={t.accent} />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] uppercase"
                  style={{
                    fontFamily: f.mono,
                    letterSpacing: "0.2em",
                    color: isExternal(social.url) ? t.ink : t.accent,
                  }}
                >
                  {social.label}
                  {isExternal(social.url) && <ArrowUpRight size={12} />}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t" style={{ borderColor: line, background: t.surface }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-7">
          <span className="text-[11px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.24em" }}>
            {content.name}
          </span>
          <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
            {content.role}
          </span>
        </div>
      </footer>
    </div>
  );
}
