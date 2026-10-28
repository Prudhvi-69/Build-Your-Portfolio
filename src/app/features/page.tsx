import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Heart,
  Link2,
  LockKeyhole,
  PencilRuler,
  Smartphone,
  Sparkles,
} from "lucide-react";

const details = [
  { icon: PencilRuler, title: "Yours, from the first click", description: "A considered, easy-to-use editor that leaves space for your personality. No design degree or late-night CSS required." },
  { icon: Smartphone, title: "Looks good everywhere", description: "Your work deserves the big screen and the little one. Every portfolio adapts beautifully to the device it lands on." },
  { icon: Link2, title: "One link. All your best.", description: "Give people a single destination for your projects, experience, skills, and the places they can find you." },
  { icon: Globe2, title: "Share it with the world", description: "Publish a living home for your work, ready to send in an application, a message, or your next introduction." },
  { icon: Heart, title: "Made for real people", description: "A free, welcoming place to start. Spend your energy on the work, not the tools or the bill." },
  { icon: LockKeyhole, title: "Your work, your account", description: "Secure sign-in and private editing keep your portfolio in your hands until you decide to share it." },
];

export default function FeaturesPage() {
  return (
    <main>
      <section className="hero-grid px-5 py-20 text-[#f5f5ee] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1080px]">
          <div className="eyebrow mb-7 flex items-center gap-2"><Sparkles size={14} /> A portfolio tool with a point of view</div>
          <h1 className="serif-display max-w-[900px] text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.93]">Less template.<br /><span className="text-[#d7ff70]">More you.</span></h1>
          <p className="mt-7 max-w-[480px] text-[16px] leading-7 text-white/65">All the essentials for a portfolio that feels considered, looks beautiful, and is actually ready to share.</p>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1080px] gap-px overflow-hidden rounded-[24px] border border-[#dedfd5] bg-[#dedfd5] sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="min-h-[245px] bg-[#fffefa] p-7 sm:p-8">
              <div className="mb-9 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#eaf0e5] text-[#35634d]"><Icon size={19} strokeWidth={1.7} /></span>
                <span className="font-mono text-[11px] text-[#92988e]">0{index + 1}</span>
              </div>
              <h2 className="serif-display text-[25px]">{title}</h2>
              <p className="mt-3 text-[13px] leading-6 text-[#68756c]">{description}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-[1080px] flex-col items-start justify-between gap-6 rounded-[24px] bg-[#d7ff70] p-8 sm:flex-row sm:items-center sm:px-10">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#536c3d]">Your next chapter is yours to write</p><p className="serif-display mt-2 text-[32px] leading-tight">Let&apos;s give it a great first page.</p></div>
          <Link href="/signup" className="primary-action inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-semibold">Get started <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <footer className="border-t border-[#dedfd5] px-5 py-7 text-center text-[12px] text-[#68756c]">profolion. A home for your best work.</footer>
    </main>
  );
}
