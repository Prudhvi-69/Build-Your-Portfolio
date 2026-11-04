# CODER-AGENT-README — Profolion template library

**Audience:** a coding agent (not Kombai). Everything visual is finished. Your job is implementation, verification and deployment.

**Read this file top to bottom, then `HANDOFF_README.md` (sections 4, 7, 9) and `TEMPLATE_HANDOFF.md` (sections 3–6). Do not redesign anything.**

---

## 1. State of play

| Thing | State |
|---|---|
| Templates declared in the registry | **22** |
| Template pages designed on the canvas | **22** (all of them) |
| Routes rendering today | **22** `/templates/<id>` + `/templates` gallery |
| Templates with a dedicated layout file | **18** |
| Templates whose archetype file was authored from their own page | **4** (Konoha Ink, Arc Reactor, Gotham Nocturne, Dream House) |
| Templates still rendering a design they were not built from | **0** — see §7 |
| Interactions (mechanics) | **16**, every one wired to at least one template |
| Build | `npm run build` → 32 pages, 22 template routes prerendered, TypeScript clean |

Publisher groups, as requested, are all covered:

- **Anime — 5:** Naruto, Bleach, One Piece, Jujutsu Kaisen, Demon Slayer
- **Marvel — 4:** Iron Man, Captain America, Thor, Spider-Man
- **DC — 5:** Batman, Superman, Wonder Woman, Green Lantern, The Flash
- **More — 8:** Harry Potter, Heidi, Game of Thrones, Barbie, Space, Ocean, Vinland Saga, Vikings

Every theme is selectable, renders and is prerendered. No theme is missing, none is half-wired.

---

## 2. Golden rules (violating any of these breaks the system)

1. **A template is a registry entry.** Routes, gallery, picker and dashboard all derive from `src/lib/templates/registry.ts`. Never create a route by hand.
2. **Templates receive `PortfolioContent`** (`src/lib/portfolio/content.ts`), never a Supabase row. Never add a DB column a template reads.
3. **Colours and fonts come from `template.theme` / `template.fonts`** through `alpha()`. No hard-coded hex inside a layout, ever.
4. **One `<SignatureMotion />` per layout**, mounted once, inside the `data-template-root` element.
5. **Never put a CSS `transition` on an element a mechanic animates** (anything with `data-magnet`, `data-tilt`, `data-orbit`, `data-stars`, `data-charge-fill`, `data-flame`). The mechanic owns `transform`.
6. **No new npm dependency.** The 16 mechanics are hand-written in `SignatureMotion.tsx`.
7. **Load only the template's own font families** — `PortfolioRenderer` emits one `<link>` per page. Keep it that way.
8. **Never rename or delete a template `id`.** Published rows store the id; `getTemplate()` falls back to Konoha Ink on unknown ids, so a rename silently repaints live portfolios.
9. **Never commit `.env.local`** and never include it in a zip. It holds live Supabase keys.
10. **Do not run `npm run build` while `npm run dev` is running.** It overwrites `.next` and the dev server starts 500-ing every template route with `Jest worker encountered 2 child process exceptions`. It is not a code fault — restart dev (or run them in sequence).

---

## 3. Environment

```bash
npm install            # NOT npm ci — the committed lockfile is out of sync (@emnapi/wasi-threads drift)
cp .env.example .env.local
# then set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# placeholders are enough for `npm run build`; real values are needed for auth and saved portfolios
npm run dev            # http://localhost:3000
```

Node 22. Next.js 16.4.3 (Turbopack), React 19.3, Tailwind 4, TypeScript 5.

---

## 4. Source map — where everything lives

