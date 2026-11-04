/**
 * Google Fonts fragments. Only the families a template needs are requested,
 * so a published portfolio loads two or three faces rather than every face
 * the template library uses.
 */
export const FONT_QUERY = {
  shippori: "Shippori+Mincho:wght@400;500;600;700;800",
  cinzel: "Cinzel:wght@400;500;600;700",
  cormorant: "Cormorant+Garamond:wght@300;400;500;600;700",
  chakra: "Chakra+Petch:wght@400;500;600;700",
  barlow: "Barlow:wght@300;400;500;600;700",
  bebas: "Bebas+Neue",
  grotesk: "Space+Grotesk:wght@400;500;600;700",
  fredoka: "Fredoka:wght@400;500;600;700",
  nunito: "Nunito:wght@400;500;600;700;800",
  fraunces: "Fraunces:opsz,wght@9..144,300..700",
  archivo: "Archivo+Black",
  plexMono: "IBM+Plex+Mono:wght@400;500;600",
  instrument: "Instrument+Sans:wght@400;500;600;700",
} as const;

export const FONT_STACK = {
  shippori: "'Shippori Mincho', Georgia, serif",
  cinzel: "'Cinzel', Georgia, serif",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  chakra: "'Chakra Petch', 'Trebuchet MS', sans-serif",
  barlow: "'Barlow', 'Helvetica Neue', sans-serif",
  bebas: "'Bebas Neue', Impact, sans-serif",
  grotesk: "'Space Grotesk', 'Helvetica Neue', sans-serif",
  fredoka: "'Fredoka', 'Trebuchet MS', sans-serif",
  nunito: "'Nunito', 'Helvetica Neue', sans-serif",
  fraunces: "'Fraunces', Georgia, serif",
  archivo: "'Archivo Black', 'Helvetica Neue', sans-serif",
  plexMono: "'IBM Plex Mono', ui-monospace, monospace",
  instrument: "'Instrument Sans', 'Helvetica Neue', sans-serif",
} as const;

/** Builds one Google Fonts stylesheet URL for the families a template uses. */
export function googleFontsHref(query: string[]) {
  const families = Array.from(new Set(query)).map((family) => `family=${family}`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
