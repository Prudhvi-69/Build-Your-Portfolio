import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

export default function SceneLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const poster = /Bebas|Archivo/i.test(f.display);
  const onDark = alpha(t.darkInk, 0.22);
  const line = alpha(t.ink, 0.14);
  const isStarfield = template.motion === "starfield";
  const isRail = template.motion === "dragRail";
  const isCharge = template.motion === "chargeHold";

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <section id="top" data-streak-host className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(60% 60% at 20% 0%, ${alpha(t.accent, 0.35)}, transparent 65%), radial-gradient(45% 45% at 88% 100%, ${alpha(t.darkInk, 0.16)}, transparent 70%)`,
          }}
        />
        {[0, 1, 2].map((layer) => (
          <div
            key={layer}
            data-stars
            aria-hidden
            className="pointer-events-none absolute -inset-6 will-change-transform"
            style={{
              backgroundImage: `radial-gradient(${alpha(t.darkInk, 0.5)} 1px, transparent 1px)`,
              backgroundSize: `${38 + layer * 26}px ${38 + layer * 26}px`,
              opacity: isStarfield ? 0.18 + layer * 0.14 : layer === 0 ? 0.14 : 0,
            }}
          />
        ))}
        {template.art.hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={template.art.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        )}

        <header className="relative z-20">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold" style={{ background: t.darkInk, color: t.dark }}>
                {content.initial}
              </span>
              <span className="text-[11px] uppercase" style={{ letterSpacing: "0.26em" }}>
                {content.name}
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-[10px] uppercase md:flex" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.7) }}>
              <a href="#work">Work</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#elsewhere">Elsewhere</a>
            </nav>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.65) }}>
              {content.role}
            </span>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1200px] flex-col justify-center px-6 pb-14 pt-10">
          <p className="text-[10px] uppercase" style={{ letterSpacing: "0.4em", color: alpha(t.darkInk, 0.65) }}>
            {content.role}
          </p>
          <h1
            className="mt-5"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(3.4rem, 11vw, 8.4rem)",
              lineHeight: 0.82,
              letterSpacing: poster ? "0.01em" : "-0.035em",
              textTransform: poster ? "uppercase" : "none",
              fontWeight: poster ? 400 : 700,
            }}
          >
            {content.firstName}
            <br />
            <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-[46ch] text-[15px] leading-[1.85]" style={{ color: alpha(t.darkInk, 0.75) }}>
              {content.bio}
            </p>
            {isCharge && (
              <button
                type="button"
                data-charge
                data-charge-target="#work"
                data-charge-done="Charged"
                aria-label="Hold to jump to the work section"
                className="relative mt-7 grid h-[96px] w-[112px] place-items-end overflow-hidden text-center will-change-transform"
                style={{
                  border: `2px solid ${alpha(t.darkInk, 0.45)}`,
                  borderRadius: 999,
                  color: t.darkInk,
                  background: alpha(t.darkInk, 0.06),
                }}
              >
                <span
                  aria-hidden
                  data-charge-fill
                  className="absolute inset-x-4 bottom-4 h-[5px]"
                  style={{ background: t.accent, transform: "scaleX(0)", transformOrigin: "left" }}
                />
                <span
                  data-charge-label
                  className="relative mx-auto mb-4 block text-[9px] uppercase"
                  style={{ letterSpacing: "0.24em" }}
                >
                  Hold
                </span>
              </button>
            )}
            <div className="flex items-center gap-4">
              <button
                type="button"
                data-seal
                data-stamp
                aria-pressed="false"
                aria-label="Seal this portfolio"
                className="grid h-12 w-12 place-items-center rounded-full text-[12px] will-change-transform"
                style={{ border: `1px solid ${alpha(t.darkInk, 0.5)}`, color: t.darkInk }}
              >
                {content.initial}
              </button>
              <a href="#work" className="flex items-center gap-2 text-[10px] uppercase" style={{ letterSpacing: "0.22em" }}>
                Work <ArrowDown size={13} />
              </a>
            </div>
          </div>
          {content.skills.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-2 border-t pt-5" style={{ borderColor: onDark }}>
              {content.skills.map((skill) => (
                <span key={skill} data-magnet className="will-change-transform px-3 py-1.5 text-[10px]" style={{ border: `1px solid ${onDark}`, borderRadius: 999 }}>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
            <h2
              style={{
                fontFamily: f.display,
                fontSize: poster ? 36 : 30,
                letterSpacing: poster ? "0.02em" : "-0.02em",
                textTransform: poster ? "uppercase" : "none",
              }}
            >
              Selected work
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
              {isRail && (
                <>
                  <button
                    type="button"
                    data-rail-step="prev"
                    aria-label="Previous project"
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{ border: `1px solid ${line}`, color: t.ink }}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    type="button"
                    data-rail-step="next"
                    aria-label="Next project"
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{ border: `1px solid ${line}`, color: t.ink }}
                  >
                    <ArrowRight size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            data-rail={isRail ? "" : undefined}
            className={isRail ? "mt-6 flex gap-4 overflow-x-auto pb-4" : "mt-6 grid gap-4 md:grid-cols-2"}
            style={isRail ? { scrollSnapType: "x mandatory", cursor: "grab" } : undefined}
          >
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                data-magnet
                className={`relative flex flex-col justify-between overflow-hidden p-6 will-change-transform ${isRail ? "min-h-[260px] w-[84%] shrink-0 md:w-[52%]" : index === 0 ? "md:col-span-2 md:min-h-[300px]" : "min-h-[220px]"}`}
                style={{
                  scrollSnapAlign: isRail ? "start" : undefined,
                  background: index === 0 ? t.dark : t.surface,
                  color: index === 0 ? t.darkInk : t.ink,
                  borderRadius: poster ? 4 : 18,
                  boxShadow: `inset 0 0 0 1px ${index === 0 ? alpha(t.darkInk, 0.18) : line}`,
                }}
              >
                {index === 0 && template.art.project && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={template.art.project} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                )}
                <div className="relative flex items-baseline justify-between">
                  <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", opacity: 0.7 }}>
                    {content.role}
                  </span>
                  <span className="text-[10px]" style={{ opacity: 0.7, fontFamily: f.mono }}>
                    {project.date}
                  </span>
                </div>
                <div className="relative mt-10">
                  <h3
                    data-scramble
                    style={{
                      fontFamily: f.display,
                      fontSize: index === 0 ? 42 : 28,
                      lineHeight: 1,
                      letterSpacing: poster ? "0.02em" : "-0.01em",
                      textTransform: poster ? "uppercase" : "none",
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-3 max-w-[52ch] text-[13px] leading-[1.75]" style={{ opacity: 0.8 }}>
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      View project <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1200px] px-6 py-12">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: onDark }}>
              <h2 style={{ fontFamily: f.display, fontSize: poster ? 32 : 26, textTransform: poster ? "uppercase" : "none", letterSpacing: poster ? "0.02em" : "0" }}>
                Experience
              </h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {String(content.experience.length).padStart(2, "0")} roles
              </span>
            </div>
            {content.experience.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="grid gap-1 border-b py-5 md:grid-cols-[1fr_1fr_auto] md:items-baseline md:gap-6"
                style={{ borderColor: alpha(t.darkInk, 0.12) }}
              >
                <span style={{ fontFamily: f.display, fontSize: 21, textTransform: poster ? "uppercase" : "none", letterSpacing: poster ? "0.02em" : "0" }}>
                  {role.title}
                </span>
                <span className="text-[12.5px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                  {role.description}
                </span>
                <span className="text-[9px] uppercase" style={{ letterSpacing: "0.18em", color: alpha(t.darkInk, 0.55), fontFamily: f.mono }}>
                  {role.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 24, textTransform: poster ? "uppercase" : "none", letterSpacing: poster ? "0.02em" : "0" }}>
              Education
            </h2>
            <div className="mt-4 border-t" style={{ borderColor: line }}>
              {content.education.map((item) => (
                <div key={item.title} className="flex items-baseline justify-between gap-4 border-b py-3.5" style={{ borderColor: line }}>
                  <div>
                    <p className="text-[14px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[12px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[9px]" style={{ color: t.muted, fontFamily: f.mono }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <h2 style={{ fontFamily: f.display, fontSize: 24, textTransform: poster ? "uppercase" : "none", letterSpacing: poster ? "0.02em" : "0" }}>
              Elsewhere
            </h2>
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
                    style={{ background: t.surface, color: t.ink, borderRadius: poster ? 4 : 14 }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={14} style={{ color: t.accent }} />
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

      <footer style={{ background: t.dark, color: t.darkInk }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.6) }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
