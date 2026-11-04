import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

const CHAMFER = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))";
const CHAMFER_SM = "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))";

/**
 * Emerald Oath — a dark construct shell with glowing rings and energy plates.
 * Ported from the canvas page `var_cc8eaf62eb5e`; motion `magnet` leans the six
 * skill cells and the three case-study plates.
 */
export default function EmeraldOathLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const onLight = t.ink;
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
      style={{ background: t.bg, color: onLight, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-40 border-b" style={{ borderColor: alpha(t.accent, 0.25), background: t.dark }}>
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-5 px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center border text-[11px] font-medium"
              style={{
                clipPath: CHAMFER_SM,
                borderColor: alpha(t.accent, 0.55),
                background: alpha(t.accent, 0.1),
                color: t.darkInk,
                fontFamily: f.mono,
                letterSpacing: "0.1em",
              }}
            >
              {content.initial}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold" style={{ color: t.bg, letterSpacing: "-0.01em" }}>
                {content.name}
              </span>
              <span className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.darkMuted }}>
                {content.role}
              </span>
            </span>
          </a>
          <nav
            aria-label="Sections"
            className="hidden items-center gap-8 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.darkMuted }}
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
              className="px-4 py-2 text-[10px] font-medium uppercase"
              style={{
                clipPath: CHAMFER_SM,
                background: t.accent,
                color: t.accentInk,
                fontFamily: f.mono,
                letterSpacing: "0.2em",
              }}
            >
              {content.socials[content.socials.length - 1].label}
            </a>
          )}
        </div>
      </header>

      <section id="top" className="relative overflow-hidden" style={{ background: t.dark, color: t.bg }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `linear-gradient(${alpha(t.accent, 0.075)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(
              t.accent,
              0.075
            )} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: alpha(t.accent, 0.1) }}
        />

        <div className="relative mx-auto max-w-[1160px] px-5 pb-14 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:gap-10">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-[6px] w-[6px]" style={{ background: t.accent }} />
                <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.34em", color: t.darkInk }}>
                  {content.role}
                </span>
              </div>
              <h1
                className="mt-6 text-[50px] sm:text-[68px] lg:text-[82px]"
                style={{ fontFamily: f.display, letterSpacing: "-0.042em", lineHeight: 0.86 }}
              >
                <span className="block">{content.firstName}</span>
                <span className="block" style={{ color: t.accent }}>
                  {content.lastName || "\u00A0"}
                </span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-[15px] leading-[1.72]" style={{ color: t.darkMuted }}>
                {content.bio}
              </p>
              {content.socials.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {content.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target={isExternal(social.url) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-2 border px-3 py-2 text-[10px] uppercase"
                      style={{
                        clipPath: CHAMFER_SM,
                        borderColor: alpha(t.accent, 0.3),
                        background: alpha(t.accent, 0.06),
                        color: t.bg,
                        fontFamily: f.mono,
                        letterSpacing: "0.18em",
                      }}
                    >
                      {social.label}
                      <ArrowUpRight size={11} style={{ color: t.darkInk }} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mx-auto w-full max-w-[352px]">
              <div
                className="relative border bg-black/30 p-5"
                style={{ clipPath: CHAMFER, borderColor: alpha(t.accent, 0.3) }}
              >
                <div className="relative flex items-center justify-center">
                  <svg
                    aria-hidden
                    className="h-[280px] w-[280px]"
                    viewBox="0 0 320 320"
                    style={{ filter: `drop-shadow(0 0 26px ${alpha(t.accent, 0.36)})` }}
                  >
                    <defs>
                      <radialGradient id="eoCore" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={t.accent} stopOpacity="0.42" />
                        <stop offset="62%" stopColor={t.accent} stopOpacity="0.07" />
                        <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="160" cy="160" r="152" fill="url(#eoCore)" />
                    <circle cx="160" cy="160" r="146" fill="none" stroke={t.accent} strokeOpacity="0.2" />
                    <g data-construct-spin>
                      <circle
                        cx="160"
                        cy="160"
                        r="124"
                        fill="none"
                        stroke={t.accent}
                        strokeDasharray="2 10"
                        strokeOpacity="0.48"
                      />
                      <circle cx="160" cy="28" r="3" fill={t.darkInk} />
                    </g>
                    <circle cx="160" cy="160" r="94" fill="none" stroke={t.accent} strokeOpacity="0.26" />
                    <path d="M160 14 A146 146 0 0 1 262 84" fill="none" stroke={t.darkInk} strokeOpacity="0.8" strokeWidth="2" />
                    <path d="M160 306 A146 146 0 0 1 58 236" fill="none" stroke={t.darkInk} strokeOpacity="0.45" strokeWidth="2" />
                    <line x1="160" x2="160" y1="14" y2="40" stroke={t.darkInk} strokeWidth="1.5" />
                    <line x1="160" x2="160" y1="280" y2="306" stroke={t.darkInk} strokeOpacity="0.6" strokeWidth="1.5" />
                    <line x1="14" x2="40" y1="160" y2="160" stroke={t.darkInk} strokeOpacity="0.6" strokeWidth="1.5" />
                    <line x1="280" x2="306" y1="160" y2="160" stroke={t.darkInk} strokeOpacity="0.6" strokeWidth="1.5" />
                    <circle cx="160" cy="160" r="56" fill={t.dark} stroke={t.accent} strokeOpacity="0.62" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[26px]" style={{ fontFamily: f.display, letterSpacing: "-0.03em", color: t.darkInk }}>
                      {content.initial}
                    </span>
                    <span className="mt-2 text-[8px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.darkMuted }}>
                      Portfolio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {content.skills.length > 0 && (
          <div className="relative border-t" style={{ borderColor: alpha(t.accent, 0.2) }}>
            <div className="mx-auto grid max-w-[1160px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {content.skills.map((skill, index) => (
                <div
                  key={skill}
                  data-magnet
                  className="border-b border-r px-5 py-4 will-change-transform sm:border-b-0"
                  style={{ borderColor: alpha(t.accent, 0.15) }}
                >
                  <span className="text-[9px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
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

      <section className="border-b" style={{ borderColor: alpha(t.ink, 0.1), background: t.bg }}>
        <div className="mx-auto max-w-[1160px] px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: t.accent }} />
              <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.muted }}>
                Summary
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4">
              {reads.map((read) => (
                <div key={read.label}>
                  <p className="text-[38px]" style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}>
                    {String(read.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.muted }}>
                    {read.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" style={{ background: t.dark, color: t.bg }}>
          <div className="mx-auto max-w-[1160px] px-5 py-16 lg:px-8">
            <div className="flex items-end justify-between gap-6 border-b pb-5" style={{ borderColor: alpha(t.accent, 0.25) }}>
              <div className="flex items-baseline gap-4">
                <h2 className="text-[26px] sm:text-[30px]" style={{ fontFamily: f.display, letterSpacing: "-0.04em" }}>
                  Selected work
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
                  {String(content.projects.length).padStart(2, "0")}
                </span>
              </div>
              <span className="hidden text-[10px] uppercase sm:block" style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.darkMuted }}>
                Case studies
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  data-magnet
                  className="flex flex-col border p-6 will-change-transform hover:border-[color:var(--eo-accent)] hover:bg-[color:var(--eo-tint)]"
                  style={{
                    clipPath: CHAMFER,
                    borderColor: alpha(t.accent, 0.25),
                    background: alpha(t.accent, 0.04),
                    ["--eo-accent" as string]: alpha(t.accent, 0.6),
                    ["--eo-tint" as string]: alpha(t.accent, 0.09),
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.darkMuted }}>
                      {project.date}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-semibold leading-snug" style={{ color: t.bg }}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-3 flex-1 text-[13px] leading-[1.7]" style={{ color: t.darkMuted }}>
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-6 flex items-center justify-between border-t pt-4 text-[10px] uppercase"
                      style={{
                        borderColor: alpha(t.accent, 0.2),
                        color: t.darkInk,
                        fontFamily: f.mono,
                        letterSpacing: "0.18em",
                      }}
                    >
                      Read case study <ArrowUpRight size={11} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="border-t" style={{ borderColor: alpha(t.accent, 0.2), background: t.dark, color: t.bg }}>
          <div className="mx-auto max-w-[1160px] px-5 py-16 lg:px-8">
            <div className="flex items-baseline gap-4 border-b pb-5" style={{ borderColor: alpha(t.accent, 0.25) }}>
              <h2 className="text-[26px] sm:text-[30px]" style={{ fontFamily: f.display, letterSpacing: "-0.04em" }}>
                Experience
              </h2>
              <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
                {String(content.experience.length).padStart(2, "0")}
              </span>
            </div>
            <div>
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid gap-2 py-6 md:grid-cols-[190px_1fr] md:items-baseline md:gap-8"
                  style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.accent, 0.12)}` }}
                >
                  <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.darkInk }}>
                    {role.date}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold" style={{ color: t.bg }}>
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[13px]" style={{ color: t.darkMuted }}>
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="education" style={{ background: t.bg }}>
        <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {content.education.length > 0 && (
            <div>
              <div className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: alpha(t.ink, 0.15) }}>
                <h2 className="text-[22px]" style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}>
                  Education
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
                  {String(content.education.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 space-y-6">
                {content.education.map((item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[16px] font-semibold">{item.title}</h3>
                      <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
                        {item.date}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.socials.length > 0 && (
            <div id="elsewhere">
              <div className="flex items-baseline gap-4 border-b pb-4" style={{ borderColor: alpha(t.ink, 0.15) }}>
                <h2 className="text-[22px]" style={{ fontFamily: f.display, letterSpacing: "-0.03em" }}>
                  Elsewhere
                </h2>
                <span className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.2em", color: t.muted }}>
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
                    className="flex items-center justify-between gap-4 py-3"
                    style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.1)}` }}
                  >
                    <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-medium">{social.label}</span>
                    <ArrowUpRight size={13} style={{ color: t.accent }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: alpha(t.accent, 0.25), background: t.dark }}>
        <div className="mx-auto flex max-w-[1160px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center border text-[10px]"
              style={{
                clipPath: CHAMFER_SM,
                borderColor: alpha(t.accent, 0.5),
                background: alpha(t.accent, 0.1),
                color: t.darkInk,
                fontFamily: f.mono,
              }}
            >
              {content.initial}
            </span>
            <span className="text-[13px]" style={{ color: t.bg }}>
              {content.name}
            </span>
            <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.darkMuted }}>
              {content.role}
            </span>
          </div>
          <a href="#top" className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.darkInk }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