```
.kombai/canvas/profolion_templates.canvas   ALL 22 designs + showroom + spec board (JSONC)
public/art/                                 4 durable images (see §9)
src/lib/templates/registry.ts               the 22 entries: palette, fonts, layout, motion, art, tagline
src/lib/templates/types.ts                  TemplateDefinition, TemplateTheme, LayoutId, MotionId, alpha(), FAMILY_LABEL
src/lib/templates/fonts.ts                  FONT_QUERY + FONT_STACK + googleFontsHref()
src/lib/portfolio/content.ts                PortfolioContent contract + SAMPLE_CONTENT
src/components/portfolio/PortfolioRenderer.tsx   layout switch + per-template font <link>
src/components/portfolio/TemplateCover.tsx       gallery/picker cover, COVER_ALIAS map
src/components/portfolio/parts.tsx               social label → Lucide icon
src/components/portfolio/motion/SignatureMotion.tsx   16 mechanics
src/components/portfolio/layouts/
  ScrollLayout.tsx        archetype (konoha-ink)
  HudLayout.tsx           archetype (arc-reactor, emerald-oath, longship)
  EditorialLayout.tsx     archetype (breath-of-flame, owl-post, vinland-coast)
  DecoLayout.tsx          archetype (star-shield, thunder-rune, amazonia)
  PackagingLayout.tsx     archetype (dream-house, alpine-meadow)
  SceneLayout.tsx         archetype (web-slinger, scarlet-speed, abyss-light)
  GrandLineLayout.tsx     bespoke  GrandLineLayout / deep-field
  LastSonLayout.tsx       bespoke
  SoulReaperLayout.tsx    bespoke
  IronThroneLayout.tsx    bespoke
  CursedEnergyLayout.tsx  bespoke
  DeepFieldLayout.tsx     bespoke
src/components/templates/TemplateGallery.tsx     /templates showroom
src/components/templates/TemplatePicker.tsx      editor picker + dialog
src/app/templates/[id]/page.tsx                  full preview + "Use this template"
src/app/portfolio/[slug]/page.tsx                published portfolio (dynamic)
netlify.toml                                     npm run build → .next, Node 22
```

### How to read a canvas node without Kombai

The canvas is JSONC; each `variant` node has an `html` field holding the full page. Extract one:

```bash
node -e "
const fs=require('fs');
let raw=fs.readFileSync('.kombai/canvas/profolion_templates.canvas','utf8');
let d; try{d=JSON.parse(raw)}catch(e){d=JSON.parse(raw.replace(/^\s*\/\/.*$/gm,''))}
fs.writeFileSync('/tmp/node.html', d.nodes['var_e34fda6ffc14'].html);
console.log('written', d.nodes['var_e34fda6ffc14'].label);
"
```

Designs are Tailwind-utility HTML with palette hexes inline, one `<style>` block with the Google Fonts import, and `data-kid`/`data-name` annotations (editor metadata — ignore them when porting).

---

## 5. The 22-template inventory

`Status` is the code state today. `Canvas node` is the design to port from. Palette shows `bg / accent / dark`; all nine tokens are in the registry.

