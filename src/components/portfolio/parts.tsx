import { AtSign, Briefcase, Camera, Code2, Link2, Mail, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Maps a free-text social label onto an icon from the installed set. */
export function socialIcon(label: string): LucideIcon {
  const key = label.toLowerCase();
  if (key.includes("git")) return Code2;
  if (key.includes("linked")) return Briefcase;
  if (key.includes("dribbble") || key.includes("behance")) return Palette;
  if (key.includes("mail") || key.includes("email")) return Mail;
  if (key.includes("insta")) return Camera;
  if (key.includes("twitter") || key.includes("x") || key.includes("thread")) return AtSign;
  return Link2;
}

export function isExternal(url: string) {
  return /^https?:/i.test(url);
}
