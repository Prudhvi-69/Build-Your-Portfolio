import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

/**
 * Scarlet Speed — hard diagonals and a charge control that has to be held.
 * Ported from the canvas page `var_b1f9def77aea`; motion `chargeHold` fills the
 * meter on a press-and-hold and then jumps to the work ledger.
 */
export default function ScarletSpeedLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.25);
  const band = { transform: "skewY(-13deg) rotate(-1.5deg)" } as const;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header
        className="sticky top-0 z-30 border-b-2"
        style={{ borderColor: t.ink, background: alpha(t.bg, 0.95) }}
      >
        <div className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between px-5 md:px-7">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center text-[11px] font-semibold"
              style={{ background: t.accent, color: t.accentInk, fontFamily: f.mono }}
            >
              {content.initial}
            </span>
            <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.26em" }}>
              {content.name}
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[10px] uppercase md:flex"
            style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}
          >
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Links</a>
          </nav>
          <a
            href="#work"
            className="border-b-2 pb-1 text-[10px] uppercase md:hidden"
            style={{ borderColor: t.ink, fontFamily: f.mono, letterSpacing: "0.24em" }}
          >
            Work
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b-2" style={{ borderColor: t.ink }}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute" style={{ ...band, left: "58%", top: "-14%", width: "12%", height: 1100, background: t.surface }} />
          <div className="absolute" style={{ ...band, left: "74%", top: "-14%", width: "5%", height: 1100, background: t.accent }} />
          <div className="absolute" style={{ ...band, left: "84%", top: "-14%", width: "22%", height: 1100, background: t.ink, opacity: 0.05 }} />
          <div className="absolute" style={{ ...band, left: "-6%", top: "97%", width: "34%", height: 14, background: t.accent }} />
          {[
            { left: "6%", top: "64%", width: 180, opacity: 0.22 },
            { left: "14%", top: "68%", width: 96, opacity: 0.14 },
            { left: "2%", top: "72%", width: 240, opacity: 0.1 },
          ].map((streak) => (
            <div
              key={streak.left}
              className="absolute h-[2px]"
              style={{ left: streak.left, top: streak.top, width: streak.width, opacity: streak.opacity, background: t.ink }}
            />
          ))}
        </div>

        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-5 pb-16 pt-12 md:grid-cols-12 md:items-start md:gap-8 md:px-7 md:pb-24 md:pt-16">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em" }}>
              <span className="h-[2px] w-9" style={{ background: t.ink }} />
              <span>{content.role}</span>
            </div>
            <h1
              className="mt-6 leading-[0.82]"
              style={{ fontFamily: f.display, fontSize: "clamp(3rem, 11vw, 142px)", letterSpacing: "0.01em" }}
            >
              {content.firstName.toUpperCase()}
              <br />
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-[-10px] inset-y-[12px] -skew-y-[3deg]"
                  style={{ background: t.accent }}
                />
                <span className="relative">{content.lastName.toUpperCase()}</span>
              </span>
            </h1>
            <p className="mt-8 max-w-[48ch] text-[15px] leading-[1.62] md:text-[16px]">{content.bio}</p>

            {content.skills.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border px-2.5 py-[6px] text-[10px] uppercase"
                    style={{ borderColor: alpha(t.ink, 0.3), fontFamily: f.mono, letterSpacing: "0.16em" }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            {content.socials.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
                {content.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b pb-1 text-[10px] uppercase"
                    style={{ borderColor: alpha(t.ink, 0.35), fontFamily: f.mono, letterSpacing: "0.24em" }}
                  >
                    {social.label}
                    {isExternal(social.url) && <ArrowUpRight size={11} />}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-5 md:pl-4">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3" style={{ background: t.accent }} />
              <div className="relative px-6 py-9 md:px-7 md:py-10" style={{ background: t.ink }}>
                <button
                  type="button"
                  data-charge
                  data-charge-target="#work"
                  data-charge-done="Charged"
                  aria-label="Hold to jump to selected work"
                  className="relative mx-auto flex h-[228px] w-[228px] flex-col items-center justify-center rounded-full border-2"
                  style={{ borderColor: t.accent }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[9px] rounded-full border-2 border-dashed"
                    style={{ borderColor: alpha(t.accent, 0.45) }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[16px] rounded-full border"
                    style={{ borderColor: alpha(t.accent, 0.3) }}
                  />
                  <span className="text-[56px] leading-none" style={{ fontFamily: f.display, color: t.accent }}>
                    <span data-charge-label>Hold</span>
                  </span>
                  <span
                    className="mt-5 block h-[6px] w-[126px] overflow-hidden"
                    style={{ background: alpha(t.darkMuted, 0.25) }}
                  >
                    <span
                      data-charge-fill
                      className="block h-full w-full will-change-transform"
                      style={{ background: t.accent, transformOrigin: "left center", transform: "scaleX(0)" }}
                    />
                  </span>
                </button>
                <div
                  className="mt-7 flex items-center justify-between text-[10px] uppercase"
                  style={{ fontFamily: f.mono, letterSpacing: "0.22em", color: t.darkMuted }}
                >
                  <span>{String(content.projects.length).padStart(2, "0")} projects</span>
                  <a href="#work" style={{ color: t.accent }}>
                    Work &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="relative border-b-2" style={{ borderColor: t.ink }}>
          <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-7 md:py-20">
            <div className="flex items-end justify-between border-b-2 pb-5" style={{ borderColor: t.ink }}>
              <h2 className="text-[46px] leading-none md:text-[68px]" style={{ fontFamily: f.display, letterSpacing: "0.01em" }}>
                SELECTED WORK
              </h2>
              <span className="pb-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}>
                {String(content.projects.length).padStart(2, "0")} projects
              </span>
            </div>
            <ol>
              {content.projects.map((project, index) => (
                <li
                  key={`${project.title}-${index}`}
                  className="grid grid-cols-1 gap-3 border-b py-7 md:grid-cols-12 md:items-start md:gap-6"
                  style={{ borderColor: line }}
                >
                  <span
                    className="col-span-1 text-[30px] leading-none opacity-35 md:text-[38px]"
                    style={{ fontFamily: f.display }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-7">
                    <h3 className="text-[34px] leading-none md:text-[42px]" style={{ fontFamily: f.display }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 max-w-[54ch] text-[14px] leading-relaxed md:text-[15px]" style={{ color: t.muted }}>
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="text-[10px] uppercase md:col-span-2 md:pt-2" style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}>
                    {project.date}
                  </div>
                  <div className="md:col-span-2 md:pt-1 md:text-right">
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border-b-2 pb-1 text-[10px] uppercase"
                        style={{ borderColor: t.ink, fontFamily: f.mono, letterSpacing: "0.2em" }}
                      >
                        Read case study <span aria-hidden>&rarr;</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="relative overflow-hidden" style={{ background: t.ink, color: t.accent }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{ background: `repeating-linear-gradient(115deg, ${t.accent} 0 2px, transparent 2px 30px)` }}
          />
          <div className="relative mx-auto max-w-[1180px] px-5 py-14 md:px-7 md:py-20">
            <h2 className="text-[46px] leading-none md:text-[68px]" style={{ fontFamily: f.display }}>
              EXPERIENCE
            </h2>
            <ul className="mt-8 border-t" style={{ borderColor: alpha(t.accent, 0.3) }}>
              {content.experience.map((role, index) => (
                <li
                  key={`${role.title}-${index}`}
                  className="grid grid-cols-1 gap-2 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-6"
                  style={{ borderColor: alpha(t.accent, 0.3) }}
                >
                  <span
                    className="text-[10px] uppercase md:col-span-3"
                    style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.darkMuted }}
                  >
                    {role.date}
                  </span>
                  <h3 className="text-[32px] leading-none md:col-span-4 md:text-[38px]" style={{ fontFamily: f.display }}>
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

      {content.education.length > 0 && (
        <section id="education" className="border-b-2" style={{ borderColor: t.ink }}>
          <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-7 md:py-20">
            <div className="flex items-end justify-between border-b-2 pb-5" style={{ borderColor: t.ink }}>
              <h2 className="text-[46px] leading-none md:text-[68px]" style={{ fontFamily: f.display }}>
                EDUCATION
              </h2>
              <span className="pb-1 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}>
                {String(content.education.length).padStart(2, "0")} schools
              </span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {content.education.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="px-6 py-7"
                  style={{ background: t.surface, borderLeft: `6px solid ${t.accent}` }}
                >
                  <div className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}>
                    {item.date}
                  </div>
                  <h3 className="mt-3 text-[30px] leading-none md:text-[34px]" style={{ fontFamily: f.display }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px]" style={{ color: t.muted }}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.socials.length > 0 && (
        <section id="elsewhere" className="border-b-2" style={{ borderColor: t.ink }}>
          <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-7 md:py-20">
            <h2 className="text-[46px] leading-none md:text-[68px]" style={{ fontFamily: f.display }}>
              ELSEWHERE
            </h2>
            <div
              className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
              style={{ background: alpha(t.ink, 0.25) }}
            >
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between px-5 py-6 hover:bg-[color:var(--slot)]"
                  style={{ background: t.bg, ["--slot" as string]: t.accent }}
                >
                  <span className="text-[11px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}>
                    {social.label}
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-7">
        <span className="flex items-center gap-3 text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}>
          <span
            className="grid h-6 w-6 place-items-center text-[9px]"
            style={{ background: t.ink, color: t.accent, fontFamily: f.mono }}
          >
            {content.initial}
          </span>
          {content.name}
        </span>
        <span className="text-[10px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.24em", color: t.muted }}>
          {content.role}
        </span>
      </footer>
    </div>
  );
}