| # | Template | World | Group | id | Canvas node | Layout now | Motion | Fonts (display / body / mono) | bg / accent / dark | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Konoha Ink | Naruto | anime | `konoha-ink` | `var_bfb2989e1d06` | scroll | inkTrail | Shippori / Shippori / Plex Mono | F9F4F3 / 94110A / 1D1312 | bespoke |
| 02 | Soul Reaper | Bleach | anime | `soul-reaper` | `var_4884b516601d` | soul-reaper | runeDraw | Cinzel / Cormorant / Plex Mono | F3F5F7 / 2F6F8F / 0E1116 | bespoke |
| 03 | Grand Line | One Piece | anime | `grand-line` | `var_c72da1816899` | grand-line | magnet | Bebas / Space Grotesk / Plex Mono | F6EFDF / C8842B / 0B2B3C | bespoke |
| 04 | Cursed Energy | Jujutsu Kaisen | anime | `cursed-energy` | `var_aced5a7c1769` | cursed-energy | scramble | Chakra Petch / Barlow / Plex Mono | E8E4F2 / 5B48C7 / 0B0B10 | bespoke |
| 05 | Breath of Flame | Demon Slayer | anime | `breath-of-flame` | `var_75dff8ddd5f3` | editorial | streak | Archivo Black / Instrument / Plex Mono | F7EFE6 / D8462F / 141014 | archetype |
| 06 | Arc Reactor | Iron Man | marvel | `arc-reactor` | `var_e0c673694364` | hud | ringFollow | Chakra Petch / Barlow / Plex Mono | F5F5F1 / 19647E / 17170E | bespoke |
| 07 | Star Shield | Captain America | marvel | `star-shield` | `var_5a78107acc92` | deco | sealPress | Cinzel / Barlow / Plex Mono | F1EDE3 / B01427 / 12233A | archetype |
| 08 | Thunder Rune | Thor | marvel | `thunder-rune` | `var_962b49e55f61` | deco | tilt | Cinzel / Cormorant / Plex Mono | EDF1F5 / D9A441 / 0E1B2B | archetype |
| 09 | Web Slinger | Spider-Man | marvel | `web-slinger` | `var_69e5b9965f73` | scene | scramble | Archivo Black / Instrument / Plex Mono | F5F1E8 / C4161C / 1B4FA0 | archetype |
| 10 | Gotham Nocturne | Batman | dc | `gotham-nocturne` | `var_7dc0c55e2e72` | deco | searchlight | Cinzel / Cormorant / Plex Mono | F0ECEC / CFAB01 / 1A141A | bespoke |
| 11 | Last Son | Superman | dc | `last-son` | `var_6523fb6acae8` | last-son | orbit | Bebas / Instrument / Plex Mono | F4F1E8 / C8102E / 0B1B3A | bespoke |
| 12 | Amazonia | Wonder Woman | dc | `amazonia` | `var_11bbd5e66616` | deco | runeDraw | Cinzel / Cormorant / Plex Mono | F6F0E6 / A8232F / 14100E | archetype |
| 13 | Emerald Oath | Green Lantern | dc | `emerald-oath` | `var_cc8eaf62eb5e` | hud | magnet | Archivo Black / Space Grotesk / Plex Mono | EDF5EF / 2FB863 / 050A08 | archetype |
| 14 | Scarlet Speed | The Flash | dc | `scarlet-speed` | `var_b1f9def77aea` | scene | chargeHold | Bebas / Space Grotesk / Plex Mono | F7F2E9 / F5C518 / B3121C | archetype |
| 15 | Alpine Meadow | Heidi | more | `alpine-meadow` | `var_87fee726cd4d` | packaging | caustics | Fredoka / Nunito / Plex Mono | F4EEDC / 6E9B57 / 3C3A2A | archetype |
| 16 | Owl Post | Harry Potter | more | `owl-post` | `var_e34fda6ffc14` | editorial | runeDraw | Cinzel / Cormorant / Plex Mono | F6EFDD / 7A2230 / 14100F | archetype |
| 17 | Iron Throne | Game of Thrones | more | `iron-throne` | `var_82d95316a7aa` | iron-throne | stamp | Cinzel / Fraunces / Plex Mono | EDEAE4 / 7B1E1E / 0F1112 | bespoke |
| 18 | Dream House | Barbie | more | `dream-house` | `var_0fa73db7153f` | packaging | flapOpen | Fredoka / Nunito / Plex Mono | FFE3F1 / FF3D8B / 4A1330 | bespoke |
| 19 | Deep Field | Space | more | `deep-field` | `var_d4a7e7aa951c` | deep-field | starfield | Chakra Petch / Barlow / Plex Mono | F0F2F7 / 3F6FE0 / 05070F | bespoke |
| 20 | Abyss Light | Ocean | more | `abyss-light` | `var_cb5494e771e8` | scene | dragRail | Fraunces / Nunito / Plex Mono | E6F2F2 / 17888F / 04121A | archetype |
| 21 | Vinland Coast | Vinland Saga | more | `vinland-coast` | `var_7d267dd03e67` | editorial | magnet | Bebas / Instrument / Plex Mono | F0ECE4 / C77B33 / 101519 | archetype |
| 22 | Longship | Vikings | more | `longship` | `var_1204b51b367c` | hud | tilt | Cinzel / Barlow / Plex Mono | EDE7DA / 8C1C13 / 12100D | archetype |

Non-template nodes on the same canvas: `var_100ec6c3a362` = the `/templates` showroom (already implemented), `var_c1b6dd8380d6` = the 22-row spec board (status truth).

