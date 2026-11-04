import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Iron Throne — a stone-grey court set on one vertical axis. Ported from the
 * canvas page `var_82d95316a7aa`; motion `stamp` deposits the hero seal.
 */
export default function IronThroneLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.16);
  const onDark = alpha(t.darkMuted, 0.26);

  /* Stone course: two sets of closely spaced joints over a fine grit. */
  const stone = `repeating-linear-gradient(90deg, ${alpha(t.darkInk, 0.035)} 0 1px, transparent 1px 7px), repeating-linear-gradient(0deg, ${alpha(t.dark, 0.18)} 0 1px, transparent 1px 9px), radial-gradient(${alpha(t.darkInk, 0.06)} 1px, transparent 1px)`;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="sticky top-0 z-30" style={{ background: t.dark, borderBottom: `1px solid ${alpha(t.darkInk, 0.12)}` }}>
        <div className="mx-auto flex h-[60px] max-w-[1160px] items-center justify-between px-7">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-7 w-7 place-items-center rounded-full text-[10px]"
              style={{ border: `1px solid ${alpha(t.darkMuted, 0.6)}`, color: t.darkMuted, fontFamily: f.display }}
            >
              {content.initial}
            </span>
            <span className="text-[10px] uppercase" style={{ letterSpacing: "0.34em", color: t.darkInk }}>
              {content.name}
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[9px] uppercase md:flex" style={{ letterSpacing: "0.24em", color: t.darkMuted, fontFamily: f.mono }}>
            <a href="#work">Deeds</a>
            <a href="#experience">Service</a>
            <a href="#education">Lineage</a>
            <a href="#elsewhere">Halls</a>
          </nav>
          <span className="hidden text-[9px] uppercase sm:block" style={{ letterSpacing: "0.22em", color: alpha(t.darkInk, 0.6) }}>
            {content.role}
          </span>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: stone, backgroundSize: "auto, auto, 5px 5px" }} />
        <div className="relative mx-auto flex max-w-[1160px] flex-col items-center px-7 pb-20 pt-16 text-center">
          <span aria-hidden className="h-14 w-px" style={{ background: `linear-gradient(${alpha(t.darkMuted, 0.6)}, transparent)` }} />
          <span aria-hidden className="mt-4 h-1.5 w-1.5 rotate-45" style={{ border: `1px solid ${t.accent}` }} />

          <p className="mt-6 text-[9px] uppercase" style={{ letterSpacing: "0.5em", color: t.darkMuted, fontFamily: f.mono }}>
            {content.role}
          </p>
          <h1
            className="mt-5"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(2.6rem, 6.4vw, 4.9rem)",
              lineHeight: 1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {content.name}
          </h1>

          <div className="mt-6 flex w-full max-w-[520px] items-center gap-4">
            <span className="h-px flex-1" style={{ background: alpha(t.darkMuted, 0.3) }} />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45" style={{ border: `1px solid ${t.accent}` }} />
            <span className="h-px flex-1" style={{ background: alpha(t.darkMuted, 0.3) }} />
          </div>

          <p className="mt-7 max-w-[56ch] text-[15px] leading-[1.95]" style={{ color: alpha(t.darkInk, 0.7) }}>
            {content.bio}
          </p>

          <div className="mt-9 flex items-center gap-5">
            <button
              type="button"
              data-stamp
              data-stamp-label="Sealed"
              aria-pressed="false"
              aria-label="Seal this portfolio"
              className="grid h-14 w-14 place-items-center rounded-full text-[13px] will-change-transform"
              style={{ border: `1px solid ${t.accent}`, color: alpha(t.darkInk, 0.9), fontFamily: f.display }}
            >
              {content.initial}
            </button>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: t.darkMuted, fontFamily: f.mono }}>
              {pad(content.skills.length)} skills
            </span>
          </div>

          {content.skills.length > 0 && (
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {content.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-[10px] uppercase"
                  style={{ letterSpacing: "0.14em", border: `1px solid ${alpha(t.darkInk, 0.18)}`, color: alpha(t.darkInk, 0.8) }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {content.socials.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.7) }}>
              {content.socials.map((social) => (
                <a key={social.label} href={social.url} target={isExternal(social.url) ? "_blank" : undefined} rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1160px] px-7 py-14">
          <div className="flex items-baseline justify-between">
            <h2 style={{ fontFamily: f.display, fontSize: 30, textTransform: "uppercase", letterSpacing: "0.1em" }}>Deeds</h2>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {pad(content.projects.length)} entries
            </span>
          </div>
          <div className="mt-4 h-px w-full" style={{ background: line }} />

          <div className="mx-auto mt-8 max-w-[760px] space-y-4">
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="px-7 py-6"
                style={{ background: t.surface, border: `1px solid ${alpha(t.ink, 0.16)}` }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.accent, fontFamily: f.mono }}>
                    {content.role}
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: f.mono, color: t.muted }}>
                    {project.date}
                  </span>
                </div>
                <h3 className="mt-3" style={{ fontFamily: f.display, fontSize: 27, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-3 max-w-[54ch] text-[13.5px] leading-[1.9]" style={{ color: alpha(t.ink, 0.72) }}>
                    {project.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: alpha(t.ink, 0.12) }}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-[9px] uppercase"
                      style={{ letterSpacing: "0.18em", color: t.accent }}
                    >
                      View project
                    </a>
                  ) : (
                    <span />
                  )}
                  <span aria-hidden className="h-1 w-1 rotate-45" style={{ background: alpha(t.accent, 0.7) }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: stone, backgroundSize: "auto, auto, 5px 5px" }} />
          <div className="relative mx-auto max-w-[1160px] px-7 py-14">
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontFamily: f.display, fontSize: 28, textTransform: "uppercase", letterSpacing: "0.1em" }}>Service</h2>
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {pad(content.experience.length)} roles
              </span>
            </div>
            <div className="mt-4 h-px w-full" style={{ background: onDark }} />
            {content.experience.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="grid gap-1 py-5 md:grid-cols-[240px_1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: `1px solid ${alpha(t.darkInk, 0.1)}` }}
              >
                <span style={{ fontFamily: f.display, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.06em" }}>{role.title}</span>
                <span className="text-[12.5px]" style={{ color: alpha(t.darkInk, 0.7) }}>
                  {role.description}
                </span>
                <span className="text-[9px] uppercase" style={{ letterSpacing: "0.16em", color: t.darkMuted, fontFamily: f.mono }}>
                  {role.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1160px] gap-10 px-7 py-14 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>Lineage</h2>
            <div className="mt-4 p-2" style={{ border: `1px solid ${alpha(t.ink, 0.16)}` }}>
              <div className="p-4" style={{ border: `1px solid ${alpha(t.ink, 0.12)}` }}>
                {content.education.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-baseline justify-between gap-3 py-2.5"
                    style={{ borderTop: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.12)}` }}
                  >
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
            <h2 style={{ fontFamily: f.display, fontSize: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>Halls</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 px-4 py-3 text-[9px] uppercase"
                    style={{ letterSpacing: "0.18em", border: `1px solid ${alpha(t.ink, 0.16)}`, color: t.ink, fontFamily: f.mono }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={12} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <span aria-hidden style={{ color: t.accent }}>
                      +
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer style={{ borderTop: `1px solid ${line}` }}>
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-7 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.24em", color: t.muted, fontFamily: f.mono }}>
          <span>
            {content.name} — {content.role}
          </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
