import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Last Son — monumental opening type under an orbital ring rig. Ported from the
 * canvas page `var_6523fb6acae8`; motion `orbit` parallaxes the ring bundle.
 */
export default function LastSonLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.14);
  const onDark = alpha(t.darkInk, 0.2);

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header style={{ borderBottom: `1px solid ${alpha(t.ink, 0.16)}` }}>
        <div
          className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-7 py-3 text-[9px] uppercase"
          style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}
        >
          <a href="#top" style={{ color: t.ink }}>
            {content.name}
          </a>
          <nav className="flex items-center gap-5">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          <span>{content.role}</span>
        </div>
      </header>

      <section id="top" className="relative mx-auto max-w-[1200px] overflow-hidden px-7 pb-12 pt-12 md:pt-16">
        <div data-orbit aria-hidden className="pointer-events-none absolute -right-16 top-4 hidden h-[520px] w-[520px] md:block">
          {[
            { size: 500, dashed: false, opacity: 0.12 },
            { size: 380, dashed: true, opacity: 0.3 },
            { size: 260, dashed: false, opacity: 0.16 },
          ].map((ring) => (
            <span
              key={ring.size}
              className="absolute rounded-full"
              style={{
                width: ring.size,
                height: ring.size,
                left: 260 - ring.size / 2,
                top: 260 - ring.size / 2,
                border: `${ring.dashed ? 2 : 1}px ${ring.dashed ? "dashed" : "solid"} ${alpha(ring.dashed ? t.accent : t.ink, ring.opacity)}`,
              }}
            />
          ))}
        </div>

        <div className="relative">
          <p className="text-[10px] uppercase" style={{ letterSpacing: "0.28em", color: t.accent, fontFamily: f.mono }}>
            {content.role}
          </p>
          <h1
            className="mt-4"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(4.2rem, 12vw, 9rem)",
              lineHeight: 0.78,
              letterSpacing: "0.005em",
              textTransform: "uppercase",
            }}
          >
            {content.firstName}
            <br />
            <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
            <p className="max-w-[46ch] text-[15.5px] leading-[1.8]" style={{ color: alpha(t.ink, 0.72) }}>
              {content.bio}
            </p>
            <div className="flex items-center gap-4 md:justify-end">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full text-[12px] font-bold"
                style={{ background: t.accent, color: t.accentInk }}
              >
                {content.initial}
              </span>
              <span className="h-px w-16" style={{ background: alpha(t.ink, 0.25) }} />
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
                {pad(content.skills.length)} skills
              </span>
            </div>
          </div>
        </div>
      </section>

      {content.skills.length > 0 && (
        <div style={{ background: t.accent, color: t.accentInk }}>
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-7 gap-y-2 px-7 py-3.5">
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: alpha(t.accentInk, 0.85), fontFamily: f.mono }}>
              Skills
            </span>
            {content.skills.map((skill) => (
              <span key={skill} className="text-[12px] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1200px] px-7 py-12">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
            <h2 style={{ fontFamily: f.display, fontSize: 42, textTransform: "uppercase", letterSpacing: "0.01em" }}>Selected work</h2>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {pad(content.projects.length)} projects
            </span>
          </div>

          {content.projects.map((project, index) => {
            const featured = index === 0;
            return (
              <article
                key={`${project.title}-${index}`}
                className={featured ? "mt-6 p-8" : "border-b py-7 md:pr-8"}
                style={
                  featured
                    ? { background: t.dark, color: t.darkInk }
                    : { borderColor: line, width: "100%" }
                }
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[9px] uppercase"
                    style={{ letterSpacing: "0.22em", color: featured ? alpha(t.darkInk, 0.85) : t.accent, fontFamily: f.mono }}
                  >
                    {content.role}
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: f.mono, color: featured ? t.darkMuted : t.muted }}>
                    {project.date}
                  </span>
                </div>
                <h3
                  className={featured ? "mt-6" : "mt-3"}
                  style={{
                    fontFamily: f.display,
                    fontSize: featured ? 66 : 38,
                    lineHeight: 0.86,
                    textTransform: "uppercase",
                    letterSpacing: "0.01em",
                  }}
                >
                  {project.title}
                </h3>
                {project.description && (
                  <p
                    className={featured ? "mt-4 max-w-[54ch] text-[13.5px] leading-[1.8]" : "mt-2 max-w-[56ch] text-[13px] leading-[1.75]"}
                    style={{ color: featured ? alpha(t.darkInk, 0.72) : alpha(t.ink, 0.72) }}
                  >
                    {project.description}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target={isExternal(project.link) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 pb-0.5 text-[9px] uppercase"
                    style={{ letterSpacing: "0.2em", color: t.accent, fontFamily: f.mono, borderBottom: `1px solid ${t.accent}` }}
                  >
                    Read case study <ArrowUpRight size={11} />
                  </a>
                )}
              </article>
            );
          })}
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1200px] px-7 py-12">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: onDark }}>
              <h2 style={{ fontFamily: f.display, fontSize: 38, textTransform: "uppercase", letterSpacing: "0.01em" }}>Experience</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {pad(content.experience.length)} roles
              </span>
            </div>
            <div className="grid gap-8 pt-6 md:grid-cols-2">
              {content.experience.map((role, index) => (
                <div key={`${role.title}-${index}`} className="pb-4" style={{ borderBottom: `1px solid ${alpha(t.darkInk, 0.14)}` }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p style={{ fontFamily: f.display, fontSize: 26, textTransform: "uppercase", letterSpacing: "0.01em" }}>{role.title}</p>
                    <span className="text-[9px]" style={{ fontFamily: f.mono, color: t.darkMuted }}>
                      {role.date}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px]" style={{ color: alpha(t.darkInk, 0.72) }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1200px] gap-10 px-7 py-12 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 32, textTransform: "uppercase", letterSpacing: "0.01em" }}>Education</h2>
            <div className="mt-4" style={{ borderTop: `1px solid ${line}` }}>
              {content.education.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex items-baseline justify-between gap-4 py-3.5" style={{ borderBottom: `1px solid ${line}` }}>
                  <div>
                    <p className="text-[14px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[12px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[9px]" style={{ fontFamily: f.mono, color: t.muted }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <h2 style={{ fontFamily: f.display, fontSize: 34, textTransform: "uppercase", letterSpacing: "0.01em" }}>Elsewhere</h2>
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
                    style={{ border: `1px solid ${alpha(t.ink, 0.16)}`, color: t.ink }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={12} style={{ color: t.accent }} />
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer style={{ borderTop: `1px solid ${alpha(t.ink, 0.16)}` }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-7 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
