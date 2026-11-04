import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { alpha, type TemplateDefinition } from "@/lib/templates/types";
import SignatureMotion from "../motion/SignatureMotion";
import { isExternal, socialIcon } from "../parts";

export default function PackagingLayout({
  content,
  template,
}: {
  content: PortfolioContent;
  template: TemplateDefinition;
}) {
  const t = template.theme;
  const f = template.fonts;
  const isFlap = template.motion === "flapOpen";
  const line = alpha(t.ink, 0.12);
  const rail = content.projects.length > 2;

  return (
    <div
      data-template-root
      className="relative min-h-screen overflow-x-clip"
      style={{ background: t.bg, color: t.ink, fontFamily: f.body, ["--caustic-x" as string]: "50%", ["--caustic-y" as string]: "40%" }}
    >
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />

      <header className="relative z-20 px-4 pt-4">
        <div
          className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between rounded-full px-5"
          style={{ background: "#FFFFFF", boxShadow: `0 2px 0 ${alpha(t.ink, 0.08)}` }}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold"
              style={{ background: t.accent, color: t.accentInk }}
            >
              {content.initial}
            </span>
            <span className="text-[14px] font-semibold">{content.name}</span>
          </a>
          <nav className="hidden items-center gap-6 text-[11px] font-semibold md:flex" style={{ color: t.muted }}>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#elsewhere">Elsewhere</a>
          </nav>
          {content.socials[0] && (
            <a
              href={content.socials[0].url}
              target={isExternal(content.socials[0].url) ? "_blank" : undefined}
              rel="noreferrer"
              className="rounded-full px-4 py-2 text-[11px] font-bold"
              style={{ background: t.dark, color: t.darkInk }}
            >
              {content.socials[0].label}
            </a>
          )}
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden px-4 pb-10 pt-9"
        style={{
          backgroundImage: `radial-gradient(38% 38% at var(--caustic-x) var(--caustic-y), ${alpha("#FFFFFF", 0.55)}, transparent 70%), radial-gradient(${alpha(t.accent, 0.16)} 1.5px, transparent 1.5px)`,
          backgroundSize: "auto, 18px 18px",
        }}
      >
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: t.muted }}>
              <span className="h-2 w-2 rounded-full" style={{ background: t.accent }} />
              {content.role}
            </p>
            <h1
              className="mt-4"
              style={{ fontFamily: f.display, fontSize: "clamp(3rem, 8vw, 5.6rem)", lineHeight: 0.92, fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              {content.firstName}
              <br />
              {content.lastName || "\u00A0"}
            </h1>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.75]" style={{ color: t.muted }}>
              {content.bio}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-bold"
                style={{ background: t.accent, color: t.accentInk }}
              >
                See the work <ArrowRight size={14} />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-bold"
                style={{ background: "#FFFFFF", color: t.ink }}
              >
                Experience <ArrowRight size={14} />
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { label: "Projects", value: String(content.projects.length).padStart(2, "0") },
                { label: "Roles", value: String(content.experience.length).padStart(2, "0") },
                { label: "Degrees", value: String(content.education.length).padStart(2, "0") },
              ].map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-2xl bg-white px-4 py-2.5 text-center"
                  style={{ boxShadow: `0 2px 0 ${alpha(t.ink, 0.08)}` }}
                >
                  <span className="block text-[16px] font-bold leading-none">{stat.value}</span>
                  <span className="mt-1 block text-[8px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: t.muted }}>
                    {stat.label}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="rounded-[30px] bg-white p-3.5" style={{ boxShadow: `0 10px 0 ${alpha(t.ink, 0.08)}` }}>
              <div
                className="relative grid place-items-center rounded-[22px] py-8"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${alpha(t.accent, 0.18)} 25%, transparent 25%, transparent 50%, ${alpha(t.accent, 0.18)} 50%, ${alpha(t.accent, 0.18)} 75%, transparent 75%)`,
                  backgroundSize: "22px 22px",
                }}
              >
                <div
                  className="relative h-[150px] w-[150px] overflow-hidden rounded-full"
                  style={{ boxShadow: `0 0 0 4px #FFFFFF, 0 0 0 5px ${alpha(t.ink, 0.1)}` }}
                >
                  {content.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={content.avatarUrl} alt={`Portrait of ${content.name}`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center" style={{ background: alpha(t.accent, 0.18), fontFamily: f.display, fontSize: 44, color: t.ink }}>
                      {content.initial}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 rounded-[18px] px-4 py-3" style={{ background: t.bg }}>
                <div className="flex items-baseline justify-between">
                  <p className="text-[15px] font-bold">{content.name}</p>
                  <span className="text-[8px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: t.muted }}>
                    Portfolio
                  </span>
                </div>
                <p className="mt-0.5 text-[11px]" style={{ color: t.muted }}>
                  {content.role}
                </p>
              </div>
            </div>
            <span
              className="absolute -bottom-4 -left-4 grid h-14 w-14 place-items-center rounded-full text-[13px] font-bold"
              style={{ background: t.dark, color: t.darkInk, boxShadow: `0 4px 0 ${alpha(t.ink, 0.2)}` }}
            >
              {content.initial}
            </span>
          </div>
        </div>

        <svg aria-hidden viewBox="0 0 200 96" className="mx-auto mt-10 block w-[190px]">
          <path d="M12 40 L100 6 L188 40" fill="none" stroke={t.ink} strokeWidth="2" strokeLinejoin="round" />
          <rect x="28" y="40" width="144" height="50" rx="4" fill="none" stroke={t.ink} strokeWidth="2" />
          <rect x="92" y="62" width="22" height="28" rx="3" fill={t.ink} />
          {[40, 62, 126, 148].map((x) => (
            <rect key={x} x={x} y="52" width="16" height="14" rx="3" fill={t.accent} data-reveal />
          ))}
          <circle cx="100" cy="30" r="5" fill={t.accent} />
        </svg>
      </section>

      <section className="bg-white/70 px-4 py-10">
        <div className="mx-auto max-w-[1180px]">
          <h2 style={{ fontFamily: f.display, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>Skills</h2>
          <div className="mt-5 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              {[
                { label: "Current role", value: content.experience[0]?.title ?? "—" },
                { label: "Education", value: content.education[0]?.title ?? "—" },
                { label: "Projects shown", value: String(content.projects.length).padStart(2, "0") },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between border-b py-2.5" style={{ borderColor: line }}>
                  <span className="text-[12px]" style={{ color: t.muted }}>
                    {row.label}
                  </span>
                  <span className="text-[12px] font-bold">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-start gap-2.5">
              {content.skills.map((skill, index) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full px-4 py-2 text-[12px] font-bold"
                  style={{
                    background: index === 0 ? t.accent : index === 2 ? t.dark : "#FFFFFF",
                    color: index === 0 ? t.accentInk : index === 2 ? t.darkInk : t.ink,
                    boxShadow: `0 3px 0 ${alpha(t.ink, 0.1)}`,
                    transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.projects.length > 0 && (
        <section id="work" className="px-4 pb-12 pt-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-center justify-between">
              <h2 style={{ fontFamily: f.display, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>Selected work</h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: t.muted }}>
                  {String(content.projects.length).padStart(2, "0")} projects
                </span>
                {rail && (
                  <span className="flex items-center gap-1.5">
                    <button type="button" data-rail-step="prev" aria-label="Previous project" className="grid h-8 w-8 place-items-center rounded-full bg-white" style={{ color: t.ink, boxShadow: `0 2px 0 ${alpha(t.ink, 0.12)}` }}>
                      <ArrowLeft size={14} />
                    </button>
                    <button type="button" data-rail-step="next" aria-label="Next project" className="grid h-8 w-8 place-items-center rounded-full" style={{ background: t.dark, color: t.darkInk }}>
                      <ArrowRight size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>

            <div
              data-rail
              className="mt-6 flex gap-4 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory", cursor: rail ? "grab" : "default" }}
            >
              {content.projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  data-flap={isFlap ? "" : undefined}
                  role={isFlap ? "button" : undefined}
                  tabIndex={isFlap ? 0 : undefined}
                  aria-expanded={isFlap ? "false" : undefined}
                  className="relative flex min-h-[196px] w-[86%] shrink-0 flex-col justify-between overflow-hidden rounded-[26px] p-6 md:w-[46%]"
                  style={{
                    scrollSnapAlign: "start",
                    background: index === 0 ? t.accent : index === 1 ? t.dark : "#FFFFFF",
                    color: index === 0 ? t.accentInk : index === 1 ? t.darkInk : t.ink,
                    boxShadow: `0 8px 0 ${alpha(t.ink, 0.1)}`,
                  }}
                >
                  {index === 0 && template.art.project && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={template.art.project} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase" style={{ letterSpacing: "0.16em", opacity: 0.8 }}>
                      {content.role}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-bold" style={{ opacity: 0.8 }}>
                        {project.date}
                      </span>
                      {isFlap && (
                        <span
                          className="flap-toggle grid h-7 w-7 place-items-center rounded-full"
                          style={{ border: "1px solid currentColor", opacity: 0.75 }}
                          aria-hidden
                        >
                          <Plus size={13} />
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="relative mt-10">
                    <h3 style={{ fontFamily: f.display, fontSize: 32, fontWeight: 600, lineHeight: 1.05 }}>{project.title}</h3>
                    <div className={isFlap ? "flap-reveal" : undefined}>
                      {project.description && (
                        <p className="mt-2 max-w-[46ch] text-[12.5px] leading-[1.7]" style={{ opacity: 0.85 }}>
                          {project.description}
                        </p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target={isExternal(project.link) ? "_blank" : undefined}
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold"
                          style={{ opacity: 0.95 }}
                        >
                          View project <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.experience.length > 0 && (
        <section id="experience" className="bg-white/70 px-4 py-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontFamily: f.display, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>Experience</h2>
              <span className="text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: t.muted }}>
                {content.experience[content.experience.length - 1]?.date?.split("—")[0]?.trim() ?? ""} — present
              </span>
            </div>
            <div className="mt-4">
              {content.experience.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
                  className="grid items-baseline gap-1 border-b py-4 md:grid-cols-[140px_1fr_auto] md:gap-6"
                  style={{ borderColor: line }}
                >
                  <span className="text-[11px] font-bold" style={{ color: t.accent }}>
                    {role.date}
                  </span>
                  <div>
                    <p className="text-[17px] font-semibold">{role.title}</p>
                    <p className="text-[12px]" style={{ color: t.muted }}>
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 md:grid-cols-2">
        {content.education.length > 0 && (
          <section id="education">
            <h2 style={{ fontFamily: f.display, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Education</h2>
            <div className="mt-4">
              {content.education.map((item) => (
                <div key={item.title} className="flex items-baseline justify-between gap-4 border-b py-3" style={{ borderColor: line }}>
                  <div>
                    <p className="text-[14px] font-semibold">{item.title}</p>
                    <p className="text-[11px]" style={{ color: t.muted }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: t.muted }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.socials.length > 0 && (
          <section id="elsewhere">
            <h2 style={{ fontFamily: f.display, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Elsewhere</h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {content.socials.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={isExternal(social.url) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-[11px] font-bold"
                    style={{ boxShadow: `0 2px 0 ${alpha(t.ink, 0.08)}`, color: t.ink }}
                  >
                    <Icon size={14} style={{ color: t.accent }} />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <footer className="px-4 pb-6">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase" style={{ letterSpacing: "0.12em", color: t.muted }}>
          <span>{content.name}</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
