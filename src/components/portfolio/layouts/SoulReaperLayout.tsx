import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const pad = (value: number) => String(value).padStart(2, "0");

/** The rule the `runeDraw` motion inks in beneath a section heading. */
function RuneRule({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      className="mt-2 block h-[6px] w-24"
      viewBox="0 0 96 6"
      preserveAspectRatio="none"
    >
      <path
        data-rune
        d="M0 3 C26 1, 62 5, 96 2"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Soul Reaper — cold print page with a dark skills band and engraved rules.
 * Ported from the canvas page `var_4884b516601d`; motion `runeDraw` inks each
 * section rule on hover / focus.
 */
export default function SoulReaperLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.16);
  const onDark = alpha(t.darkInk, 0.2);

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="border-b" style={{ borderColor: line }}>
        <div
          className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-3 text-[9px] uppercase"
          style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}
        >
          <a href="#top" className="font-semibold" style={{ color: t.ink }}>
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

      <section id="top" className="relative mx-auto max-w-[1240px] overflow-hidden px-6 pb-10 pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
          style={{ border: `1px solid ${alpha(t.accent, 0.18)}` }}
        />
        <div aria-hidden className="pointer-events-none absolute right-16 top-0 hidden h-full w-px md:block" style={{ background: alpha(t.ink, 0.08) }} />

        <div className="relative grid gap-10 md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-[10px] uppercase" style={{ letterSpacing: "0.3em", color: t.accent, fontFamily: f.mono }}>
              {content.role}
            </p>
            <h1
              className="mt-5"
              style={{
                fontFamily: f.display,
                fontSize: "clamp(2.8rem, 7vw, 5.6rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              {content.firstName}
              <br />
              <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.9]" style={{ color: alpha(t.ink, 0.76) }}>
              {content.bio}
            </p>
          </div>

          <div className="self-end border-t pt-4" style={{ borderColor: line }}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Role", value: content.role },
                { label: "Skills", value: pad(content.skills.length) },
                { label: "Links", value: pad(content.socials.length) },
                { label: "Latest", value: content.experience[0]?.date ?? "—" },
              ].map((cell) => (
                <div key={cell.label}>
                  <dt className="text-[8px] uppercase" style={{ letterSpacing: "0.24em", color: t.muted, fontFamily: f.mono }}>
                    {cell.label}
                  </dt>
                  <dd className="mt-1 truncate text-[12px] font-semibold">{cell.value}</dd>
                </div>
              ))}
            </dl>
            {content.socials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-4 text-[10px] uppercase" style={{ letterSpacing: "0.18em", color: t.accent }}>
                {content.socials.slice(0, 2).map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                  >
                    {social.label} <ArrowUpRight size={11} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {content.skills.length > 0 && (
        <div style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3.5">
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
              Skills
            </span>
            {content.skills.map((skill) => (
              <span key={skill} className="text-[11px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1240px] px-6 pb-12 pt-12">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
            <div data-rune-host>
              <h2 style={{ fontFamily: f.display, fontSize: 32, letterSpacing: "-0.01em", fontWeight: 600 }}>Selected work</h2>
              <RuneRule color={t.accent} />
            </div>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {pad(content.projects.length)} projects
            </span>
          </div>

          <div className="grid border-b md:grid-cols-3" style={{ borderColor: line }}>
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="border-b px-1 py-6 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                style={{ borderColor: line }}
              >
                <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.muted }}>
                  {project.date}
                </span>
                <h3 className="mt-3" style={{ fontFamily: f.display, fontSize: 22, fontWeight: 600, letterSpacing: "-0.005em" }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-2 text-[12.5px] leading-[1.8]" style={{ color: alpha(t.ink, 0.74) }}>
                    {project.description}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target={isExternal(project.link) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase"
                    style={{ letterSpacing: "0.18em", color: t.accent }}
                  >
                    Read case study <ArrowUpRight size={11} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.darkInk }}>
          <div className="mx-auto max-w-[1240px] px-6 py-12">
            <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: onDark }}>
              <div data-rune-host>
                <h2 style={{ fontFamily: f.display, fontSize: 28 }}>Experience</h2>
                <RuneRule color={t.darkInk} />
              </div>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {pad(content.experience.length)} roles
              </span>
            </div>
            <div className="grid gap-8 pt-6 md:grid-cols-2">
              {content.experience.map((role, index) => (
                <div key={`${role.title}-${index}`} className="border-b pb-4" style={{ borderColor: alpha(t.darkInk, 0.12) }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p style={{ fontFamily: f.display, fontSize: 21 }}>{role.title}</p>
                    <span className="text-[9px]" style={{ fontFamily: f.mono, color: alpha(t.darkInk, 0.55) }}>
                      {role.date}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-12 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <div data-rune-host>
              <h2 style={{ fontFamily: f.display, fontSize: 22 }}>Education</h2>
              <RuneRule color={t.accent} />
            </div>
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
            <div data-rune-host>
              <h2 style={{ fontFamily: f.display, fontSize: 22 }}>Elsewhere</h2>
              <RuneRule color={t.accent} />
            </div>
            <div className="mt-4" style={{ borderTop: `1px solid ${line}` }}>
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 py-3 text-[12px] capitalize"
                    style={{ borderBottom: `1px solid ${line}`, color: t.ink }}
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

      <footer className="border-t" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
