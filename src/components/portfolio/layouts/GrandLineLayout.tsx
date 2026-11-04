import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

/* Poster edge: the hero and the featured plunder card are cut on a soft angle. */
const POSTER = "polygon(0 2%, 97% 0, 100% 97%, 3% 100%)";

const WAVE_PATH = "M0 46 C240 8, 430 82, 720 46 C1010 10, 1200 78, 1440 40";

/**
 * Grand Line — full-bleed poster hero over a log book. Ported from the canvas
 * page `var_c72da1816899`; motion `magnet` leans each plunder card and skill chip.
 */
export default function GrandLineLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.14);
  const onDark = alpha(t.darkInk, 0.16);

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-30" style={{ background: t.dark, borderBottom: `1px solid ${alpha(t.darkInk, 0.15)}` }}>
        <div className="mx-auto flex h-[62px] max-w-[1180px] items-center justify-between px-7">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold"
              style={{ border: `1px solid ${t.accent}`, color: t.accent }}
            >
              {content.initial}
            </span>
            <span className="text-[15px] font-semibold" style={{ color: t.darkInk }}>
              {content.name}
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[10px] uppercase md:flex" style={{ letterSpacing: "0.22em", color: t.darkMuted }}>
            <a href="#work">Plunder</a>
            <a href="#experience">Log</a>
            <a href="#education">Harbour</a>
            <a href="#elsewhere">Signals</a>
          </nav>
          <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.6) }}>
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(60% 50% at 18% 8%, ${alpha(t.accent, 0.3)}, transparent 68%), radial-gradient(45% 40% at 86% 96%, ${alpha(t.darkMuted, 0.22)}, transparent 72%)`,
          }}
        />
        <svg aria-hidden className="pointer-events-none absolute right-8 top-10 hidden h-[190px] w-[190px] opacity-40 md:block" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="86" fill="none" stroke={t.accent} strokeWidth="1" />
          <circle cx="100" cy="100" r="52" fill="none" stroke={alpha(t.darkInk, 0.4)} strokeWidth="1" />
          <path d="M100 6 V194 M6 100 H194" stroke={alpha(t.darkInk, 0.28)} strokeWidth="1" />
          <path d="M100 60 L112 100 L100 140 L88 100 Z" fill={alpha(t.accent, 0.5)} />
        </svg>

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1180px] flex-col justify-center px-7 pb-16 pt-12">
          <p className="text-[10px] uppercase" style={{ letterSpacing: "0.4em", color: alpha(t.darkInk, 0.62) }}>
            {content.role}
          </p>
          <h1
            className="mt-5"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(4rem, 13vw, 9.2rem)",
              lineHeight: 0.78,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
            }}
          >
            {content.firstName}
            <br />
            <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <p className="max-w-[44ch] text-[15px] leading-[1.85]" style={{ color: alpha(t.darkInk, 0.75) }}>
              {content.bio}
            </p>
            {content.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span
                    key={skill}
                    data-magnet
                    className="will-change-transform px-3 py-1.5 text-[10px]"
                    style={{ border: `1px solid ${alpha(t.darkInk, 0.24)}`, borderRadius: 999 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {content.socials.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5 text-[10px] uppercase" style={{ letterSpacing: "0.2em", borderColor: onDark, color: alpha(t.darkInk, 0.72) }}>
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  {social.label} <ArrowUpRight size={11} style={{ color: t.accent }} />
                </a>
              ))}
            </div>
          )}
        </div>

        <svg aria-hidden className="relative block h-[70px] w-full" viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill={alpha(t.bg, 0.9)} />
          <path d={`${WAVE_PATH} V90 H0 Z`} fill={t.bg} />
        </svg>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1180px] px-7 py-14">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
            <h2 style={{ fontFamily: f.display, fontSize: 44, textTransform: "uppercase", letterSpacing: "0.02em" }}>Plunder</h2>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {String(content.projects.length).padStart(2, "0")} projects
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-start">
            {content.projects.map((project, index) => {
              const featured = index === 0;
              const onInk = index === 1;
              return (
                <article
                  key={`${project.title}-${index}`}
                  data-magnet
                  className={`flex flex-col justify-between p-8 will-change-transform ${featured ? "md:row-span-2 md:min-h-[380px]" : "min-h-[190px]"}`}
                  style={{
                    background: onInk ? t.dark : t.surface,
                    color: onInk ? t.darkInk : t.ink,
                    clipPath: POSTER,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", opacity: 0.7 }}>
                      {content.role}
                    </span>
                    <span className="text-[10px]" style={{ fontFamily: f.mono, opacity: 0.7 }}>
                      {project.date}
                    </span>
                  </div>
                  <div className="mt-10">
                    <h3
                      style={{
                        fontFamily: f.display,
                        fontSize: featured ? 62 : 34,
                        lineHeight: 0.86,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: onInk ? t.darkInk : t.ink,
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-3 max-w-[48ch] text-[13px] leading-[1.8]" style={{ opacity: 0.78 }}>
                        {project.description}
                      </p>
                    )}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 border-t pt-4 text-[10px] uppercase"
                      style={{ letterSpacing: "0.18em", borderColor: alpha(onInk ? t.darkInk : t.ink, 0.18), color: t.accent }}
                    >
                      Read case study <ArrowUpRight size={12} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1180px] px-7 py-14">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: alpha(t.darkInk, 0.18) }}>
              <h2 style={{ fontFamily: f.display, fontSize: 40, textTransform: "uppercase", letterSpacing: "0.02em" }}>Ship&apos;s log</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {String(content.experience.length).padStart(2, "0")} roles
              </span>
            </div>
            {content.experience.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="grid gap-1 py-5 md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: `1px solid ${alpha(t.darkInk, 0.1)}` }}
              >
                <span className="text-[19px] font-medium">{role.title}</span>
                <span className="text-[12.5px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                  {role.description}
                </span>
                <span className="text-[10px]" style={{ fontFamily: f.mono, color: alpha(t.darkInk, 0.6) }}>
                  {role.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1180px] gap-10 px-7 py-14 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 30, textTransform: "uppercase", letterSpacing: "0.02em" }}>Harbour</h2>
            <div className="mt-4" style={{ borderTop: `1px solid ${line}` }}>
              {content.education.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex items-baseline justify-between gap-4 py-3.5" style={{ borderBottom: `1px solid ${line}` }}>
                  <div>
                    <p className="text-[14px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[12px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.muted }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <h2 style={{ fontFamily: f.display, fontSize: 30, textTransform: "uppercase", letterSpacing: "0.02em" }}>Signals</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 px-4 py-3 text-[11px] font-semibold capitalize"
                    style={{ border: `1px solid ${line}`, color: t.ink }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={12} style={{ color: t.muted }} />
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer style={{ borderTop: `1px solid ${line}` }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