---

## 6. Archetype section order (what "renders through an archetype" means)

| Layout | Section order |
|---|---|
| `scroll` | dark ink hero → work → experience (dark) → education → elsewhere |
| `hud` | instrumented hero → about band → work (dark) → experience (dark) → education/elsewhere |
| `editorial` | print hero → work → experience (dark) → education → elsewhere |
| `deco` | deco hero → about → work → experience (dark) → education/elsewhere |
| `packaging` | blister hero → skills strip → work (rail) → experience → education/elsewhere |
| `scene` | full-bleed hero → work → experience (dark) → education → elsewhere |

The 12 `archetype` rows get **palette, typography, section order and their interaction** — but not their canvas hero ornament. That is the gap §7 closes.

---

## 7. The 12 archetype templates — PORTED on 2026-11-04

**This section is now a record, not a to-do.** All twelve were written as `<Template>Layout.tsx` from their canvas node and registered (types, renderer, registry `layout`, `COVER_ALIAS`). The per-template recipes below are kept because they document what each layout does and which hook it must emit — read them before editing a page, not before writing one.

For each: read the canvas node, read the archetype it currently uses, then write `src/components/portfolio/layouts/<Name>Layout.tsx`.

**Registration for every port (4 edits):**
1. `src/lib/templates/types.ts` → add the id to the `LayoutId` union.
2. `src/components/portfolio/PortfolioRenderer.tsx` → import the component, add it to `LAYOUTS`.
3. `src/lib/templates/registry.ts` → set that entry's `layout` to the new id (leave `theme`, `fonts`, `motion` untouched — they are already correct).
4. `src/components/portfolio/TemplateCover.tsx` → add `"<id>": "<archetype>"` to `COVER_ALIAS` if you want it to keep its archetype cover (recommended; a cover is a 120px summary, not a second implementation).

**Contract for every port:**

```tsx
export default function XLayout({ content, template }: { content: PortfolioContent; template: TemplateDefinition }) {
  const t = template.theme; const f = template.fonts;
  return (
    <div data-template-root className="relative min-h-screen overflow-x-clip"
         style={{ background: t.bg, color: t.ink, fontFamily: f.body }}>
      <SignatureMotion motion={template.motion} accent={t.accent} ink={t.ink} />
      {/* sections; ids: #top #work #experience #education #elsewhere */}
    </div>
  );
}
```

Every section must render only when its array is non-empty (`content.projects.length > 0 && …`). Responsive at 390px and 1280px, no horizontal scroll. Copy is stored fields plus fixed UI labels only — no invented statistics, versions, coordinates or instructions.

### 7.1 Breath of Flame — Demon Slayer (editorial, `streak`)
Canvas `var_75dff8ddd5f3`. Oversized poster band across the top (name ~140px on one line, role as a rotated stamp, skills as an ember rule), then a two-column ledger for work with a numbered row and date gutter, dark experience band with a vertical flame gradient edge, education as a two-column grid, elsewhere as one inline link row. Hook: `data-streak-host` on the hero, plus a dedicated empty layer inside it for the spawn targets.

### 7.2 Star Shield — Captain America (deco, `sealPress`)
Canvas `var_5a78107acc92`. Civic monument, strict bilateral symmetry: centred masthead, hero with concentric ring rig + shield-with-star emblem + star rule, centred record strip (projects / roles / schools counts), centred stepped double-frame plaques for work, navy experience band, education plaques, centred divide-x link row. Hook: a real `<button data-seal aria-pressed="false">` seal in the hero — it must visually compress and latch. Optional: the large seal imprint watermark that fades in once latched; keep it `opacity: 0` until then and animate an inner child, not the transformed wrapper.

