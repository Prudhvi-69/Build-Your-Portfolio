import { ArrowUpRight, Crosshair } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const CHAMFER = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))";

export default function HudLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const shellLine = alpha(t.darkInk, 0.18);
  const lightLine = alpha(t.ink, 0.16);

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.dark, color: t.darkInk, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.darkInk} ink={t.ink} />

      <header className="sticky top-0 z-30 border-b" style={{ background: alpha(t.dark, 0.92), borderColor: shellLine, backdropFilter: "blur(14px)" }}>
        <div className="mx-auto flex h-[62px] max-w-[1240px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center text-[11px] font-bold"
              style={{ background: t.darkInk, color: t.dark, clipPath: CHAMFER }}
            >
              {content.initial}
            </span>
            <span className="text-[12px] font-bold uppercase" style={{ letterSpacing: "0.24em", fontFamily: f.display }}>
              {content.name}
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[10px] uppercase md:flex" style={{ letterSpacing: "0.18em", color: t.darkMuted }}>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          <span
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] uppercase"
            style={{ letterSpacing: "0.16em", border: `1px solid ${t.darkInk}`, color: t.darkInk }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.darkInk }} />
            {content.role}
          </span>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden"
        style={{
          background: t.bg,
          color: t.ink,
          backgroundImage: `linear-gradient(${alpha(t.ink, 0.06)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(t.ink, 0.06)} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      >
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-14 md:grid-cols-[1fr_460px] md:py-20">
          <div>
            <p className="text-[10px] uppercase" style={{ letterSpacing: "0.24em", color: t.muted, fontFamily: f.display }}>
              {content.role}
            </p>
            <h1
              className="mt-4 uppercase"
              style={{
                fontFamily: f.display,
                fontSize: "clamp(3rem, 6.4vw, 5.4rem)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                fontWeight: 700,
              }}
            >
              {content.firstName}
              <br />
              {content.lastName || "\u00A0"}
            </h1>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.7]" style={{ color: t.muted }}>
              {content.bio}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-charge
                data-charge-target="#work"
                data-charge-done="Work unlocked"
                className="relative flex h-11 items-center overflow-hidden"
                style={{ background: t.accent, color: t.accentInk, clipPath: CHAMFER, fontFamily: f.display }}
              >
                <span
                  data-charge-fill
                  aria-hidden
                  className="absolute inset-0 origin-left"
                  style={{ background: alpha(t.accentInk, 0.34), transform: "scaleX(0)" }}
                />
                <span className="relative flex items-center gap-2 px-5 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.16em" }}>
                  <Crosshair size={14} />
                  <span data-charge-label>Hold to open work</span>
                </span>
              </button>
              {content.socials[0] && (
                <a
                  href={content.socials[0].url}
                  target={isExternal(content.socials[0].url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[11px] uppercase"
                  style={{ letterSpacing: "0.16em", color: t.ink }}
                >
                  {content.socials[0].label} <ArrowUpRight size={13} />
                </a>
              )}
            </div>

            <div className="mt-9 grid grid-cols-3 gap-2.5">
              {[
                { label: "Currently", value: content.experience[0]?.title ?? "Open" },
                { label: "Projects", value: String(content.projects.length).padStart(2, "0") },
                { label: "Skills", value: String(content.skills.length).padStart(2, "0") },
              ].map((item) => (
                <div key={item.label} data-tilt className="will-change-transform px-3.5 py-3" style={{ background: alpha(t.ink, 0.05), boxShadow: `inset 0 0 0 1px ${lightLine}` }}>
                  <p className="text-[8px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted }}>
                    {item.label}
                  </p>
                  <p className="mt-1.5 truncate text-[12px] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            data-ring-panel
            className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden"
            style={{
              clipPath: "polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px))",
              background: t.dark,
              transform: "perspective(1200px) rotateX(var(--ty, 0deg)) rotateY(var(--tx, 0deg))",
            }}
          >
            {template.art.hero && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={template.art.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
            )}
            <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${alpha(t.dark, 0.35)}, ${alpha(t.dark, 0.9)})` }} />
            <div data-crosshair aria-hidden className="absolute inset-x-0 h-px" style={{ top: "var(--y, 50%)", background: alpha(t.darkInk, 0.3) }} />
            <div data-crosshair aria-hidden className="absolute inset-y-0 w-px" style={{ left: "var(--x, 50%)", background: alpha(t.darkInk, 0.3) }} />
            <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <g data-ring style={{ transformOrigin: "200px 200px" }}>
                <circle cx="200" cy="200" r="148" fill="none" stroke={t.darkInk} strokeWidth="1" strokeDasharray="2 10" opacity="0.75" />
              </g>
              <g data-ring style={{ transformOrigin: "200px 200px" }}>
                <circle cx="200" cy="200" r="118" fill="none" stroke={t.darkInk} strokeWidth="2" strokeDasharray="64 240" opacity="0.9" />
              </g>
              <g data-ring style={{ transformOrigin: "200px 200px" }}>
                <circle cx="200" cy="200" r="172" fill="none" stroke={t.darkInk} strokeWidth="0.8" strokeDasharray="1 22" opacity="0.55" />
              </g>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="h-[112px] w-[112px] overflow-hidden rounded-full"
                style={{ boxShadow: `0 0 0 1px ${alpha(t.darkInk, 0.6)}` }}
              >
                {content.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={content.avatarUrl} alt={`Portrait of ${content.name}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center" style={{ background: alpha(t.darkInk, 0.12), color: t.darkInk, fontFamily: f.display, fontSize: 34 }}>
                    {content.initial}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-[8px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.75) }}>
              <span>{content.role}</span>
              <span>{content.experience[0]?.date ?? ""}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: t.accent, color: t.accentInk }}>
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 md:grid-cols-[0.85fr_1.15fr] md:py-14">
          <div>
            <h2 style={{ fontFamily: f.display, fontSize: 30, fontWeight: 700 }}>About</h2>
            {content.skills.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span
                    key={skill}
                    data-magnet
                    data-tilt
                    className="will-change-transform rounded-full px-3 py-1.5 text-[10px] font-medium"
                    style={{ border: `1px solid ${alpha(t.accentInk, 0.45)}`, color: t.accentInk }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="max-w-[54ch] text-[16px] leading-[1.7]">{content.bio}</p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-3" style={{ borderColor: alpha(t.accentInk, 0.3) }}>
              {[
                { label: "Currently", value: content.experience[0]?.title ?? "—" },
                { label: "Education", value: content.education[0]?.title ?? "—" },
                { label: "Links", value: String(content.socials.length).padStart(2, "0") },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[8px] uppercase" style={{ letterSpacing: "0.2em", opacity: 0.7 }}>
                    {item.label}
                  </p>
                  <p className="mt-1 truncate text-[12px] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1240px] px-6 py-14">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: shellLine }}>
              <h2 style={{ fontFamily: f.display, fontSize: 30, fontWeight: 700 }}>Selected work</h2>
              <span className="text-[10px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  data-magnet
                  data-tilt
                  className={`relative flex flex-col justify-between p-6 will-change-transform ${index === 0 ? "md:row-span-2 md:min-h-[380px]" : "min-h-[180px]"}`}
                  style={{
                    background: index === 0 ? alpha(t.darkInk, 0.05) : alpha(t.darkInk, 0.03),
                    boxShadow: `inset 0 0 0 1px ${shellLine}`,
                    clipPath: CHAMFER,
                  }}
                >
                  {index === 0 && template.art.project && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={template.art.project} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
                      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${alpha(t.dark, 0.15)} 0%, ${alpha(t.dark, 0.9)} 72%)` }} />
                    </>
                  )}
                  <div className="relative flex items-center justify-between">
                    <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
                      {content.role}
                    </span>
                    <span className="text-[9px]" style={{ color: t.darkMuted, fontFamily: f.mono }}>
                      {project.date}
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <h3 data-scramble style={{ fontFamily: f.display, fontSize: index === 0 ? 40 : 26, fontWeight: 700, lineHeight: 1 }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-3 max-w-[52ch] text-[12.5px] leading-[1.7]" style={{ color: alpha(t.darkInk, 0.72) }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase"
                        style={{ letterSpacing: "0.16em", color: t.darkInk }}
                      >
                        Read case study <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1240px] px-6 pb-14">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: shellLine }}>
              <h2 style={{ fontFamily: f.display, fontSize: 30, fontWeight: 700 }}>Experience</h2>
              <span className="text-[10px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
                {String(content.experience.length).padStart(2, "0")} roles
              </span>
            </div>
            <div className="mt-7 space-y-2.5">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  data-tilt
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 will-change-transform"
                  style={{ background: alpha(t.darkInk, 0.04), boxShadow: `inset 0 0 0 1px ${shellLine}`, clipPath: CHAMFER }}
                >
                  <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.darkMuted }}>
                    {role.date}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold" style={{ fontFamily: f.display }}>
                      {role.title}
                    </p>
                    <p className="text-[12px]" style={{ color: t.darkMuted }}>
                      {role.description}
                    </p>
                  </div>
                  <ArrowUpRight size={15} style={{ color: t.darkInk }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr]" style={{ background: t.bg, color: t.ink }}>
        {content.education.length > 0 && (
          <section id="education">
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontFamily: f.display, fontSize: 26, fontWeight: 700 }}>Education</h2>
              <span className="text-[10px]" style={{ color: t.muted, fontFamily: f.mono }}>
                {content.education[0]?.date ?? ""}
              </span>
            </div>
            <div className="mt-5 p-2" style={{ background: alpha(t.ink, 0.04) }}>
              {content.education.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3.5"
                  style={{ boxShadow: index === 0 ? `inset 0 0 0 1px ${lightLine}` : undefined }}
                >
                  <div>
                    <p className="text-[14px] font-semibold">{item.title}</p>
                    <p className="text-[11px]" style={{ color: t.muted }}>
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
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontFamily: f.display, fontSize: 26, fontWeight: 700 }}>Elsewhere</h2>
              <span className="text-[10px]" style={{ color: t.muted, fontFamily: f.mono }}>
                {String(content.socials.length).padStart(2, "0")} links
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3.5 text-[11px] font-semibold uppercase"
                    style={{ background: t.dark, color: t.darkInk, clipPath: CHAMFER, letterSpacing: "0.12em" }}
                  >
                    <Icon size={14} />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer className="border-t" style={{ borderColor: shellLine }}>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
          <span>{content.name} — portfolio</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
