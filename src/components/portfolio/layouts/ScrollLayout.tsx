import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

export default function ScrollLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.16);
  const hair = alpha(t.ink, 0.1);
  const insetLine = alpha(t.darkInk, 0.22);
  const [lead, ...rest] = content.projects;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: line, background: alpha(t.bg, 0.92) }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center text-[12px] font-semibold"
              style={{ background: t.accent, color: t.accentInk, borderRadius: 2 }}
            >
              {content.initial}
            </span>
            <span className="text-[14px] font-semibold tracking-[0.02em]">{content.name}</span>
          </a>
          <nav className="hidden items-center gap-7 text-[10px] uppercase md:flex" style={{ letterSpacing: "0.2em", color: t.muted }}>
            {content.projects.length > 0 && <a href="#work">Work</a>}
            {content.experience.length > 0 && <a href="#experience">Experience</a>}
            {content.education.length > 0 && <a href="#education">Education</a>}
            {content.socials.length > 0 && <a href="#elsewhere">Elsewhere</a>}
          </nav>
          <span className="flex items-center gap-2 text-[9px] uppercase" style={{ letterSpacing: "0.18em", color: t.muted }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
            Portfolio
          </span>
        </div>
      </header>

      <section id="top" data-ink-host className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(38% 34% at 24% 16%, ${alpha(t.accent, 0.16)}, transparent 72%), radial-gradient(30% 28% at 78% 82%, ${alpha(t.darkInk, 0.07)}, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: `radial-gradient(${t.darkInk} 0.6px, transparent 0.6px)`,
            backgroundSize: "7px 7px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1180px] gap-12 px-6 pb-14 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-end md:pb-16 md:pt-24">
          <div>
            <p className="text-[10px] uppercase" style={{ letterSpacing: "0.32em", color: alpha(t.darkInk, 0.6) }}>
              {content.role}
            </p>
            <h1
              className="mt-6"
              style={{
                fontFamily: f.display,
                fontSize: "clamp(3.1rem, 7.6vw, 6.6rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                fontWeight: 800,
              }}
            >
              {content.firstName}
              {content.lastName ? (
                <>
                  <br />
                  {content.lastName}
                </>
              ) : null}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                data-seal
                aria-pressed="false"
                aria-label="Mark this portfolio as reviewed"
                className="grid h-[74px] w-[74px] shrink-0 place-items-center text-[13px] font-semibold transition-[box-shadow,background] duration-300"
                style={{
                  background: t.accent,
                  color: t.accentInk,
                  borderRadius: 2,
                  boxShadow: `0 0 0 0 ${alpha(t.darkInk, 0)}`,
                  fontFamily: f.display,
                }}
              >
                {content.initial}
              </button>
              <div className="max-w-[34ch]">
                <p className="text-[15px] leading-[1.85]" style={{ color: alpha(t.darkInk, 0.74) }}>
                  {content.bio || "A portfolio in progress."}
                </p>
              </div>
            </div>
            {content.skills.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1.5 text-[10px]"
                    style={{ border: `1px solid ${alpha(t.darkInk, 0.26)}`, color: alpha(t.darkInk, 0.9), borderRadius: 2 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-end justify-end gap-5">
            <div
              className="relative h-[260px] w-[210px] shrink-0 overflow-hidden md:h-[320px] md:w-[260px]"
              style={{ boxShadow: `inset 0 0 0 1px ${alpha(t.darkInk, 0.3)}`, borderRadius: 2 }}
            >
              {content.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={content.avatarUrl} alt={`Portrait of ${content.name}`} className="h-full w-full object-cover" />
              ) : (
                <div
                  className="grid h-full w-full place-items-center"
                  style={{ background: alpha(t.darkInk, 0.06), color: alpha(t.darkInk, 0.35), fontFamily: f.display, fontSize: 84 }}
                >
                  {content.initial}
                </div>
              )}
            </div>
            <a
              href="#work"
              className="mb-1 hidden items-center gap-2 text-[10px] uppercase md:flex"
              style={{ letterSpacing: "0.24em", color: alpha(t.darkInk, 0.6) }}
            >
              Work <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-6 py-14 md:py-20">
        {content.projects.length > 0 && (
          <section id="work">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
              <h2 style={{ fontFamily: f.display, fontSize: 34, lineHeight: 1, fontWeight: 700 }}>Selected work</h2>
              <span className="text-[10px]" style={{ letterSpacing: "0.18em", color: t.muted }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {lead && (
                <article
                  className="grid gap-6 p-5 md:grid-cols-[1fr_320px] md:p-7"
                  style={{ background: t.surface, borderRadius: 2, boxShadow: `inset 0 0 0 1px ${hair}` }}
                >
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted }}>
                          {content.role}
                        </span>
                        {lead.date && (
                          <span className="text-[10px]" style={{ color: t.muted }}>
                            {lead.date}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4" style={{ fontFamily: f.display, fontSize: 34, lineHeight: 1.05, fontWeight: 700 }}>
                        {lead.title}
                      </h3>
                      {lead.description && (
                        <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.8]" style={{ color: t.muted }}>
                          {lead.description}
                        </p>
                      )}
                    </div>
                    {lead.link && (
                      <a
                        href={lead.link}
                        target={isExternal(lead.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase"
                        style={{ letterSpacing: "0.16em", color: t.accent }}
                      >
                        View project <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                  <div className="min-h-[180px] overflow-hidden" style={{ borderRadius: 1 }}>
                    {template.art.project ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={template.art.project} alt={`${lead.title} preview`} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="grid h-full place-items-center text-[11px] uppercase"
                        style={{ background: alpha(t.accent, 0.1), color: t.accent, letterSpacing: "0.22em" }}
                      >
                        {lead.title}
                      </div>
                    )}
                  </div>
                </article>
              )}

              {rest.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4"
                  style={{ borderColor: hair }}
                >
                  <div className="flex min-w-0 items-baseline gap-4">
                    <span className="text-[10px]" style={{ color: t.muted, fontFamily: f.mono }}>
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: f.display, fontSize: 24, lineHeight: 1.2, fontWeight: 600 }}>{project.title}</h3>
                      {project.description && (
                        <p className="mt-1 max-w-[62ch] text-[13px] leading-[1.75]" style={{ color: t.muted }}>
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    {project.date && <span className="text-[10px]" style={{ color: t.muted }}>{project.date}</span>}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="grid h-8 w-8 place-items-center rounded-full"
                        style={{ border: `1px solid ${line}`, color: t.accent }}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:py-16">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: insetLine }}>
              <h2 style={{ fontFamily: f.display, fontSize: 30, fontWeight: 700 }}>Experience</h2>
              <span className="text-[10px]" style={{ letterSpacing: "0.18em", color: alpha(t.darkInk, 0.55) }}>
                {String(content.experience.length).padStart(2, "0")} roles
              </span>
            </div>
            <div className="mt-6">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid gap-2 border-b py-5 md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-6"
                  style={{ borderColor: alpha(t.darkInk, 0.14) }}
                >
                  <span style={{ fontFamily: f.display, fontSize: 20 }}>{role.title}</span>
                  <span className="text-[12px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                    {role.description}
                  </span>
                  <span className="text-[10px]" style={{ color: alpha(t.darkInk, 0.55), fontFamily: f.mono }}>
                    {role.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 md:grid-cols-2 md:py-16">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 26, fontWeight: 700 }}>Education</h2>
            <div className="mt-5">
              {content.education.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex items-baseline justify-between gap-4 border-b py-4"
                  style={{ borderColor: hair }}
                >
                  <div>
                    <p className="text-[15px] font-semibold">{item.title}</p>
                    <p className="mt-1 text-[12px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[10px]" style={{ color: t.muted, fontFamily: f.mono }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <h2 style={{ fontFamily: f.display, fontSize: 26, fontWeight: 700 }}>Elsewhere</h2>
            <div className="mt-5">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 border-b py-4 text-[14px]"
                    style={{ borderColor: hair }}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={15} style={{ color: t.accent }} />
                      <span className="capitalize">{social.label}</span>
                    </span>
                    <ArrowUpRight size={14} style={{ color: t.muted }} />
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer className="border-t" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-6 text-[10px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted }}>
          <span>
            {content.name}
            {content.role ? ` — ${content.role}` : ""}
          </span>
          <a href="#top" className="flex items-center gap-2">
            Back to top <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}
