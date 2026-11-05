import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  BarChart3,
  Check,
  Globe2,
  Layers3,
  MoveUpRight,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import TemplateStrip from "@/components/marketing/TemplateStrip";
import { TEMPLATES } from "@/lib/templates/registry";
import { SAMPLE_CONTENT } from "@/lib/portfolio/content";

/** The hero preview shows the real sample portfolio, never invented copy. */
const PREVIEW = SAMPLE_CONTENT;
const PREVIEW_PROJECTS = PREVIEW.projects.slice(0, 3);
const PREVIEW_SOCIALS = PREVIEW.socials.filter((social) => social.label !== "Email").slice(0, 2);

const steps = [
  {
    number: "01",
    title: "Bring your story.",
    description: "Add the projects, skills, and little details that make your work unmistakably yours.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Pick a world.",
    description: "Choose from 22 designed templates. Each one carries its own type, colour and interaction.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Publish and count.",
    description: "Share one link, then watch each portfolio's visit count from your dashboard.",
    icon: Globe2,
  },
];

const guarantees = [
  {
    title: "Visit counts you can see",
    description: "Every published link records its own visits, so you know which portfolio actually gets read.",
    icon: BarChart3,
  },
  {
    title: "A profile behind the page",
    description: "One account, one profile, every portfolio you own — published or draft — in a single place.",
    icon: UserRound,
  },
  {
    title: "Real addresses only",
    description: "Sign-up checks the address before an account exists, so a typo never costs you your login.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-grid relative overflow-hidden px-5 pb-20 pt-16 text-[#f5f5ee] sm:px-8 sm:pb-28 sm:pt-24">
        <div className="pointer-events-none absolute -right-36 -top-40 h-[540px] w-[540px] rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-[380px] w-[380px] rounded-full border border-white/[0.1]" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="max-w-[660px]">
            <div className="eyebrow mb-8 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d7ff70]" />
              A little more you. A lot more memorable.
            </div>
            <h1 className="serif-display max-w-[720px] text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.91]">
              Your work deserves <span className="text-[#d7ff70]">a better introduction.</span>
            </h1>
            <p className="mt-8 max-w-[460px] text-[16px] leading-7 text-white/65 sm:text-[18px]">
              A portfolio that feels like you, not another template. Pull your best work into one beautiful place and get it out into the world.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="accent-action inline-flex items-center gap-3 px-6 py-4 text-[14px] font-bold">
                Make your portfolio <ArrowUpRight size={17} />
              </Link>
              <Link href="/features" className="inline-flex items-center gap-2 px-2 py-3 text-[14px] font-medium text-white/80 transition-colors hover:text-[#d7ff70]">
                Take a look <MoveUpRight size={15} />
              </Link>
            </div>
            <div className="mt-11 flex items-center gap-4 text-[12px] text-white/55">
              <div className="flex -space-x-2">
                {["#e59476", "#c5d283", "#a9b5d7", "#e0bd78"].map((color, i) => (
                  <span key={color} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#173f35] text-[11px] font-bold text-[#19352e]" style={{ backgroundColor: color }}>
                    {["M", "J", "A", "K"][i]}
                  </span>
                ))}
              </div>
              <span>For the work you can&apos;t wait to share.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] lg:pl-5">
            <div className="absolute -left-3 top-8 z-10 rounded-2xl bg-[#d7ff70] px-4 py-3 text-[#19352e] shadow-xl sm:-left-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em]">Your next chapter</span>
              <span className="mt-1 block text-[13px] font-semibold">Starts with one link ↗</span>
            </div>
            <div className="preview-window overflow-hidden rounded-[24px] border border-white/15 bg-[#fbf8ef] text-[#19352e]">
              <div className="flex h-11 items-center gap-2 border-b border-[#e5e3d9] bg-[#f4f1e8] px-4">
                <i className="h-2.5 w-2.5 rounded-full bg-[#ed8571]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#e8bd57]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#91bd77]" />
                <div className="mx-auto rounded-full bg-white/80 px-12 py-1 text-[9px] text-[#849087] sm:px-20">
                  profolion.netlify.app / {PREVIEW.firstName.toLowerCase()}
                </div>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-[0.92fr_1.08fr] sm:gap-7 sm:p-8">
                <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[18px] bg-[#203e35] p-5 text-white sm:min-h-[332px] sm:p-6">
                  <Asterisk className="absolute -right-10 top-16 text-[#d7ff70]/10" size={150} strokeWidth={0.75} />
                  <div className="relative z-[1] flex items-center gap-2 text-[10px] font-semibold tracking-wide text-white/70">
                    <span className="brand-mark !h-7 !w-7 !rounded-lg !text-sm">p.</span>
                    INDEPENDENT CREATIVE
                  </div>
                  {/* Kept in the top-right corner, clear of the badge and the
                      name, so "Prudhvi S." is never covered by artwork. */}
                  <div className="preview-orb absolute -right-6 -top-6 h-[92px] w-[86px] rounded-[45%_45%_14px_14px] opacity-70 sm:h-[104px] sm:w-[96px]" />
                  <div className="relative z-[1]">
                    <div className="mb-3 inline-flex rounded-full border border-white/20 px-3 py-1 text-[9px] text-white/80">AVAILABLE FOR SELECT PROJECTS</div>
                    <h2 className="serif-display relative z-[2] text-[46px] leading-[0.92] sm:text-[55px]">
                      {PREVIEW.firstName}
                      {PREVIEW.lastName ? (
                        <>
                          <br />
                          {PREVIEW.lastName}
                        </>
                      ) : null}
                      <span className="text-[#d7ff70]">.</span>
                    </h2>
                    <p className="mt-3 line-clamp-3 max-w-[200px] text-[11px] leading-5 text-white/60">{PREVIEW.bio}</p>
                  </div>
                  <div className="relative z-[1] flex items-center justify-between border-t border-white/15 pt-4 text-[10px] text-white/65">
                    <span className="uppercase">{PREVIEW.role}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7a857a]">Selected work</span>
                      <span className="text-[9px] text-[#92988e]">{PREVIEW_PROJECTS.length} projects</span>
                    </div>
                    <div className="space-y-3">
                      {PREVIEW_PROJECTS.map((project, index) => (
                        <article key={project.title} className="group flex items-center gap-3 border-b border-[#e8e6de] pb-3">
                          <span
                            className="grid h-[51px] w-[58px] shrink-0 place-items-center rounded-lg text-[14px] font-bold text-[#19352e]"
                            style={{ backgroundColor: ["#e6a184", "#a7bd93", "#d0bf87"][index % 3] }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[13px] font-semibold">{project.title}</h3>
                            <p className="mt-1 truncate text-[10px] text-[#82897f]">{project.date}</p>
                          </div>
                          <ArrowUpRight className="text-[#758073] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={14} />
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-[#eaf0e5] px-3 py-3 text-[10px]">
                    <span className="font-medium">A little more about me</span><MoveUpRight size={13} />
                  </div>
                  <div className="mt-4 flex justify-between text-[9px] uppercase text-[#788176]">
                    {PREVIEW_SOCIALS.map((social) => (
                      <span key={social.label}>{social.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 right-0 hidden items-center gap-2 rounded-full border border-[#19352e]/10 bg-[#f5f5ee] px-4 py-2.5 text-[11px] font-semibold shadow-lg sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#76a568]" />
              Made to feel like yours
            </div>
          </div>
        </div>
        <a href="#how-it-works" className="mx-auto mt-16 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-[#d7ff70]">
          Scroll to explore <ArrowDown size={13} />
        </a>
      </section>

      <section id="how-it-works" className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 pb-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.17em] text-[#67815c]">Less setup, more standing out</p>
              <h2 className="serif-display max-w-[600px] text-[clamp(2.7rem,5.5vw,5rem)] leading-[0.98]">You bring the work.<br />We&apos;ll make it <em>shine.</em></h2>
            </div>
            <p className="max-w-[430px] text-[15px] leading-7 text-[#68756c] md:justify-self-end">The best portfolio isn&apos;t the one with the most bells and whistles. It&apos;s the one that lets your work do the talking, and makes sharing it feel effortless.</p>
          </div>
          <div className="section-rule grid md:grid-cols-3">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="border-b border-[#dedfd5] py-8 md:border-b-0 md:border-r md:px-8 md:py-9 md:first:pl-0 md:last:border-r-0">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#8b9488]">{number} / 03</span>
                  <Icon className="text-[#558c73]" size={19} strokeWidth={1.6} />
                </div>
                <h3 className="serif-display text-[27px] leading-tight">{title}</h3>
                <p className="mt-3 max-w-[300px] text-[14px] leading-6 text-[#68756c]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dedfd5] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-10 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.17em] text-[#67815c]">
                {TEMPLATES.length} templates, one account
              </p>
              <h2 className="serif-display max-w-[560px] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1] ">
                Not one style. <em>Twenty-two.</em>
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-7 text-[#68756c] md:justify-self-end">
              Anime, comics and film worlds reimagined as portfolio systems — each with its own palette,
              typography and one signature interaction. Switch whenever you like; your content stays put.
            </p>
          </div>
          <TemplateStrip
            title="A few of them"
            ids={["konoha-ink", "grand-line", "arc-reactor", "gotham-nocturne", "owl-post", "deep-field"]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/templates" className="primary-action inline-flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold">
              Browse the Library <ArrowUpRight size={15} />
            </Link>
            <Link href="/features" className="inline-flex items-center gap-2 px-2 py-3 text-[13px] font-semibold text-[#35544a] hover:underline">
              What each template includes
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="section-rule grid md:grid-cols-3">
            {guarantees.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="border-b border-[#dedfd5] py-8 md:border-b-0 md:border-r md:px-8 md:py-9 md:first:pl-0 md:last:border-r-0"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#8b9488]">0{index + 1} / 03</span>
                  <Icon className="text-[#558c73]" size={19} strokeWidth={1.6} />
                </div>
                <h3 className="serif-display text-[25px] leading-tight">{title}</h3>
                <p className="mt-3 max-w-[300px] text-[14px] leading-6 text-[#68756c]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[28px] bg-[#d7ff70] px-7 py-10 sm:px-12 sm:py-14 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.17em] text-[#536c3d]">Your work has places to go</p>
            <h2 className="serif-display max-w-[690px] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.94]">Give it the link it deserves.</h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-[#3c5233]">
              {["Free to start", "22 templates", "Visit counts included"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/signup" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#19352e] px-6 py-4 text-[14px] font-semibold text-[#f5f5ee] transition-colors hover:bg-[#285849]">
            Start for free <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#dedfd5] px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 text-[12px] text-[#68756c] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold tracking-[-0.03em] text-[#19352e]">profolion<span className="text-[#749454]">.</span> <span className="font-normal text-[#68756c]">A home for your best work.</span></span>
          <div className="flex items-center gap-5">
            <Link href="/templates" className="hover:text-[#19352e]">Templates</Link>
            <Link href="/features" className="hover:text-[#19352e]">Why Profolion</Link>
            <Link href="/profile" className="hover:text-[#19352e]">Profile</Link>
            <Link href="/login" className="hover:text-[#19352e]">Log in</Link>
          </div>
          <span>Made for your next chapter ↗</span>
        </div>
      </footer>
    </main>
  );
}
