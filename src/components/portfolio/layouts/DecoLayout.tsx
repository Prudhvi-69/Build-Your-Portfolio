import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

/* Stepped deco corner: a rectangle with two clipped steps on opposing corners. */
const STEP = "polygon(0 12px, 12px 12px, 12px 0, calc(100% - 12px) 0, calc(100% - 12px) 12px, 100% 12px, 100% 100%, 0 100%)";

/** Ornament rule the `runeDraw` mechanic draws in under a section heading. */
function RuneRule({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-[7px] w-full"
      viewBox="0 0 220 7"
      preserveAspectRatio="none"
    >
      <path
        data-rune
        d="M0 4 C60 1.5, 150 6.5, 220 3"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function DecoLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const gold = t.accent;
  const onDark = alpha(t.darkInk, 0.2);
  const onLight = alpha(t.ink, 0.16);

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.dark, color: t.darkInk, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={gold} ink={t.ink} />

      <header className="relative z-20 border-b" style={{ borderColor: onDark, background: alpha(t.dark, 0.9) }}>
        <div className="mx-auto flex h-[62px] max-w-[1220px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center text-[10px]"
              style={{ border: `1px solid ${gold}`, color: gold, fontFamily: f.display, letterSpacing: "0.06em" }}
            >
              {content.initial}
            </span>
            <span className="text-[10px] uppercase" style={{ letterSpacing: "0.34em" }}>
              {content.name}
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[9px] uppercase md:flex" style={{ letterSpacing: "0.26em", color: t.darkMuted }}>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          <span className="hidden text-[9px] uppercase sm:block" style={{ letterSpacing: "0.24em", color: t.darkMuted }}>
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        {template.art.hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={template.art.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${alpha(t.dark, 0.4)} 0%, ${alpha(t.dark, 0.94)} 80%)` }} />
          </>
        )}
        {template.motion === "searchlight" && (
          <div
            data-beam
            aria-hidden
            className="pointer-events-none absolute -top-[30%] left-1/2 h-[170%] w-[520px] origin-top will-change-transform"
            style={{
              background: `linear-gradient(180deg, ${alpha(gold, 0.34)} 0%, ${alpha(gold, 0.08)} 55%, transparent 78%)`,
              clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
              transform: "rotate(-8deg)",
              filter: "blur(2px)",
            }}
          />
        )}
        <div className="relative mx-auto max-w-[1220px] px-6 pb-14 pt-16 md:pb-16 md:pt-20">
          <div className="flex flex-col items-center text-center">
            <span
              className="grid h-16 w-16 place-items-center rounded-full text-[15px]"
              style={{ border: `1px solid ${gold}`, color: gold, fontFamily: f.display, letterSpacing: "0.08em" }}
            >
              {content.initial}
            </span>
            <p className="mt-6 text-[9px] uppercase" style={{ letterSpacing: "0.5em", color: t.darkMuted }}>
              {content.role}
            </p>
            <h1
              className="mt-4 uppercase"
              style={{ fontFamily: f.display, fontSize: "clamp(2.6rem, 6.6vw, 5.2rem)", lineHeight: 1, letterSpacing: "0.06em" }}
            >
              {content.firstName} {content.lastName}
            </h1>
            <div className="mt-6 flex w-full max-w-[560px] items-center gap-4">
              <span className="h-px flex-1" style={{ background: alpha(gold, 0.5) }} />
              <span className="h-1.5 w-1.5 rotate-45" style={{ border: `1px solid ${gold}` }} />
              <span className="h-px flex-1" style={{ background: alpha(gold, 0.5) }} />
            </div>
            <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.85]" style={{ color: alpha(t.darkInk, 0.75) }}>
              {content.bio}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {template.motion === "searchlight" ? (
                <button
                  type="button"
                  data-signal
                  aria-pressed="false"
                  className="flex items-center gap-3 px-5 py-3 text-[9px] uppercase will-change-transform"
                  style={{ border: `1px solid ${gold}`, color: gold, letterSpacing: "0.26em", background: "transparent" }}
                >
                  Signal
                  <span className="relative block h-2 w-16" style={{ background: alpha(gold, 0.24) }}>
                    <span className="absolute inset-y-0 left-0 block w-1/2" style={{ background: gold }} />
                  </span>
                  <span data-signal-state>Off</span>
                </button>
              ) : (
                <button
                  type="button"
                  data-seal
                  data-stamp
                  aria-pressed="false"
                  aria-label="Seal this portfolio"
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[11px] will-change-transform"
                  style={{ border: `1px solid ${gold}`, color: gold, fontFamily: f.display }}
                >
                  {content.initial}
                </button>
              )}
              {content.skills.length > 0 && (
                <span className="text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: t.darkMuted }}>
                  {content.skills.length} skills
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <svg aria-hidden viewBox="0 0 1220 8" preserveAspectRatio="none" className="block w-full" style={{ height: 8 }}>
            <line x1="0" y1="4" x2="1220" y2="4" stroke={alpha(gold, 0.55)} strokeWidth="1" strokeDasharray="1 7" />
          </svg>
        </div>
      </section>

      <section style={{ background: t.bg, color: t.ink }}>
        <div className="mx-auto grid max-w-[1220px] gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-14">
          <div>
            <h2 style={{ fontFamily: f.display, fontSize: 28, letterSpacing: "0.08em" }}>About</h2>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.9]">{content.bio}</p>
            {content.skills.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-[10px] uppercase" style={{ border: `1px solid ${onLight}`, letterSpacing: "0.14em", color: t.ink }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-3" style={{ border: `1px solid ${onLight}` }}>
            <div className="p-4" style={{ border: `1px solid ${alpha(t.ink, 0.1)}` }}>
              {[
                { label: "Currently", value: content.experience[0]?.title ?? "—" },
                { label: "Education", value: content.education[0]?.title ?? "—" },
                { label: "Projects", value: String(content.projects.length).padStart(2, "0") },
                { label: "Links", value: String(content.socials.length).padStart(2, "0") },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                  style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.1)}` }}
                >
                  <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted }}>
                    {item.label}
                  </span>
                  <span className="truncate text-[12px] font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" style={{ background: t.surface, color: t.ink }}>
          <div className="mx-auto max-w-[1220px] px-6 py-12 md:py-14">
            <div className="flex items-baseline justify-between">
              <div data-rune-host className="relative inline-block">
                <h2 style={{ fontFamily: f.display, fontSize: 30, letterSpacing: "0.08em" }}>Selected work</h2>
                <RuneRule color={t.accent} />
              </div>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: t.muted }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
            </div>
            <div className="mt-7 space-y-3">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  data-tilt
                  className="grid gap-4 px-6 py-5 will-change-transform md:grid-cols-[1fr_auto] md:items-center"
                  style={{ border: `1px solid ${onLight}`, background: alpha(t.bg, 0.55), clipPath: STEP }}
                >
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: gold }}>
                        {content.role}
                      </span>
                      <span className="text-[9px]" style={{ fontFamily: f.mono, color: t.muted }}>
                        {project.date}
                      </span>
                    </div>
                    <h3 className="mt-2" style={{ fontFamily: f.display, fontSize: index === 0 ? 34 : 26, letterSpacing: "0.04em", lineHeight: 1.1 }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 max-w-[62ch] text-[13px] leading-[1.8]" style={{ color: t.muted }}>
                        {project.description}
                      </p>
                    )}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-[9px] uppercase"
                      style={{ border: `1px solid ${gold}`, letterSpacing: "0.22em", color: t.ink }}
                    >
                      View <ArrowUpRight size={12} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: t.dark, color: t.darkInk }}>
        <div className="mx-auto max-w-[1220px] px-6 py-12">
          {content.experience.length > 0 && (
            <div id="experience">
              <div className="flex items-baseline justify-between">
                <div data-rune-host className="relative inline-block">
                  <h2 style={{ fontFamily: f.display, fontSize: 28, letterSpacing: "0.08em" }}>Experience</h2>
                  <RuneRule color={t.darkInk} />
                </div>
                <span className="h-px flex-1 mx-6" style={{ background: onDark }} />
                <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.darkMuted }}>
                  {String(content.experience.length).padStart(2, "0")} roles
                </span>
              </div>
              <div className="mt-2">
                {content.experience.map((role, index) => (
                  <div
                    key={`${role.title}-${index}`}
                    className="grid gap-1 border-b py-4 md:grid-cols-[240px_1fr_auto] md:items-baseline md:gap-6"
                    style={{ borderColor: alpha(t.darkInk, 0.12) }}
                  >
                    <span style={{ fontFamily: f.display, fontSize: 19, letterSpacing: "0.04em" }}>{role.title}</span>
                    <span className="text-[12px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                      {role.description}
                    </span>
                    <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted }}>
                      {role.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-[1220px] gap-10 px-6 py-12 md:grid-cols-2" style={{ background: t.bg, color: t.ink }}>
        {content.education.length > 0 && (
          <section id="education" className="p-3" style={{ border: `1px solid ${onLight}` }}>
            <div className="p-4" style={{ border: `1px solid ${alpha(t.ink, 0.09)}` }}>
              <div data-rune-host className="relative inline-block">
                <h2 style={{ fontFamily: f.display, fontSize: 22, letterSpacing: "0.08em" }}>Education</h2>
                <RuneRule color={t.accent} />
              </div>
              <div className="mt-3">
                {content.education.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex items-baseline justify-between gap-3 py-2.5" style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.1)}` }}>
                    <div>
                      <p className="text-[13px] font-semibold">{item.title}</p>
                      <p className="text-[11px]" style={{ color: t.muted }}>
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[9px]" style={{ fontFamily: f.mono, color: t.muted }}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <div data-rune-host className="relative inline-block">
              <h2 style={{ fontFamily: f.display, fontSize: 22, letterSpacing: "0.08em" }}>Elsewhere</h2>
              <RuneRule color={t.accent} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase transition-colors"
                    style={{ border: `1px solid ${onLight}`, letterSpacing: "0.16em", color: t.ink }}
                  >
                    <Icon size={14} style={{ color: gold }} />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer className="border-t" style={{ borderColor: onDark }}>
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.28em", color: t.darkMuted }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
