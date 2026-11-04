import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/** Weathered timber: horizontal grain lines on a band. */
const TIMBER = (color: string) =>
  `repeating-linear-gradient(180deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 8px)`;

/**
 * Longship — a longhouse of stacked bands. Ported from the canvas page
 * `var_1204b51b367c`; motion `tilt` leans the six rune cells and the three
 * timber plates.
 */
export default function LongshipLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.15);
  const reads = [
    { label: "Projects", value: content.projects.length },
    { label: "Skills", value: content.skills.length },
    { label: "Roles", value: content.experience.length },
    { label: "Study", value: content.education.length },
  ];

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-40 border-b" style={{ borderColor: alpha(t.ink, 0.2), background: t.bg }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center border text-[13px]"
              style={{ borderColor: alpha(t.ink, 0.4), background: t.surface, fontFamily: f.display }}
            >
              {content.initial}
            </span>
            <span className="text-[15px] font-semibold" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: alpha(t.ink, 0.7) }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          {content.socials.length > 0 && (
            <a
              href={content.socials[content.socials.length - 1].url}
              target={isExternal(content.socials[content.socials.length - 1].url) ? "_blank" : undefined}
              rel="noreferrer"
              className="border px-4 py-2 text-[10px] uppercase"
              style={{ borderColor: t.accent, color: t.accent, fontFamily: f.mono, letterSpacing: "0.22em" }}
            >
              {content.socials[content.socials.length - 1].label}
            </a>
          )}
        </div>
      </header>

      <section id="top">
        <div className="border-b" style={{ borderColor: line, background: t.surface, backgroundImage: TIMBER(alpha(t.ink, 0.055)) }}>
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-3 lg:px-8">
            <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.34em", color: alpha(t.ink, 0.7) }}>
              {content.role}
            </span>
            <div aria-hidden className="flex items-center gap-2">
              <span className="h-px w-10" style={{ background: alpha(t.ink, 0.25) }} />
              {[0, 1, 2].map((bead) => (
                <span key={bead} className="h-[7px] w-[7px] rotate-45 border" style={{ borderColor: t.accent }} />
              ))}
              <span className="h-px w-10" style={{ background: alpha(t.ink, 0.25) }} />
            </div>
          </div>
        </div>

        <div className="border-b" style={{ borderColor: line, background: t.bg }}>
          <div className="mx-auto flex max-w-[1180px] items-end justify-between gap-8 px-6 py-8 lg:px-8 lg:py-10">
            <h1
              className="text-[54px] sm:text-[76px] lg:text-[92px]"
              style={{ fontFamily: f.display, letterSpacing: "0.015em", lineHeight: 0.94 }}
            >
              {content.firstName}
            </h1>
            <div aria-hidden className="hidden items-end gap-3 sm:flex">
              <span className="block h-[46px] w-[6px]" style={{ background: t.accent }} />
              <span className="block h-[30px] w-[6px]" style={{ background: alpha(t.ink, 0.25) }} />
              <span className="block h-[16px] w-[6px]" style={{ background: alpha(t.ink, 0.15) }} />
            </div>
          </div>
        </div>

        <div className="border-b" style={{ borderColor: line, background: t.accent }}>
          <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 px-6 py-8 lg:flex-row lg:items-end lg:px-8 lg:py-10">
            <h2
              className="text-[54px] sm:text-[76px] lg:text-[92px]"
              style={{ fontFamily: f.display, letterSpacing: "0.015em", lineHeight: 0.94, color: t.accentInk }}
            >
              {content.lastName || "\u00A0"}
            </h2>
            {content.socials.length > 0 && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {content.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: alpha(t.accentInk, 0.9) }}
                  >
                    {social.label}
                    {isExternal(social.url) && <ArrowUpRight size={11} />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-b" style={{ borderColor: line, background: t.surface }}>
          <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-8">
            <p className="max-w-[74ch] text-[17px] leading-[1.75]" style={{ color: alpha(t.ink, 0.75) }}>
              {content.bio}
            </p>
          </div>
        </div>

        {content.skills.length > 0 && (
          <div style={{ background: t.dark }}>
            <div className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {content.skills.map((skill, index) => (
                <div
                  key={skill}
                  data-tilt
                  className="border-b border-r px-5 py-4 will-change-transform sm:border-b-0"
                  style={{ borderColor: alpha(t.darkMuted, 0.25) }}
                >
                  <span className="text-[9px]" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkInk }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-[13px] font-medium" style={{ color: t.bg }}>
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="about" className="border-b" style={{ borderColor: line, background: t.bg }}>
        <div className="mx-auto max-w-[1180px] px-6 py-12 lg:px-8">
          <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: line }}>
            <span className="h-[6px] w-[6px] rotate-45" style={{ background: t.accent }} />
            <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: alpha(t.ink, 0.7) }}>
              Summary
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {reads.map((read) => (
              <div key={read.label}>
                <p className="text-[36px]" style={{ fontFamily: f.display }}>
                  {String(read.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: alpha(t.ink, 0.6) }}>
                  {read.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" style={{ background: t.surface }}>
          <div className="mx-auto max-w-[1180px] px-6 py-16 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5" style={{ borderColor: alpha(t.ink, 0.25) }}>
              <div className="flex items-baseline gap-4">
                <h2 className="text-[24px] sm:text-[28px]" style={{ fontFamily: f.display }}>
                  Selected work
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.accent }}>
                  {String(content.projects.length).padStart(2, "0")}
                </span>
              </div>
              <div aria-hidden className="flex items-center gap-2">
                {[0, 1].map((bead) => (
                  <span key={bead} className="h-[6px] w-[6px] rotate-45 border" style={{ borderColor: alpha(t.ink, 0.3) }} />
                ))}
                <span className="h-[6px] w-[6px] rotate-45 border" style={{ borderColor: t.accent }} />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  data-tilt
                  className="border will-change-transform"
                  style={{ borderColor: alpha(t.ink, 0.2), background: t.bg }}
                >
                  <div className="grid gap-4 p-6 md:grid-cols-[86px_1fr_180px] md:items-center md:gap-8">
                    <span className="text-[36px] leading-none" style={{ fontFamily: f.display, color: t.accent }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[21px]" style={{ fontFamily: f.display }}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.65]" style={{ color: alpha(t.ink, 0.7) }}>
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-center">
                      <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: alpha(t.ink, 0.6) }}>
                        {project.date}
                      </span>
                      {project.link && (
                        <a
                          href={project.link}
                          target={isExternal(project.link) ? "_blank" : undefined}
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] uppercase"
                          style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.accent }}
                        >
                          Read case study <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark }}>
          <div className="mx-auto max-w-[1180px] px-6 py-16 lg:px-8">
            <div className="flex items-baseline gap-4 border-b pb-5" style={{ borderColor: alpha(t.darkMuted, 0.3) }}>
              <h2 className="text-[24px] sm:text-[28px]" style={{ fontFamily: f.display, color: t.bg }}>
                Experience
              </h2>
              <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
                {String(content.experience.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-10 border-l pl-8" style={{ borderColor: alpha(t.darkInk, 0.35) }}>
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="relative"
                  style={{ paddingBottom: index === content.experience.length - 1 ? 0 : "2.5rem" }}
                >
                  <span
                    aria-hidden
                    className="absolute h-[9px] w-[9px] rotate-45 border"
                    style={{ left: "-41px", top: "8px", borderColor: t.darkInk, background: t.dark }}
                  />
                  <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkInk }}>
                    {role.date}
                  </span>
                  <h3 className="mt-2 text-[19px]" style={{ fontFamily: f.display, color: t.bg }}>
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[14px]" style={{ color: t.darkMuted }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: t.bg }}>
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {content.education.length > 0 && (
            <div id="education">
              <div className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: alpha(t.ink, 0.2) }}>
                <h2 className="text-[20px]" style={{ fontFamily: f.display }}>
                  Education
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: alpha(t.ink, 0.6) }}>
                  {String(content.education.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 space-y-6">
                {content.education.map((item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[16px]" style={{ fontFamily: f.display }}>
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: alpha(t.ink, 0.6) }}>
                        {item.date}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px]" style={{ color: alpha(t.ink, 0.7) }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.socials.length > 0 && (
            <div id="elsewhere">
              <div className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: alpha(t.ink, 0.2) }}>
                <h2 className="text-[20px]" style={{ fontFamily: f.display }}>
                  Elsewhere
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: alpha(t.ink, 0.6) }}>
                  {String(content.socials.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6">
                {content.socials.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 py-3"
                    style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.15)}` }}
                  >
                    <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: alpha(t.ink, 0.6) }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-medium">{social.label}</span>
                    <ArrowUpRight size={12} style={{ color: t.accent }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: alpha(t.darkMuted, 0.3), background: t.dark }}>
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center border text-[11px]"
              style={{ borderColor: alpha(t.darkInk, 0.6), color: t.darkInk, fontFamily: f.display }}
            >
              {content.initial}
            </span>
            <span className="text-[13px]" style={{ fontFamily: f.display, color: t.bg }}>
              {content.name}
            </span>
            <span className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.darkMuted }}>
              {content.role}
            </span>
          </div>
          <a href="#top" className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkInk }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
