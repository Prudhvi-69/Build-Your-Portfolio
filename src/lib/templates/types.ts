export type TemplateFamily = "anime" | "marvel" | "dc" | "more";

/**
 * Structural archetype. Two templates that share a layout still differ in
 * palette, typography, ornament and motion — but the layout decides how the
 * portfolio's sections are arranged on the page.
 */
export type LayoutId =
  | "scroll"
  | "hud"
  | "editorial"
  | "deco"
  | "packaging"
  | "scene"
  /* Bespoke ports: one template each, ported from their own canvas page. */
  | "grand-line"
  | "deep-field"
  | "last-son"
  | "soul-reaper"
  | "iron-throne"
  | "cursed-energy"
  | "owl-post"
  | "breath-of-flame"
  | "vinland-coast"
  | "star-shield"
  | "thunder-rune"
  | "amazonia"
  | "emerald-oath"
  | "longship"
  | "web-slinger"
  | "scarlet-speed"
  | "alpine-meadow"
  | "abyss-light";

/**
 * Every template ships exactly one signature interaction, mounted by
 * <SignatureMotion />. None of them are fades.
 */
export type MotionId =
  | "inkTrail"
  | "sealPress"
  | "ringFollow"
  | "chargeHold"
  | "searchlight"
  | "dragRail"
  | "flapOpen"
  | "stamp"
  | "scramble"
  | "tilt"
  | "streak"
  | "orbit"
  | "caustics"
  | "starfield"
  | "magnet"
  | "runeDraw";

export interface TemplateTheme {
  /** Page ground. */
  bg: string;
  /** Raised cards, chips, panels on the ground. */
  surface: string;
  /** Primary text. */
  ink: string;
  /** Secondary text. */
  muted: string;
  /** Single signal colour. */
  accent: string;
  /** Text placed on `accent`. */
  accentInk: string;
  /** Inverse band used for hero / timeline sections. */
  dark: string;
  /** Text on `dark`. */
  darkInk: string;
  /** Secondary text on `dark`. */
  darkMuted: string;
}

export interface TemplateFonts {
  /** CSS font-family stack for display type. */
  display: string;
  /** CSS font-family stack for prose. */
  body: string;
  /** CSS font-family stack for small caps / tabular labels. */
  mono: string;
  /** Google Fonts `family=` fragments to load for this template only. */
  query: string[];
}

export interface TemplateArt {
  /** Optional environmental artwork behind the hero. */
  hero?: string;
  /** Optional artwork inside the first project. */
  project?: string;
}

export interface TemplateDefinition {
  id: string;
  /** Shopper-facing name. */
  name: string;
  /** The world the template is drawn from. */
  world: string;
  family: TemplateFamily;
  /** One factual line about the template's structure. */
  tagline: string;
  layout: LayoutId;
  motion: MotionId;
  theme: TemplateTheme;
  fonts: TemplateFonts;
  art: TemplateArt;
  /** Tighter vertical rhythm and smaller display type. */
  dense?: boolean;
}

export const FAMILY_LABEL: Record<TemplateFamily, string> = {
  anime: "Anime",
  marvel: "Marvel",
  dc: "DC",
  more: "More",
};

/** Turns #RRGGBB + alpha into rgba() so tokens can be layered safely. */
export function alpha(hex: string, opacity: number) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const int = Number.parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
