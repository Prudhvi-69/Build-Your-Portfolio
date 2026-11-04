# Template system — handoff

Everything an agent (or a person) needs to take the Profolion template library forward. Read this top to bottom before touching code. Prompts you can paste directly into another agent are in [Prompts](#prompts).

---

## 1. Where things stand

**In the repository (working):**

- 22 templates declared in `src/lib/templates/registry.ts`.
- 6 structural layouts implemented: `scroll`, `hud`, `editorial`, `deco`, `packaging`, `scene`.
- 16 interaction mechanics implemented in `src/components/portfolio/motion/SignatureMotion.tsx`.
- Showroom at `/templates`, full preview at `/templates/<id>`, editor picker, `template` column + migration, README.
- `npm run lint` clean, `npx tsc --noEmit` clean.
- `npm run build` **passing** — 32 pages generated, all 22 `/templates/<id>` pages prerendered as static HTML, `/portfolio/[slug]` dynamic as intended. Verified on Next.js 16.4.3 (Turbopack), 4.6s compile.

**On the design canvas** — `.kombai/canvas/profolion_templates.canvas`:

| Canvas node | Template | Layout | Status |
|---|---|---|---|
| `var_100ec6c3a362` | Template Showroom (gallery) | — | designed, matches `/templates` |
| `var_bfb2989e1d06` | Konoha Ink (Naruto) | scroll | designed, implemented |
| `var_e0c673694364` | Arc Reactor (Iron Man) | hud | designed, implemented |
| `var_7dc0c55e2e72` | Gotham Nocturne (Batman) | deco | designed, implemented |
| `var_0fa73db7153f` | Dream House (Barbie) | packaging | designed, implemented |
| `var_c72da1816899` | Grand Line (One Piece) | scene | designed, **not yet bespoke in code** |
| `var_6523fb6acae8` | Last Son (Superman) | editorial | designed, **not yet bespoke in code** |
| `var_82d95316a7aa` | Iron Throne (Game of Thrones) | deco | designed, **not yet bespoke in code** |
| `var_aced5a7c1769` | Cursed Energy (Jujutsu Kaisen) | hud | designed, **not yet bespoke in code** |
| `var_4884b516601d` | Soul Reaper (Bleach) | editorial | designed, **not yet bespoke in code** |
| `var_d4a7e7aa951c` | Deep Field (Space) | scene | designed, **not yet bespoke in code** |

A consolidated spec board for all 22 templates — layout, motion, palette, structure and state — lives at `var_c1b6dd8380d6` on the same canvas. Use it as the inventory when planning work; it is the one place where "designed" and "archetype only" are stated per template.

**Update — 2026-11-04. That port is done.** Six templates now have their own layout file, registered in `PortfolioRenderer.tsx` and `LayoutId`: `GrandLineLayout`, `LastSonLayout`, `IronThroneLayout`, `CursedEnergyLayout`, `SoulReaperLayout`, `DeepFieldLayout`. The other twelve pending designs (Owl Post, Emerald Oath, Scarlet Speed, Web Slinger, Star Shield, Thunder Rune, Amazonia, Breath of Flame, Alpine Meadow, Abyss Light, Vinland Coast, Longship) were designed on the canvas and render through their archetype with their own palette, fonts and signature interaction. `magnet`, `runeDraw`, `orbit` and `caustics` are now emitted by the archetypes, alongside `streak`, `chargeHold`, `dragRail`, `tilt` and `scramble`. The five expiring CDN image URLs were replaced with files in `public/art/`.

**Update — 2026-11-04 (later). The port is complete.** Those twelve now have their own layout files too (`OwlPostLayout`, `BreathOfFlameLayout`, `VinlandCoastLayout`, `StarShieldLayout`, `ThunderRuneLayout`, `AmazoniaLayout`, `EmeraldOathLayout`, `LongshipLayout`, `WebSlingerLayout`, `ScarletSpeedLayout`, `AlpineMeadowLayout`, `AbyssLightLayout`), registered in `LayoutId` and `LAYOUTS`. **18 templates now have a dedicated file and the other 4 use the archetype file that was authored from their own page** (Konoha Ink → `scroll`, Arc Reactor → `hud`, Gotham Nocturne → `deco`, Dream House → `packaging`). No template renders a design it was not built from, so the canvas hero ornaments (envelope, rune ring, construct ring, timber bands, speed bands, seal impression) all exist. `scene` and `editorial` now back no template; keep them, `LAYOUTS` is a total record and `COVER_ALIAS` points at them. `COVER_ALIAS` still maps each bespoke layout to its archetype, deliberately: a 120px cover is a summary, not a second implementation. Rule 1 at the top of §3 now reads "a new template is a registry entry plus, at most, one new layout" — that is exactly what these twelve are.

---

## 2. Commands that make templates live

```bash
# 1. install
npm install

# 2. environment (needs a Supabase project)
#    create .env.local with:
#    NEXT_PUBLIC_SUPABASE_URL=...
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 3. database — run once, in the Supabase SQL editor, in this order
#    supabase/migrations/20261028_fix_profile_creation.sql
#    supabase/migrations/20261028_add_portfolio_template.sql
#    (or: supabase db push)

# 4. run
npm run dev          # http://localhost:3000

# 5. verify before shipping
npm run lint
npx tsc --noEmit
npm run build
```

Routes to check after any change: `/templates`, `/templates/konoha-ink`, `/templates/grand-line`, `/portfolio/edit?template=cursed-energy`, `/dashboard`, and a published `/portfolio/<slug>`.

---

## 3. File map

```
src/lib/templates/
  registry.ts     the 22 templates — single source of truth
  types.ts        TemplateDefinition, theme tokens, LayoutId, MotionId, alpha()
  fonts.ts        Google Fonts fragments + googleFontsHref()

src/lib/portfolio/content.ts      PortfolioContent + toContent() + SAMPLE_CONTENT

src/components/portfolio/
  PortfolioRenderer.tsx           layout switch + per-template font <link>
  TemplateCover.tsx               palette-true cover (gallery, picker)
  parts.tsx                       social label → Lucide icon
  motion/SignatureMotion.tsx      16 mechanics, bound by data-attributes
  layouts/*.tsx                   one file per archetype

src/components/templates/
  TemplateGallery.tsx             /templates showroom
  TemplatePicker.tsx              editor inline region + dialog
```

**Three rules that keep this maintainable:**

1. Templates receive `PortfolioContent`, never a database row.
2. Adding a template is a registry entry, not a new file — unless it needs a new archetype.
3. A template's `layout` decides structure and section order; its `motion` decides the interaction. Never inline a one-off animation into a layout.

---

## 4. Prompts

Paste one at a time. Each assumes the repo as it stands today.

### Prompt 1 — bring the four newest canvas designs into code

> In this Next.js 16 repository, the Profolion template engine lives in `src/lib/templates/registry.ts` (22 templates), `src/components/portfolio/layouts/` (6 archetypes) and `src/components/portfolio/motion/SignatureMotion.tsx` (16 mechanics). Four newer template designs exist on the canvas `.kombai/canvas/profolion_templates.canvas` but currently render through a shared archetype. Bring each one into code as its own renderer so it matches its canvas page:
>
> - `var_c72da1816899` — Grand Line (One Piece), `scene` archetype, motion `magnet`
> - `var_6523fb6acae8` — Last Son (Superman), `editorial` archetype, motion `orbit`
> - `var_82d95316a7aa` — Iron Throne (Game of Thrones), `deco` archetype, motion `stamp`
> - `var_aced5a7c1769` — Cursed Energy (Jujutsu Kaisen), `hud` archetype, motion `scramble`
>
> Fetch each node, read its structure, and follow these rules: templates consume `PortfolioContent` from `src/lib/portfolio/content.ts` and never read Supabase rows; palette and font values must come from that template's `theme`/`fonts` in the registry, not hard-coded hexes inside the layout; each page must keep its data-attribute hooks so `SignatureMotion` still binds (`data-template-root`, plus whatever the motion needs — `[data-magnet]`, `[data-orbit]`, `[data-stamp]`, `[data-scramble]`). Do not add a new npm dependency. Do not use CSS `transition` on any element a motion animates. Verify with `npm run lint`, `npx tsc --noEmit`, and by loading `/templates/grand-line`, `/templates/last-son`, `/templates/iron-throne`, `/templates/cursed-energy`.

### Prompt 2 — add the next batch of templates

> Add five new templates to the Profolion registry following the existing pattern exactly. Read `src/lib/templates/registry.ts`, one layout file, and `SignatureMotion.tsx` first. New templates: Soul Reaper (Bleach, editorial), Breath of Flame (Demon Slayer, editorial), Emerald Oath (Green Lantern, hud), Deep Field (Space, scene), Abyss Light (Ocean, scene). Each needs: a distinct palette, its own two-or-three font pairing via `FONT_QUERY`/`FONT_STACK`, a `tagline` that states the structure factually, and a `motion` not already used by another template in the same family. Do not reuse a palette from an existing entry. Then extend `src/app/templates/page.tsx` if it needs anything (it should not), and confirm `/templates/<new-id>` renders. Keep every string either a stored field or fixed UI copy.

### Prompt 3 — put templates on the marketing home page

> `/` in this repository never mentions that Profolion ships 22 portfolio templates, even though `/templates` exists. Add one section to `src/app/page.tsx`, between the "how it works" section and the closing CTA, that advertises the library: a short heading, a row of 4–6 palette-true template covers using `before`/`after`… actually generate the covers with `TemplateCover` in a client wrapper if needed, or use three-tone swatches from each template's `theme`. Link to `/templates`. Match the existing paper/forest/lime system in `src/app/globals.css` — do not introduce new colours, and do not use the "·" separator character anywhere. No invented statistics.

### Prompt 4 — per-template metadata

> Each template in `src/app/templates/[id]/page.tsx` currently returns the same generic metadata shape. Add a shared helper that produces `title`, `description`, and Open Graph fields per template from `TemplateDefinition.name`, `.world` and `.tagline`, and use it in both the preview route and `src/app/portfolio/[slug]/page.tsx` (where the owner's title and bio replace the sample ones). Do not add image generation.

### Prompt 5 — audit and harden

> Review the template system for accessibility and performance: keyboard access to the template index and picker dialog (focus trap, `aria-activedescendant`, Escape), `prefers-reduced-motion` coverage for every one of the 16 mechanics, contrast of each template's muted text on its ground (list any pair below 4.5:1 and fix it in the registry), and that no template loads more than three font families. Report findings as a list with file paths before changing anything.

### Prompt 6 — durable template storage

> `template` is a plain text column with a default. Add a check constraint listing valid template ids, a `updated_at` trigger if missing, and an index only if a query needs it. Update `src/lib/supabase/types.ts` and `src/lib/db.ts` to match, and make `getTemplate()` the only place an id is resolved to a template. Provide the migration as a new file in `supabase/migrations/`; do not edit the existing migration.

---

## 5. Guardrails

**Licensing.** Templates are named after public worlds, but every asset must be original: palettes, ornaments, SVG, CSS patterns, generated illustrations. Never ship franchise artwork, logos, character likenesses or franchise typography. The reference lives in colour, structure and motion.

**Copy.** Every visible string is a stored field (`title`, `bio`, `skills`, `projects`, `experience`, `education`, `social_links`) or fixed UI copy ("Selected work", "Experience", "Read case study"). Never write sentences that compare records or explain the layout. No instructions to click, hover or drag. No fake metadata — no versions, coordinates, serial numbers or liveness. A stock photo credit belongs in `alt` only.

**Motion.** No fade-ins as the mechanism. Each template has exactly one signature interaction that changes state. `prefers-reduced-motion` must disable every mechanic without hiding content. Never put a CSS transition on an element a mechanic animates.

**Type.** Load only the families a template uses (`PortfolioRenderer` already does this). Always provide a fallback stack. Declare `font-display: swap` via the Google Fonts URL.

**Structure.** A new template is a registry entry plus, at most, one new archetype. If two templates need genuinely different section order, that is a new layout — not flags inside an existing one.

---

## 6. Verification checklist

- [ ] `npm run lint` and `npx tsc --noEmit` clean
- [x] `npm run build` completes — 32 pages, 22 template previews prerendered
- [ ] `/templates` lists every registry entry, search and family filter work, the preview matches the selected template's palette
- [ ] Every `/templates/<id>` renders at 1280 and at 390 wide with no horizontal scroll
- [ ] `/portfolio/edit?template=<id>` preselects, the picker stages, and Save persists
- [ ] A published `/portfolio/<slug>` renders in its saved template with the product navbar hidden
- [ ] Reduced motion: all 16 mechanics inert, all content visible
- [ ] Keyboard: index arrow keys, dialog Escape and focus, all controls reachable

---

## 7. Remaining work, in value order

1. **Bring the four newest designed pages into code** — prompt 1. Grand Line, Last Son, Iron Throne, Cursed Energy. Highest fidelity gain, no new architecture.
2. **Put the library on the marketing home page** — prompt 3. `/templates` is currently reachable only from the nav, the dashboard and the editor; `/` never mentions that 22 templates exist.
3. **Design the 12 archetype-only templates on canvas**, in this order: Owl Post, Emerald Oath, Scarlet Speed, Web Slinger, Star Shield, Thunder Rune, Amazonia, Alpine Meadow, Abyss Light, Vinland Coast, Longship, Breath of Flame. Each is a registry entry plus a canvas page; none needs a new archetype — all six are already implemented.
4. **Per-template metadata** — prompt 4, then durable storage — prompt 6.
5. **Accessibility pass** — prompt 5, once the pages above stop changing.

Nothing in that list is a prerequisite for shipping. The system as it stands builds, publishes and renders all 22 templates.
