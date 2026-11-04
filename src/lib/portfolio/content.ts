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
  name: "Aarav Menon",
  firstName: "Aarav",
  lastName: "Menon",
  initial: "AM",
  role: "Interface designer",
  bio: "I design booking, payment and publishing interfaces. Eight years in, most of it spent making dense screens feel calm enough to use on a phone at a bus stop.",
  avatarUrl: null,
  skills: [
    "Design systems",
    "Interaction design",
    "Prototyping",
    "Motion",
    "Type",
    "Research",
  ],
  projects: [
    {
      title: "Kestrel",
      description:
        "A 240-component library and the token pipeline behind it, adopted by four product teams.",
      date: "2025",
    },
    {
      title: "Tide & Timber",
      description:
        "Seat, cabin and ferry availability in one calendar. Cut booking drop-off by a third.",
      date: "2024",
    },
    {
      title: "Loom Audio",
      description:
        "A reading surface for long-form audio transcripts, built for one-handed use.",
      date: "2023",
    },
  ],
  experience: [
    {
      title: "Fintrail",
      description: "Senior product designer",
      date: "2022 — present",
    },
    {
      title: "Sundial Studio",
      description: "Product designer",
      date: "2019 — 2022",
    },
    {
      title: "Pageturn Press",
      description: "Interface designer",
      date: "2017 — 2019",
    },
  ],
  education: [
    {
      title: "National Institute of Design",
      description: "Interaction design",
      date: "2015 — 2017",
    },
    {
      title: "Srishti Institute",
      description: "Foundation studies",
      date: "2013 — 2015",
    },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com" },
    { label: "Dribbble", url: "https://dribbble.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Email", url: "mailto:hello@example.com" },
  ],
};