### 7.3 Thunder Rune — Thor (deco, `tilt`)
Canvas `var_962b49e55f61`. Heavy navy header with a gold keyline; storm-grey hero inside a double gold frame; a large inscribed gold rune ring around the name that **breaks open at 12 o'clock** (four arcs, 24° gap, tick glyphs at the cardinals, dashed inner circles); repeating rune-glyph band under the hero; work as engraved plates (one featured + two paired); navy experience band lit by an icy-cyan radial wash; education as a rune-cell grid; elsewhere as one gold-ruled bar. IA note: **skills live inside the About band's engraved plate**, not the hero. Hook: `data-tilt` on every plate and both education cells (±7°, 10px lift).

### 7.4 Web Slinger — Spider-Man (scene, `scramble`)
Canvas `var_69e5b9965f73`. Asymmetric sticker opening (name panel 7/12, bio panel, links panel 5/12) on a halftone dot field with a web-thread corner ornament and rotated skill stickers; work as comic tiles (7/12, 5/12, full-width) with 2px ink borders and hard offset shadows; blue experience band; education in two indexed columns; four 2px-border sticker link blocks. Hook: `data-scramble` on all three project titles.

### 7.5 Amazonia — Wonder Woman (deco, `runeDraw`)
Canvas `var_11bbd5e66616`. Layered bronze double/triple frames, outlined four-point crest mark, 104px display name with the surname in accent, bio in the right column behind a vertical rule; hairline skills matrix with rotated accent diamonds; work as ruled rows with a year gutter and a plate rule that turns accent on hover; oxblood-on-bronze dark experience band; closing split education + elsewhere. Hook: `data-rune-host` on every heading block with an inline `<svg><path data-rune …/></svg>` inside it — **both attributes required**.

### 7.6 Emerald Oath — Green Lantern (hud, `magnet`)
Canvas `var_cc8eaf62eb5e`. Construct shell: dark instrument header with a monogram plate, instrumented hero on near-black with a 48px construct grid, emerald core bloom, chamfered link chips and a right-hand construct panel (concentric dashed rings, luminous arcs, crosshair ticks, spinning tick group); six skill cells as a rail; a light summary band with four readouts; chamfered energy plates for work; dark experience rows; closing split. Hook: `data-magnet` on all 9 wrappers (6 skill cells + 3 plates); the plate needs border/background change so a lean reads.

### 7.7 Scarlet Speed — The Flash (scene, `chargeHold`)
Canvas `var_b1f9def77aea`. Scarlet ground, signal yellow, hard diagonals, condensed poster caps. Hero carries a **real circular charge control**: `<button data-charge data-charge-label data-charge-target="#work" data-charge-done="Charged">` with a `data-charge-fill` child that the mechanic animates with `transform: scaleX()` — so the meter must be a **horizontal bar** with `transform-origin: left`, not a ring fill. Work is a hairline ledger with 01–03 numerals; dark-red experience band with diagonal hatching.

### 7.8 Alpine Meadow — Heidi (packaging, `caustics`)
Canvas `var_87fee726cd4d`. Floating pill header; hero in a 34px-radius surface panel with a green role pill, 82px Fredoka name, rolling-hills SVG in accent; skills strip of rounded pills; work as an internal snap rail (hidden scrollbar); experience as rounded row panels; education as calendar-style year cells; elsewhere as green-dot pills. Hook: the hero needs a light layer whose `background` is `radial-gradient(760px circle at var(--caustic-x, 30%) var(--caustic-y, 12%), alpha(t.accent, .34), transparent 68%)`. **Do not** put `data-rail` on that rail — `dragRail` belongs to Abyss Light.

### 7.9 Abyss Light — Ocean (scene, `dragRail`)
Canvas `var_cb5494e771e8`. Descending water column: bright pale surface → teal → near-black at the hero base, light shafts and a depth-band hairline texture; translucent links panel; dark four-column counts strip; work as an internal horizontal rail of surface cards with edge fades; teal-headed dark experience band; two-column education/elsewhere split; dark footer. Hook: `data-rail` on the scroller **and** `data-rail-step="prev"` / `"next"` on two circular buttons in the heading row — the mechanic binds to the buttons, not the cards.

