import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/**
 * Abyss Light — a descending water column over a draggable project rail.
 * Ported from the canvas page `var_cb5494e771e8`; motion `dragRail` binds the
 * rail itself and the two step buttons beside the work heading.
 */
export default function AbyssLightLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.1);
  const counts = [
    { label: "Projects", value: content.projects.length },
    { label: "Experience", value: content.experience.length },
    { label: "Education", value: content.education.length },
    { label: "Links", value: content.socials.length },
  ];

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b"
        style={{ borderColor: line, background: alpha(t.bg, 0.95) }}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-7">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-full border text-[10px]"
              style={{ borderColor: t.accent, color: t.accent, fontFamily: f.mono, letterSpacing: "0.06em" }}
            >
              {content.initial}
            </span>
            <span className="text-[16px]" style={{ fontFamily: f.display }}>
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-8 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.muted }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <a
            href="#work"
            className="border-b pb-1 text-[10px] uppercase md:hidden"
            style={{ borderColor: alpha(t.accent, 0.5), color: t.accent, fontFamily: f.mono, letterSpacing: "0.26em" }}
          >
            Work
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${t.bg} 0%, ${t.bg} 22%, ${t.surface} 44%, ${t.accent} 74%, ${t.dark} 100%)`,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[
            { left: "4%", top: "-16%", width: 130, height: 900, opacity: 0.45 },
            { left: "47%", top: "-14%", width: 62, height: 820, opacity: 0.32 },
            { left: "76%", top: "-10%", width: 150, height: 860, opacity: 0.26 },
          ].map((shaft) => (
            <div
              key={shaft.left}
              className="absolute"
              style={{
                left: shaft.left,
                top: shaft.top,
                width: shaft.width,
                height: shaft.height,
                opacity: shaft.opacity,
                transform: "skewX(-11deg)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0))",
              }}
            />
          ))}
          {[
            { left: "6%", top: "44%", width: 560, height: 230 },
            { left: "52%", top: "56%", width: 420, height: 180 },
          ].map((glow) => (
            <div
              key={glow.left}
              className="absolute rounded-full"
              style={{
                left: glow.left,
                top: glow.top,
                width: glow.width,
                height: glow.height,
                background: `radial-gradient(circle, ${alpha(t.bg, 0.32)}, ${alpha(t.bg, 0)} 68%)`,
              }}
            />
          ))}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              top: "54%",
              background: `repeating-linear-gradient(180deg, ${alpha(t.bg, 0.13)} 0 1px, transparent 1px 36px)`,
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[748px] max-w-[1180px] flex-col px-5 pt-11 md:px-7 md:pt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div
                className="flex items-center gap-3 text-[10px] uppercase"
                style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.muted }}
              >
                <span className="h-px w-10" style={{ background: t.accent }} />
                <span>{content.role}</span>
              </div>
              <h1
                className="mt-6 text-[62px] leading-[0.96] md:text-[112px]"
                style={{ fontFamily: f.display, fontWeight: 300, letterSpacing: "-0.01em" }}
              >
                {content.firstName}
                <br />
                {content.lastName}
              </h1>
              <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.72]" style={{ color: alpha(t.ink, 0.85) }}>
                {content.bio}
              </p>
              {content.skills.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {content.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border px-3 py-[6px] text-[10px] uppercase"
                      style={{
                        borderColor: alpha(t.accent, 0.35),
                        background: alpha(t.bg, 0.7),
                        color: alpha(t.ink, 0.8),
                        fontFamily: f.mono,
                        letterSpacing: "0.14em",
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {content.socials.length > 0 && (
              <div className="md:col-span-5 md:pt-2">
                <div className="rounded-[3px] border px-6 py-6" style={{ borderColor: alpha(t.ink, 0.12), background: alpha(t.bg, 0.55) }}>
                  <div className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.34em", color: t.muted }}>
                    Links
                  </div>
                  <ul className="mt-4">
                    {content.socials.map((social, index) => (
                      <li
                        key={social.label}
                        style={{ borderBottom: index === content.socials.length - 1 ? "none" : `1px solid ${alpha(t.ink, 0.1)}` }}
                      >
                        <a
                          href={social.url}
                          target={isExternal(social.url) ? "_blank" : undefined}
                          rel="noreferrer"
                          className="flex items-center justify-between py-3 text-[14px]"
                        >
                          <span>{social.label}</span>
                          <ArrowUpRight size={13} style={{ color: t.accent }} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto grid grid-cols-2 pt-14 sm:grid-cols-4">
            {counts.map((count, index) => (
              <div
                key={count.label}
                className="py-6"
                style={{
                  borderTop: `1px solid ${alpha(t.darkInk, 0.3)}`,
                  borderLeft: index === 0 ? "none" : `1px solid ${alpha(t.darkInk, 0.2)}`,
                  paddingLeft: index === 0 ? 0 : "1.5rem",
                }}
              >
                <div className="text-[22px] leading-none" style={{ fontFamily: f.mono, color: t.darkInk }}>
                  {String(count.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.darkMuted }}>
                  {count.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="border-b" style={{ borderColor: line, background: t.bg }}>
          <div className="mx-auto max-w-[1180px] px-5 pt-14 md:px-7 md:pt-20">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="text-[40px] leading-none md:text-[54px]" style={{ fontFamily: f.display }}>
                  Selected work
                </h2>
                <div className="mt-4 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.muted }}>
                  {String(content.projects.length).padStart(2, "0")} projects
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-rail-step="prev"
                  aria-label="Previous projects"
                  className="grid h-10 w-10 place-items-center rounded-full border text-[14px]"
                  style={{ borderColor: alpha(t.ink, 0.2) }}
                >
                  &larr;
                </button>
                <button
                  type="button"
                  data-rail-step="next"
                  aria-label="Next projects"
                  className="grid h-10 w-10 place-items-center rounded-full border text-[14px]"
                  style={{ borderColor: alpha(t.ink, 0.2) }}
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-[1180px] px-5 pb-16 pt-8 md:px-7 md:pb-20 md:pt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 left-0 z-10 w-8 md:w-10"
              style={{ background: `linear-gradient(to right, ${t.bg}, transparent)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 right-0 z-10 w-8 md:w-10"
              style={{ background: `linear-gradient(to left, ${t.bg}, transparent)` }}
            />
            <div data-rail className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="w-[80vw] shrink-0 snap-start rounded-[3px] border-t-2 p-6 md:w-[372px] md:p-7"
                  style={{ borderColor: t.accent, background: t.surface }}
                >
                  <div
                    className="flex items-center justify-between text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.date}</span>
                  </div>
                  <h3 className="mt-5 text-[27px] leading-tight md:text-[30px]" style={{ fontFamily: f.display }}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-3 text-[14px] leading-[1.65]" style={{ color: t.muted }}>
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target={isExternal(project.link) ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 border-b pb-1 text-[10px] uppercase"
                      style={{ borderColor: alpha(t.accent, 0.5), color: t.accent, fontFamily: f.mono, letterSpacing: "0.22em" }}
                    >
                      Read case study <span aria-hidden>&rarr;</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="relative overflow-hidden" style={{ background: t.dark, color: t.darkInk }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {[
              { left: "-6%", top: "-10%", width: 480, height: 220, opacity: 0.35 },
              { left: "62%", top: "40%", width: 520, height: 240, opacity: 0.22 },
            ].map((glow) => (
              <div
                key={glow.left}
                className="absolute rounded-full"
                style={{
                  left: glow.left,
                  top: glow.top,
                  width: glow.width,
                  height: glow.height,
                  opacity: glow.opacity,
                  background: `radial-gradient(circle, ${alpha(t.bg, 0.32)}, ${alpha(t.bg, 0)} 68%)`,
                }}
              />
            ))}
          </div>
          <div className="relative mx-auto max-w-[1180px] px-5 py-14 md:px-7 md:py-20">
            <h2 className="text-[40px] leading-none md:text-[54px]" style={{ fontFamily: f.display }}>
              Experience
            </h2>
            <ul className="mt-10">
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
                  style={{
                    borderTop: `1px solid ${alpha(t.darkInk, 0.2)}`,
                    borderBottom:
                      index === content.experience.length - 1 ? `1px solid ${alpha(t.darkInk, 0.2)}` : undefined,
                  }}
                >
                  <span
                    className="text-[10px] uppercase md:col-span-3"
                    style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.darkMuted }}
                  >
                    {role.date}
                  </span>
                  <h3 className="text-[26px] leading-none md:col-span-4 md:text-[30px]" style={{ fontFamily: f.display }}>
                    {role.title}
                  </h3>
                  <p className="text-[14px] md:col-span-5 md:text-right" style={{ color: t.darkMuted }}>
                    {role.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 border-b md:grid-cols-2" style={{ borderColor: line }}>
        {content.education.length > 0 && (
          <div id="education" className="px-5 py-14 md:px-10 md:py-20" style={{ background: t.bg }}>
            <h2 className="text-[34px] leading-none md:text-[40px]" style={{ fontFamily: f.display }}>
              Education
            </h2>
            <div className="mt-8 space-y-8">
              {content.education.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="border-l-2 pl-5"
                  style={{ borderColor: t.accent }}
                >
                  <div className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.muted }}>
                    {item.date}
                  </div>
                  <h3 className="mt-3 text-[23px] leading-snug" style={{ fontFamily: f.display }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14px]" style={{ color: t.muted }}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {content.socials.length > 0 && (
          <div id="elsewhere" className="px-5 py-14 md:px-10 md:py-20" style={{ background: t.surface }}>
            <h2 className="text-[34px] leading-none md:text-[40px]" style={{ fontFamily: f.display }}>
              Elsewhere
            </h2>
            <ul className="mt-8">
              {content.socials.map((social, index) => (
                <li
                  key={social.label}
                  style={{ borderBottom: index === content.socials.length - 1 ? "none" : `1px solid ${alpha(t.ink, 0.12)}` }}
                >
                  <a
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between py-4 text-[15px]"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={12} style={{ color: t.accent }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="px-5 py-8 md:px-7" style={{ background: t.dark }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4">
          <span
            className="flex items-center gap-3 text-[10px] uppercase"
            style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.darkMuted }}
          >
            <span
              className="grid h-6 w-6 place-items-center rounded-full border text-[9px]"
              style={{ borderColor: alpha(t.darkInk, 0.5), color: t.darkInk }}
            >
              {content.initial}
            </span>
            {content.name}
          </span>
          <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.darkMuted }}>
            {content.role}
          </span>
        </div>
      </footer>
    </div>
  );
}
