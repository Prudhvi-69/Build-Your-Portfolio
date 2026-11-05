import type { Portfolio } from "@/lib/supabase/types";

export interface PortfolioItem {
  title: string;
  description?: string;
  link?: string;
  date?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

/**
 * The single content contract every template renders. Templates never read the
 * database shape directly, so adding a column later cannot break a layout.
 */
export interface PortfolioContent {
  name: string;
  firstName: string;
  lastName: string;
  initial: string;
  role: string;
  bio: string;
  avatarUrl: string | null;
  skills: string[];
  projects: PortfolioItem[];
  experience: PortfolioItem[];
  education: PortfolioItem[];
  socials: SocialLink[];
}

function splitName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { firstName: "Your", lastName: "Portfolio", initial: "P" };
  if (words.length === 1) {
    return { firstName: words[0], lastName: "", initial: words[0].slice(0, 1).toUpperCase() };
  }
  return {
    firstName: words[0],
    lastName: words.slice(1).join(" "),
    initial: (words[0].slice(0, 1) + words[1].slice(0, 1)).toUpperCase(),
  };
}

function normalizeItems(value: unknown): PortfolioItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : undefined,
      link: typeof item.link === "string" ? item.link : undefined,
      date: typeof item.date === "string" ? item.date : undefined,
    }))
    .filter((item) => item.title.trim().length > 0);
}

/** Turns a stored portfolio row into the contract templates render. */
export function toContent(portfolio: Portfolio): PortfolioContent {
  const { firstName, lastName, initial } = splitName(portfolio.title);
  const experience = normalizeItems(portfolio.experience);
  const socials = Object.entries((portfolio.social_links ?? {}) as Record<string, unknown>)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0)
    .map(([label, url]) => ({ label, url }));

  return {
    name: portfolio.title,
    firstName,
    lastName,
    initial,
    role: experience[0]?.description || experience[0]?.title || "Independent portfolio",
    bio: portfolio.bio ?? "",
    avatarUrl: portfolio.avatar_url ?? null,
    skills: Array.isArray(portfolio.skills) ? portfolio.skills.filter(Boolean) : [],
    projects: normalizeItems(portfolio.projects),
    experience,
    education: normalizeItems(portfolio.education),
    socials,
  };
}

/**
 * Sample record used by the template gallery and full previews. Every
 * template renders exactly this content, so templates can be compared on
 * structure rather than on different copy.
 */
export const SAMPLE_CONTENT: PortfolioContent = {
  name: "Prudhvi S",
  firstName: "Prudhvi",
  lastName: "S",
  initial: "PS",
  role: "Profolion Developer",
  bio: "I am the visionary developer and digital architect behind Profolion, crafting high-impact online experiences that blend strategy, creativity, and performance. With a passion for building elegant, conversion-focused websites, I bring ideas to life across multiple brands and ventures, turning bold concepts into powerful digital realities.",
  avatarUrl: null,
  skills: [
    "Full Stack Development",
    "MERN Stack",
    "MEAN Stack",
    "Java Full Stack",
    "Python Full Stack",
    "REST APIs",
    "Automation Testing",
    "Mentor & Speaker",
  ],
  projects: [
    {
      title: "GenZ-IQ LMS",
      description:
        "A career-focused learning platform that helps students and colleges build industry-ready skills through guided learning, live projects, mentorship, innovation programs, and career readiness experiences.",
      link: "https://genz-iq.com",
      date: "2021 — 2026",
    },
    {
      title: "OrbiTaurus",
      description:
        "An immersive 3D educational universe simulator for exploring planetary systems, orbital mechanics, and interactive space-inspired learning.",
      link: "https://orbitaurus.netlify.app",
      date: "2022 — 2025",
    },
    {
      title: "LiveLoom",
      description:
        "A browser-based HTML, CSS, and JavaScript workspace with live preview, project management, theme switching, and local persistence for rapid prototyping.",
      link: "https://liveloom-rdj.netlify.app",
      date: "2023 — 2025",
    },
    {
      title: "Profolion",
      description:
        "A modern portfolio and personal brand experience that helps creators and professionals present their work, story, and digital identity with elegance and impact.",
      link: "https://profolion.netlify.app",
      date: "2024 — 2026",
    },
  ],
  experience: [
    {
      title: "Freelancer",
      description: "Application Developer",
      date: "2019 — present",
    },
    {
      title: "Freelancing",
      description: "Technical Mentor",
      date: "2021 — present",
    },
    {
      title: "Monkhub Innovations",
      description: "Unity Developer",
      date: "2020 — 2022",
    },
  ],
  education: [
    {
      title: "IIT Rourkela",
      description: "PhD in CS",
    },
    {
      title: "NIT Delhi",
      description: "Masters in CS",
    },
    {
      title: "IIT Chennai",
      description: "Bachelors in CS",
    },
  ],
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sprdj" },
    { label: "Instagram", url: "https://instagram.com/sung_jinw0_0" },
    { label: "Website", url: "https://prudhvi-rdj.netlify.app" },
    { label: "Email", url: "mailto:prudhvi.touch.me@gmail.com" },
  ],
};