### 7.10 Vinland Coast — Vinland Saga (editorial, `magnet`)
Canvas `var_7d267dd03e67`. Rugged full-width poster band with an axe-cut asymmetric dark edge and weathered speckle texture; 148px Bebas name; work as a column of wide numbered rows with alternating indentation and worn dashed rules; dark experience band with a horizon rule and ochre diamond; bordered link blocks. Hook: `data-magnet` on the 3 work rows and 6 skill chips.

### 7.11 Longship — Vikings (hud, `tilt`)
Canvas `var_1204b51b367c`. Banded longhouse hero: hairline timber label band, full-width 92px Cinzel name band with carved corner bars, tar-red accent band carrying the surname plus a 2×2 mono social grid, quiet bio band, dark HUD strip of six carved rune cells. Work as three wide stacked timber plates (86px index / body / year column); experience as a vertical rune rail with rotated diamond markers. **The hero must stay banded rows, not a two-column hero.** Hook: `data-tilt` on 6 skill cells + 3 plates.

### 7.12 Owl Post — Harry Potter (editorial, `runeDraw`)
Canvas `var_e34fda6ffc14`. Parchment letter: envelope-fold hero with a wax-seal monogram, quill hairlines, correspondence-style experience rows with postmark dates. Character: oxidised oxblood seal on unbleached parchment, wide-tracked Cinzel capitals. Hook: `data-rune-host` + inline `<path data-rune>` under **every** section heading (both attributes).

---

## 8. Family split — DONE on 2026-11-04

`TemplateFamily` is now `"anime" | "marvel" | "dc" | "more"` with `FAMILY_LABEL` = Anime / Marvel / DC / More, and the registry assigns 5 / 4 / 5 / 8. Both the gallery and the editor picker derive their chips and counts from `FAMILY_LABEL`, so adding a family is one entry there and one label — no hard-coded list to find. The steps below are kept as the record of what that change touches.

The registry currently groups as `anime | comics | worlds`, so the gallery can only filter three ways. To match the product's own vocabulary:

1. `src/lib/templates/types.ts` → `TemplateFamily = "anime" | "marvel" | "dc" | "more"`, and `FAMILY_LABEL = { anime: "Anime", marvel: "Marvel", dc: "DC", more: "More" }`.
2. `src/lib/templates/registry.ts` → set `family` per §5's Group column (4 marvel, 5 dc, 8 more).
3. `src/components/templates/TemplateGallery.tsx` → filter chips iterate `FAMILY_LABEL`; `templateCountByFamily` already works off the same map.
4. `src/components/templates/TemplatePicker.tsx` → any hard-coded family list.
5. Grep for `"comics"` and `"worlds"` across `src/` before finishing; TypeScript will catch the rest.

---

## 9. Artwork

Only three templates have imagery, all local and stable:

| File | Used by |
|---|---|
| `public/art/arc-reactor-hero.jpg` | `arc-reactor` `art.hero` |
| `public/art/arc-reactor-project.jpg` | `arc-reactor` `art.project` |
| `public/art/gotham-nocturne-hero.jpg` | `gotham-nocturne` `art.hero` + `art.project` |
| `public/art/konoha-ink-project.jpg` | `konoha-ink` `art.project` |

The other 19 keep `art: {}` deliberately — they earn character from palette, type, ornament and motion. **Never** put a design-tool CDN URL in the registry; the previous handoff's five `kombai-assets.b-cdn.net` values were expiring links that would have 404'd the live site. If you add artwork: save into `public/art/`, reference `/art/<template-id>-<hero|project>.jpg`.

---

## 10. Verification (run in this order, sequentially)

```bash
npx tsc --noEmit          # must be silent
npm run lint              # must be silent
npm run build             # 32 pages, 22 /templates/<id> prerendered
npm run dev               # then check routes below
```

| Route | Must be true |
|---|---|
| `/templates` | all 22 listed; search + family filter work; cover matches the palette |
| `/templates/<id>` | 200; renders at 1280 **and** 390 with no horizontal scroll; "Use this template" carries the id |
| `/portfolio/edit?template=<id>` | picker preselects it, staging works, Save persists `template` |
| `/portfolio/<slug>` | renders in its saved template, product navbar hidden |
| `/dashboard` | each card shows its template name |
| OS reduced motion | all 16 mechanics inert, **all content still visible** |
| keyboard | gallery arrows, dialog Escape + focus, every control reachable |

