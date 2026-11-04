import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Deep Field — starfield mission console. Ported from the canvas page
 * `var_d4a7e7aa951c`; motion `starfield` separates three star layers by pointer depth.
 */
export default function DeepFieldLayout({
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

  const facts = [
    { label: "Currently", value: content.experience[0]?.title ?? "Open" },
    { label: "Projects", value: pad(content.projects.length) },
    { label: "Skills", value: pad(content.skills.length) },
    { label: "Links", value: pad(content.socials.length) },
  ];

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <section id="top" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        {[0, 1, 2].map((layer) => (
          <div
            key={layer}
            data-stars
            aria-hidden
            className="pointer-events-none absolute -inset-6 will-change-transform"
            style={{
              backgroundImage: `radial-gradient(${alpha(t.darkInk, 0.5)} 1px, transparent 1px)`,
              backgroundSize: `${38 + layer * 26}px ${38 + layer * 26}px`,
              opacity: 0.18 + layer * 0.14,
            }}
          />
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `radial-gradient(58% 58% at 18% 0%, ${alpha(t.accent, 0.35)}, transparent 66%)` }}
        />

        <header className="relative z-20">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-4">
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
              <a href="#elsewhere">Links</a>
            </nav>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.65) }}>
              {content.role}
            </span>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-14 pt-6">
          <p className="text-[10px] uppercase" style={{ letterSpacing: "0.4em", color: alpha(t.darkInk, 0.65) }}>
            {content.role}
          </p>
          <h1
            className="mt-5"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(3.2rem, 9vw, 7.2rem)",
              lineHeight: 0.84,
              letterSpacing: "-0.03em",
            }}
          >
            {content.firstName}
            <br />
            <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
          </h1>

          <div className="mt-9 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="max-w-[48ch] text-[15px] leading-[1.85]" style={{ color: alpha(t.darkInk, 0.78) }}>
                {content.bio}
              </p>
              <a href="#work" className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase" style={{ letterSpacing: "0.24em" }}>
                Work <ArrowDown size={13} />
              </a>
            </div>

            <dl className="grid grid-cols-2 gap-px" style={{ background: onDark }}>
              {facts.map((fact) => (
                <div key={fact.label} className="px-4 py-3" style={{ background: alpha(t.dark, 0.85) }}>
                  <dt className="text-[8px] uppercase" style={{ letterSpacing: "0.24em", color: alpha(t.darkInk, 0.6) }}>
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 truncate text-[12px] font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {content.skills.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-2 border-t pt-5" style={{ borderColor: onDark }}>
              {content.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-[10px]" style={{ border: `1px solid ${onDark}`, borderRadius: 999 }}>
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
            <h2 style={{ fontFamily: f.display, fontSize: 34, letterSpacing: "-0.02em" }}>Selected work</h2>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {pad(content.projects.length)} projects
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.projects.map((project, index) => {
              const featured = index === 0;
              return (
                <article
                  key={`${project.title}-${index}`}
                  className={`flex flex-col justify-between p-6 ${featured ? "md:col-span-2 md:min-h-[280px]" : "min-h-[210px]"}`}
                  style={{
                    background: featured ? t.dark : t.surface,
                    color: featured ? t.darkInk : t.ink,
                    borderRadius: 18,
                    boxShadow: `inset 0 0 0 1px ${featured ? alpha(t.darkInk, 0.18) : line}`,
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
                    <h3 style={{ fontFamily: f.display, fontSize: featured ? 40 : 26, letterSpacing: "-0.01em" }}>{project.title}</h3>
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
                        Read case study <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1200px] px-6 py-12">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: onDark }}>
              <h2 style={{ fontFamily: f.display, fontSize: 30, letterSpacing: "-0.02em" }}>Experience</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {pad(content.experience.length)} roles
              </span>
            </div>
            {content.experience.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="grid gap-1 py-5 md:grid-cols-[1fr_1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: `1px solid ${alpha(t.darkInk, 0.12)}` }}
              >
                <span style={{ fontFamily: f.display, fontSize: 21 }}>{role.title}</span>
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

      <div className="mx-auto grid gap-6 px-6 py-12 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 24, letterSpacing: "-0.01em" }}>Education</h2>
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
          <section id="elsewhere" className="p-5" style={{ background: t.surface, borderRadius: 16 }}>
            <h2 style={{ fontFamily: f.display, fontSize: 22 }}>Links</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-[11px] font-semibold capitalize"
                    style={{ background: t.bg, color: t.ink, borderRadius: 10 }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={11} style={{ color: t.muted }} />
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
