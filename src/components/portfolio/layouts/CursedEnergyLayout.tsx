import { ArrowUpRight, Crosshair } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const pad = (value: number) => String(value).padStart(2, "0");

/* Clipped instrument plate used by every plate on this page. */
const CHAMFER = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))";

/**
 * Cursed Energy — instrumented shell, chamfered plates, tilted readouts. Ported
 * from the canvas page `var_aced5a7c1769`; motion `scramble` decodes each title.
 */
export default function CursedEnergyLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.14);
  const shellLine = alpha(t.darkInk, 0.16);

  const readouts = [
    { label: "Currently", value: content.experience[0]?.title ?? "Open" },
    { label: "Projects", value: pad(content.projects.length) },
    { label: "Skills", value: pad(content.skills.length) },
  ];

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-30" style={{ background: t.dark, color: t.darkInk }}>
        <div className="mx-auto flex h-[62px] max-w-[1240px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center text-[10px] font-bold"
              style={{ background: t.darkInk, color: t.dark, clipPath: CHAMFER }}
            >
              {content.initial}
            </span>
            <span className="text-[12px] font-semibold" style={{ fontFamily: f.display }}>
              {content.name}
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[9px] uppercase md:flex" style={{ letterSpacing: "0.24em", color: t.darkMuted, fontFamily: f.mono }}>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <span
            className="flex items-center gap-2 px-2.5 py-1 text-[9px] uppercase"
            style={{ letterSpacing: "0.18em", background: alpha(t.darkInk, 0.12), color: t.darkInk, fontFamily: f.mono }}
          >
            <span aria-hidden className="h-1.5 w-1.5" style={{ background: t.accent }} />
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${alpha(t.ink, 0.05)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(t.ink, 0.05)} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `radial-gradient(52% 48% at 82% 12%, ${alpha(t.accent, 0.22)}, transparent 68%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[64px] h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${alpha(t.accent, 0.55)}, transparent)` }}
        />

        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-6 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="text-[9px] uppercase" style={{ letterSpacing: "0.28em", color: t.accent, fontFamily: f.mono }}>
              {content.role}
            </p>
            <h1
              className="mt-4"
              style={{
                fontFamily: f.display,
                fontSize: "clamp(2.8rem, 7.4vw, 5.6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
              }}
            >
              {content.firstName}
              <br />
              <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[14.5px] leading-[1.8]" style={{ color: alpha(t.ink, 0.74) }}>
              {content.bio}
            </p>
            <a
              href="#work"
              className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 text-[9px] uppercase"
              style={{ letterSpacing: "0.22em", background: t.accent, color: t.accentInk, clipPath: CHAMFER, fontFamily: f.mono }}
            >
              <Crosshair size={12} /> Work
            </a>

            {content.skills.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-[10px]"
                    style={{ background: alpha(t.accent, 0.13), color: alpha(t.ink, 0.86), clipPath: CHAMFER }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-4" style={{ background: alpha(t.ink, 0.05), boxShadow: `inset 0 0 0 1px ${line}`, clipPath: CHAMFER }}>
            <p className="text-[8px] uppercase" style={{ letterSpacing: "0.26em", color: t.muted, fontFamily: f.mono }}>
              Readouts
            </p>
            <div className="mt-3 space-y-2">
              {readouts.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between px-3 py-2.5"
                  style={{
                    background: alpha(t.bg, 0.75),
                    boxShadow: `inset 0 0 0 1px ${line}`,
                    transform: `rotate(${index % 2 === 0 ? -1.6 : 1.2}deg)`,
                  }}
                >
                  <span className="text-[8px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
                    {item.label}
                  </span>
                  <span className="truncate text-[12px] font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            {content.socials.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3 text-[9px] uppercase" style={{ letterSpacing: "0.18em", color: t.accent, fontFamily: f.mono }}>
                {content.socials.slice(0, 3).map((social) => (
                  <a key={social.label} href={social.url} target={isExternal(social.url) ? "_blank" : undefined} rel="noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1240px] px-6 py-12">
            <div className="flex items-baseline justify-between pb-3" style={{ borderBottom: `1px solid ${shellLine}` }}>
              <h2 style={{ fontFamily: f.display, fontSize: 32, letterSpacing: "-0.01em" }}>Selected work</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted, fontFamily: f.mono }}>
                {pad(content.projects.length)} projects
              </span>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className={`flex flex-col justify-between p-6 ${index === 0 ? "md:row-span-2 md:min-h-[340px]" : "min-h-[180px]"}`}
                  style={{ background: alpha(t.darkInk, index === 0 ? 0.06 : 0.03), boxShadow: `inset 0 0 0 1px ${shellLine}`, clipPath: CHAMFER }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[8px] uppercase" style={{ letterSpacing: "0.24em", color: t.darkMuted, fontFamily: f.mono }}>
                      {pad(index + 1)}
                    </span>
                    <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.darkMuted }}>
                      {project.date}
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 data-scramble style={{ fontFamily: f.display, fontSize: index === 0 ? 40 : 26, letterSpacing: "-0.01em" }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2.5 max-w-[50ch] text-[12.5px] leading-[1.75]" style={{ color: alpha(t.darkInk, 0.7) }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase"
                        style={{ letterSpacing: "0.2em", color: t.accent }}
                      >
                        Read case study <ArrowUpRight size={11} />
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
          <div className="mx-auto max-w-[1240px] px-6 pb-12">
            <div className="flex items-baseline justify-between pb-3" style={{ borderBottom: `1px solid ${shellLine}` }}>
              <h2 style={{ fontFamily: f.display, fontSize: 26 }}>Experience</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.darkMuted, fontFamily: f.mono }}>
                {pad(content.experience.length)} roles
              </span>
            </div>
            {content.experience.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="grid gap-1 py-4 md:grid-cols-[1fr_1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: `1px solid ${alpha(t.darkInk, 0.1)}` }}
              >
                <span style={{ fontFamily: f.display, fontSize: 18 }}>{role.title}</span>
                <span className="text-[12px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                  {role.description}
                </span>
                <span className="text-[9px] uppercase" style={{ letterSpacing: "0.18em", color: t.darkMuted, fontFamily: f.mono }}>
                  {role.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 24 }}>Education</h2>
            <div className="mt-4">
              {content.education.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex items-baseline justify-between gap-4 py-3.5" style={{ borderBottom: `1px solid ${line}` }}>
                  <div>
                    <p className="text-[13.5px] font-semibold">{item.title}</p>
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
            <h2 style={{ fontFamily: f.display, fontSize: 24 }}>Links</h2>
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
                    style={{ background: t.dark, color: t.darkInk, clipPath: CHAMFER }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={11} style={{ color: t.darkMuted }} />
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer style={{ background: t.dark, color: t.darkInk }}>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
