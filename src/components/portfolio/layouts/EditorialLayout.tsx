import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

/**
 * Hand-drawn rule the `runeDraw` mechanic completes on hover / focus. It sits on
 * the hairline a heading already has, so the section never waits on the motion.
 */
function RuneRule({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-1 h-[6px] w-full"
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

export default function EditorialLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const poster = /Bebas|Archivo/i.test(f.display);
  const line = alpha(t.ink, 0.16);
  const hair = alpha(t.ink, 0.1);
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
          className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-3 text-[9px] uppercase"
          style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}
        >
          <span className="font-semibold" style={{ color: t.ink }}>
            {content.name}
          </span>
          <nav className="flex items-center gap-6">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          <span>{content.role}</span>
        </div>
      </header>

      <section id="top" data-streak-host className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-10 md:pt-14">
        {template.motion === "orbit" && (
          <div data-orbit aria-hidden className="pointer-events-none absolute -top-10 right-0 hidden h-[420px] w-[420px] opacity-40 md:block">
            {[190, 150, 108].map((size, index) => (
              <span
                key={size}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  right: 210 - size / 2,
                  top: 210 - size / 2,
                  border: `${index === 1 ? 2 : 1}px ${index === 1 ? "dashed" : "solid"} ${alpha(t.accent, 0.35)}`,
                }}
              />
            ))}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-end">
          <h1
            style={{
              fontFamily: f.display,
              fontSize: "clamp(3.4rem, 10vw, 8rem)",
              lineHeight: 0.84,
              letterSpacing: poster ? "0.005em" : "-0.03em",
              textTransform: poster ? "uppercase" : "none",
              fontWeight: poster ? 400 : 700,
            }}
          >
            {content.firstName}
            <br />
            <span style={{ color: t.accent }}>{content.lastName || "\u00A0"}</span>
          </h1>
          <div className="md:pb-2">
            <p className="text-[9px] uppercase" style={{ letterSpacing: "0.28em", color: t.accent, fontFamily: f.mono }}>
              {content.role}
            </p>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.85]" style={{ color: t.muted }}>
              {content.bio}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                data-seal
                aria-pressed="false"
                aria-label="Seal this portfolio"
                className="grid h-11 w-11 place-items-center rounded-full text-[11px] will-change-transform"
                style={{ border: `1px solid ${line}`, color: t.accent, fontFamily: f.mono }}
              >
                {content.initial}
              </button>
              <span className="h-px flex-1" style={{ background: line }} />
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
                {content.skills.length} skills
              </span>
            </div>
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
              <span key={skill} data-magnet className="inline-block text-[11px] will-change-transform">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {content.projects.length > 0 && (
        <section id="work" className="mx-auto max-w-[1240px] px-6 pb-12 pt-12">
          <div data-rune-host className="relative flex items-baseline justify-between border-b pb-3" style={{ borderColor: line }}>
            <h2 style={{ fontFamily: f.display, fontSize: poster ? 34 : 30, letterSpacing: poster ? "0.02em" : "-0.02em", textTransform: poster ? "uppercase" : "none" }}>
              Selected work
            </h2>
            <RuneRule color={t.accent} />
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.muted, fontFamily: f.mono }}>
              {String(content.projects.length).padStart(2, "0")} projects
            </span>
          </div>

          <div className="grid border-b md:grid-cols-3" style={{ borderColor: line }}>
            {content.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                data-magnet
                className="group border-b px-1 py-6 will-change-transform md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                style={{ borderColor: line }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: t.accent, fontFamily: f.mono }}>
                    {content.role}
                  </span>
                  <span className="text-[9px]" style={{ color: t.muted, fontFamily: f.mono }}>
                    {project.date}
                  </span>
                </div>
                <h3
                  className="mt-3"
                  style={{
                    fontFamily: f.display,
                    fontSize: poster ? 30 : 25,
                    lineHeight: 1.08,
                    letterSpacing: poster ? "0.02em" : "-0.01em",
                    textTransform: poster ? "uppercase" : "none",
                  }}
                >
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-3 max-w-[42ch] text-[13px] leading-[1.8]" style={{ color: t.muted }}>
                    {project.description}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target={isExternal(project.link) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase"
                    style={{ letterSpacing: "0.2em", color: t.ink, fontFamily: f.mono }}
                  >
                    View <ArrowUpRight size={12} />
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
            <div data-rune-host className="relative flex items-baseline justify-between border-b pb-3" style={{ borderColor: onDark }}>
              <h2 style={{ fontFamily: f.display, fontSize: poster ? 30 : 26, letterSpacing: poster ? "0.02em" : "0", textTransform: poster ? "uppercase" : "none" }}>
                Experience
              </h2>
              <RuneRule color={t.darkInk} />
              <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: alpha(t.darkInk, 0.6), fontFamily: f.mono }}>
                {String(content.experience.length).padStart(2, "0")} roles
              </span>
            </div>
            <div className="grid gap-8 pt-6 md:grid-cols-2">
              {content.experience.map((role, index) => (
                <div key={`${role.title}-${index}`} className="border-b pb-4" style={{ borderColor: alpha(t.darkInk, 0.12) }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p style={{ fontFamily: f.display, fontSize: 21, letterSpacing: poster ? "0.02em" : "0", textTransform: poster ? "uppercase" : "none" }}>
                      {role.title}
                    </p>
                    <span className="text-[9px] uppercase" style={{ letterSpacing: "0.18em", color: alpha(t.darkInk, 0.55), fontFamily: f.mono }}>
                      {role.date}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px]" style={{ color: alpha(t.darkInk, 0.72) }}>
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
            <div data-rune-host className="relative inline-block">
              <h2 style={{ fontFamily: f.display, fontSize: 22, letterSpacing: poster ? "0.02em" : "0", textTransform: poster ? "uppercase" : "none" }}>
                Education
              </h2>
              <RuneRule color={t.accent} />
            </div>
            <div className="mt-4 border-t" style={{ borderColor: line }}>
              {content.education.map((item) => (
                <div key={item.title} className="flex items-baseline justify-between gap-4 border-b py-3.5" style={{ borderColor: hair }}>
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
            <div data-rune-host className="relative inline-block">
              <h2 style={{ fontFamily: f.display, fontSize: 22, letterSpacing: poster ? "0.02em" : "0", textTransform: poster ? "uppercase" : "none" }}>
                Elsewhere
              </h2>
              <RuneRule color={t.accent} />
            </div>
            <div className="mt-4 border-t" style={{ borderColor: line }}>
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 border-b py-3.5"
                    style={{ borderColor: hair }}
                  >
                    <span className="flex items-center gap-3 text-[13px] capitalize">
                      <Icon size={14} style={{ color: t.accent }} />
                      {social.label}
                    </span>
                    <ArrowUpRight size={13} style={{ color: t.muted }} />
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer className="border-t" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-[9px] uppercase" style={{ letterSpacing: "0.22em", color: t.muted, fontFamily: f.mono }}>
          <span>{content.name}</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