Quick route sweep:

```bash
for id in konoha-ink soul-reaper grand-line cursed-energy breath-of-flame arc-reactor star-shield thunder-rune web-slinger gotham-nocturne last-son amazonia emerald-oath scarlet-speed alpine-meadow owl-post iron-throne dream-house deep-field abyss-light vinland-coast longship; do
  printf '%-16s ' "$id"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/templates/$id";
done
```

Interaction spot-check — each page must contain its own hook:

```bash
curl -s http://localhost:3000/templates/longship | grep -c data-tilt        # >0
curl -s http://localhost:3000/templates/owl-post | grep -c data-rune        # >0
curl -s http://localhost:3000/templates/scarlet-speed | grep -c data-charge # >0
```

---

## 11. Ship it — Git and Netlify

1. **Delete `.env.local` before zipping** (a zip bypasses `.gitignore`). Keep `.kombai/` — the canvas is part of the handoff.
2. `git status` → expect only: `public/art/*`, the new layout files, `src/lib/templates/*`, `PortfolioRenderer.tsx`, `TemplateCover.tsx`, the layouts you changed, and the three markdown files. No `.env*`, no `node_modules`, no `.next`.
3. Commit on `master` (remote: `https://github.com/Prudhvi-69/Build-Your-Portfolio.git`) and push.
4. Netlify builds from `netlify.toml`: `npm run build` → publish `.next`, Node 22, Next runtime plugin. **A pipeline change is a deploy, not a design change.**
5. Env vars must exist in Netlify → Site configuration → Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. A template-only change never needs them changed.
6. Deploy order: merge → wait for the build → confirm `/templates/<new-id>` returns 200 on the live domain → only then announce/enable.
7. `/templates/<id>` routes are static (`generateStaticParams` over `TEMPLATE_IDS`), so a new registry entry becomes a new prerendered route at the next deploy with no route work. `/portfolio/[slug]` is dynamic and resolves the template at request time — the id must exist in the deployed registry before users can pick it.
8. `public/art/` is served as-is; no image service is configured, so keep files compressed.

---

## 12. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Every `/templates/<id>` 500s, log says `Jest worker encountered 2 child process exceptions` | `npm run build` ran while `npm run dev` was live. Stop dev, restart it. Do not run both together. |
| `npm ci` aborts with `EUSAGE` | Stale lockfile. Use `npm install`. |
| Build fails with `@supabase/ssr: Your project's URL and API key are required` | Missing `.env.local`. Placeholders are enough to build. |
| `Port 3000 is in use` | A dev server is already running; reuse it or stop the PID. |
| A template shows no interaction | Its motion has no hook in the layout. Check `SignatureMotion.tsx` for the selector it queries, then emit that attribute. |
| Gallery cover ignores a bespoke layout | Add the id to `COVER_ALIAS` in `TemplateCover.tsx`, or write a dedicated `case`. |
| Text invisible on `<Template>'s` band | `darkInk`/`darkMuted` misused on a light band (or vice versa). Use `alpha()` tints of the correct token. |

---

## 13. Definition of done

- [ ] 12 bespoke layouts written, registered, and their registry `layout` updated
- [ ] `COVER_ALIAS` covers all 22 (or dedicated cover cases)
- [ ] Optional: family split to anime / marvel / dc / more
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean (32 pages, 22 routes)
- [ ] All 22 routes 200; 390px and 1280px clean; reduced motion hides nothing
- [ ] Canvas spec board `var_c1b6dd8380d6` flipped from "Implemented" to "Bespoke" for each ported template, and `HANDOFF_README.md` §0.1 numbers updated
- [ ] `.env.local` deleted, committed tree clean, pushed, Netlify green, live URLs verified

**Guardrails that are not optional:** every asset must be original — no character likenesses, logos, film stills or franchise fonts; templates receive `PortfolioContent` and never raw database rows; any image must live in `public/art/`; a template's palette and fonts come from the registry and nowhere else.
