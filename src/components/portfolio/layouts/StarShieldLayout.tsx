import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal } from "../parts";

const STAR = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

function Star({ size, color }: { size: number; color: string }) {
  return <span aria-hidden style={{ display: "block", width: size, height: size, background: color, clipPath: STAR }} />;
}

/** Centred rule — star — rule, the divider this template uses everywhere. */
function Divider({ color, starSize = 7, ruleWidth = 80 }: { color: string; starSize?: number; ruleWidth?: number }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span style={{ display: "block", height: 1, width: ruleWidth, background: color }} />
      <Star size={starSize} color={color} />
      <span aria-hidden style={{ display: "block", height: 1, width: ruleWidth, background: color }} />
    </div>
  );
}

/**
 * Star Shield — a civic monument on one centred axis. Ported from the canvas
 * page `var_5a78107acc92`; motion `sealPress` compresses and latches a real
 * seal button, and latching it prints the concentric seal impression behind the
 * hero.
 */
export default function StarShieldLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const line = alpha(t.ink, 0.15);
  const rule = alpha(t.ink, 0.25);
  const onDark = alpha(t.bg, 0.12);
  const stats = [
    { label: "Projects", value: content.projects.length },
    { label: "Roles", value: content.experience.length },
    { label: "Schools", value: content.education.length },
  ];

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="relative z-20 border-b" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-6 pt-7">
          <a href="#top" className="flex items-center gap-4">
            <span style={{ display: "block", height: 1, width: 56, background: alpha(t.ink, 0.28) }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.42em" }}>
              {content.name}
            </span>
            <span style={{ display: "block", height: 1, width: 56, background: alpha(t.ink, 0.3) }} />
          </a>
          <nav
            className="mt-5 flex w-full items-center justify-center border-t py-3 text-[9px] uppercase"
            style={{ borderColor: alpha(t.ink, 0.12), fontFamily: f.mono, letterSpacing: "0.28em", color: t.muted }}
          >
            {[
              ["About", "#about"],
              ["Work", "#work"],
              ["Experience", "#experience"],
              ["Education", "#education"],
              ["Elsewhere", "#elsewhere"],
            ].map(([label, href], index) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1 sm:px-5"
                style={{ borderLeft: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.15)}` }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="top"
        data-seal-scope
        className="relative overflow-hidden border-b"
        style={{ borderColor: line }}
      >
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[400px] w-[400px] sm:h-[560px] sm:w-[560px] lg:h-[760px] lg:w-[760px]">
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: alpha(t.ink, 0.12) }} />
            <div className="absolute inset-[9%] rounded-full border" style={{ borderColor: alpha(t.ink, 0.16) }} />
            <div className="absolute inset-[18%] rounded-full border" style={{ borderColor: alpha(t.accent, 0.18) }} />
            <div
              className="absolute inset-[27%] rounded-full border border-dashed"
              style={{ borderColor: alpha(t.ink, 0.12) }}
            />
            {[
              "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
              "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
            ].map((position) => (
              <span
                key={position}
                aria-hidden
                className={`absolute ${position}`}
                style={{ width: 9, height: 9, background: alpha(t.accent, 0.45), clipPath: STAR }}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden
          data-imprint
          className="pointer-events-none absolute left-1/2 top-[52%] z-[1] hidden -translate-x-1/2 -translate-y-1/2 -rotate-[9deg] md:block"
        >
          <div
            className="grid h-[600px] w-[560px] place-items-center rounded-full"
            style={{ border: `10px solid ${alpha(t.accent, 0.3)}` }}
          >
            <div
              className="grid h-[420px] w-[430px] place-items-center rounded-full"
              style={{ border: `2px solid ${alpha(t.accent, 0.3)}` }}
            >
              <span
                aria-hidden
                style={{ width: 210, height: 210, background: alpha(t.accent, 0.3), clipPath: STAR }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-16 pt-14 text-center">
          <svg aria-hidden className="mx-auto h-[70px] w-[60px]" viewBox="0 0 72 84" fill="none">
            <path
              d="M36 3 L67 13 V40 C67 60 52 72 36 80 C20 72 5 60 5 40 V13 Z"
              stroke={alpha(t.ink, 0.4)}
              strokeWidth="1.2"
            />
            <path
              d="M36 10 L61 18 V40 C61 56 48 67 36 74 C24 67 11 56 11 40 V18 Z"
              stroke={alpha(t.accent, 0.45)}
              strokeWidth="1"
            />
            <path
              d="M36 26 L40.6 39.4 L54.6 39.4 L43.4 47.6 L47.6 61 L36 52.8 L24.4 61 L28.6 47.6 L17.4 39.4 L31.4 39.4 Z"
              fill={t.accent}
            />
          </svg>

          <h1
            className="mt-8 uppercase"
            style={{
              fontFamily: f.display,
              fontSize: "clamp(2.4rem, 8.2vw, 98px)",
              lineHeight: 0.94,
              letterSpacing: "0.03em",
            }}
          >
            {content.name}
          </h1>

          <div className="mt-8">
            <Divider color={alpha(t.ink, 0.22)} starSize={8} ruleWidth={112} />
          </div>

          <p
            className="mt-6 text-[10px] uppercase"
            style={{ fontFamily: f.mono, letterSpacing: "0.46em", color: t.muted }}
          >
            {content.role}
          </p>

          {content.skills.length > 0 && (
            <ul className="mx-auto mt-12 flex max-w-[760px] flex-wrap items-center justify-center gap-2.5">
              {content.skills.map((skill) => (
                <li
                  key={skill}
                  className="border px-4 py-[7px] text-[9px] uppercase"
                  style={{
                    borderColor: alpha(t.ink, 0.22),
                    background: alpha(t.surface, 0.55),
                    color: alpha(t.ink, 0.8),
                    fontFamily: f.mono,
                    letterSpacing: "0.24em",
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}

          {content.socials.length > 0 && (
            <div
              className="mt-10 flex flex-wrap items-center justify-center text-[9px] uppercase"
              style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.muted }}
            >
              {content.socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={isExternal(social.url) ? "_blank" : undefined}
                  rel="noreferrer"
                  className="px-5 py-1"
                  style={{ borderLeft: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.15)}` }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}

          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-px"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, ${alpha(t.ink, 0.26)} 16%, ${alpha(
                  t.ink,
                  0.26
                )} 84%, transparent)`,
              }}
            />
            <div className="relative mx-auto flex w-fit flex-col items-center gap-3 px-10 py-1" style={{ background: t.bg }}>
              <button
                type="button"
                data-seal
                aria-pressed="false"
                aria-label="Seal this portfolio"
                className="relative grid h-[76px] w-[76px] place-items-center rounded-full will-change-transform"
                style={{
                  background: t.accent,
                  color: t.accentInk,
                  boxShadow: `0 12px 24px ${alpha(t.accent, 0.22)}, inset 0 2px 0 rgba(255,255,255,.25), inset 0 -4px 0 rgba(0,0,0,.22)`,
                }}
              >
                <span className="absolute inset-[7px] rounded-full border" style={{ borderColor: alpha(t.accentInk, 0.3) }} />
                <span
                  className="absolute inset-[15px] rounded-full border border-dashed"
                  style={{ borderColor: alpha(t.accentInk, 0.22) }}
                />
                <Star size={24} color={t.accentInk} />
              </button>
              <div className="text-center">
                <span
                  className="block text-[8px] uppercase"
                  style={{ fontFamily: f.mono, letterSpacing: "0.34em", color: t.muted }}
                >
                  Seal
                </span>
                <span
                  className="mt-1 block text-[11px] uppercase"
                  style={{ fontFamily: f.mono, letterSpacing: "0.24em" }}
                >
                  <span data-seal-state="off">Unsealed</span>
                  <span data-seal-state="on">Sealed</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b" style={{ borderColor: line, background: alpha(t.surface, 0.45) }}>
        <div className="mx-auto max-w-[1180px] px-6 py-20 text-center">
          <h2 className="text-[34px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
            About
          </h2>
          <div className="mt-6">
            <Divider color={rule} ruleWidth={128} />
          </div>
          <p className="mx-auto mt-9 max-w-[62ch] text-[20px] leading-[1.78]" style={{ color: alpha(t.ink, 0.82) }}>
            {content.bio}
          </p>
          <dl
            className="mt-12 grid grid-cols-3 border-y"
            style={{ borderColor: line, fontFamily: f.mono }}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="px-3 py-6" style={{ borderLeft: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.12)}` }}>
                <dt className="text-[9px] uppercase" style={{ letterSpacing: "0.26em", color: t.muted }}>
                  {stat.label}
                </dt>
                <dd className="mt-2 text-[30px] leading-none" style={{ fontFamily: f.display, letterSpacing: "0.04em" }}>
                  {String(stat.value).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="border-b" style={{ borderColor: alpha(t.bg, 0.1) }}>
          <div className="mx-auto max-w-[1180px] px-6 pt-20 text-center">
            <h2 className="text-[38px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.04em" }}>
              Selected work
            </h2>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span style={{ display: "block", height: 1, width: 64, background: rule }} />
              <span style={{ display: "block", height: 6, width: 6, borderRadius: 999, background: t.accent }} />
              <span style={{ display: "block", height: 1, width: 64, background: rule }} />
            </div>
          </div>

          <div className="mx-auto mt-3 max-w-[900px] px-6 pb-20">
            {content.projects.map((project, index) => (
              <div key={`${project.title}-${index}`}>
                {index > 0 && (
                  <div className="flex items-center justify-center gap-3 py-5">
                    <span style={{ display: "block", height: 1, width: 48, background: alpha(t.ink, 0.18) }} />
                    <Star size={7} color={alpha(t.accent, 0.7)} />
                    <span style={{ display: "block", height: 1, width: 48, background: alpha(t.ink, 0.18) }} />
                  </div>
                )}
                <article style={{ background: t.bg, padding: 9, border: `1px solid ${alpha(t.ink, 0.15)}` }}>
                  <div
                    className="px-8 py-10 text-center"
                    style={{ border: `1px solid ${alpha(t.ink, 0.24)}`, background: alpha(t.surface, 0.4) }}
                  >
                    <div className="text-[10px]" style={{ fontFamily: f.mono, letterSpacing: "0.32em", color: t.accent }}>
                      {project.date}
                    </div>
                    <h3 className="mt-4 text-[34px] leading-none" style={{ fontFamily: f.display, letterSpacing: "0.02em" }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.68]" style={{ color: alpha(t.ink, 0.75) }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={isExternal(project.link) ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-7 inline-flex items-center gap-2 pb-1 text-[9px] uppercase"
                        style={{
                          borderBottom: `1px solid ${alpha(t.accent, 0.4)}`,
                          color: t.accent,
                          fontFamily: f.mono,
                          letterSpacing: "0.28em",
                        }}
                      >
                        Read case study <span aria-hidden>&rarr;</span>
                      </a>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" style={{ background: t.dark, color: t.bg }}>
          <div className="mx-auto max-w-[1180px] px-6 py-20">
            <div className="text-center">
              <h2 className="text-[40px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.05em" }}>
                Experience
              </h2>
              <div className="mt-6 flex items-center justify-center gap-4">
                <span style={{ display: "block", height: 1, width: 80, background: alpha(t.bg, 0.25) }} />
                <Star size={7} color={alpha(t.bg, 0.85)} />
                <span style={{ display: "block", height: 1, width: 80, background: alpha(t.bg, 0.25) }} />
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-[880px]">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="py-8 text-center"
                  style={{ borderTop: `1px solid ${onDark}`, borderBottom: index === content.experience.length - 1 ? `1px solid ${onDark}` : undefined }}
                >
                  <div
                    className="text-[10px] uppercase"
                    style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: alpha(t.bg, 0.55) }}
                  >
                    {role.date}
                  </div>
                  <h3 className="mt-3 text-[28px] leading-none" style={{ fontFamily: f.display }}>
                    {role.title}
                  </h3>
                  <p className="mt-2 text-[15px]" style={{ color: t.darkMuted }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="education" className="border-b" style={{ borderColor: line }}>
        <div className="mx-auto max-w-[1180px] px-6 py-20">
          {content.education.length > 0 && (
            <>
              <div className="text-center">
                <h2 className="text-[34px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.06em" }}>
                  Education
                </h2>
                <div className="mt-5">
                  <Divider color={rule} />
                </div>
              </div>
              <div className="mx-auto mt-10 grid max-w-[900px] gap-5 md:grid-cols-2">
                {content.education.map((item, index) => (
                  <div key={`${item.title}-${index}`} style={{ background: t.bg, padding: 9, border: `1px solid ${alpha(t.ink, 0.15)}` }}>
                    <div
                      className="px-7 py-8 text-center"
                      style={{ border: `1px solid ${alpha(t.ink, 0.24)}`, background: alpha(t.surface, 0.4) }}
                    >
                      <div className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.28em", color: t.accent }}>
                        {item.date}
                      </div>
                      <h3 className="mt-3 text-[20px] leading-tight" style={{ fontFamily: f.display }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px]" style={{ color: t.muted }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div
            aria-hidden
            className="mx-auto mt-16 h-px max-w-[900px]"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, ${alpha(t.ink, 0.26)} 16%, ${alpha(t.ink, 0.26)} 84%, transparent)`,
            }}
          />

          {content.socials.length > 0 && (
            <div id="elsewhere" className="mt-12 flex flex-col items-center gap-6">
              <h2 className="text-[28px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.08em" }}>
                Elsewhere
              </h2>
              <div
                className="flex flex-wrap items-center justify-center text-[9px] uppercase"
                style={{ fontFamily: f.mono, letterSpacing: "0.26em", color: t.muted }}
              >
                {content.socials.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="px-6 py-1"
                    style={{ borderLeft: index === 0 ? "none" : `1px solid ${alpha(t.ink, 0.15)}` }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-4 px-6 py-9">
          <div className="flex items-center gap-4">
            <span style={{ display: "block", height: 1, width: 40, background: alpha(t.ink, 0.22) }} />
            <Star size={6} color={t.accent} />
            <span style={{ display: "block", height: 1, width: 40, background: alpha(t.ink, 0.22) }} />
          </div>
          <span className="text-[10px] uppercase" style={{ fontFamily: f.display, letterSpacing: "0.4em" }}>
            {content.name}
          </span>
          <a href="#top" className="text-[9px] uppercase" style={{ fontFamily: f.mono, letterSpacing: "0.3em", color: t.accent }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
