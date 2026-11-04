# Profolion

Profolion helps you make a personal portfolio for your projects, experience, skills, and links — no code or credit card required.

A portfolio is composed from your content, then rendered through one of **22 templates**. Each template is a complete visual world: its own palette, its own type pairing, its own page structure, and exactly one signature interaction.

---

## Get started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configure Supabase

Create a Supabase project and copy its project URL and anon key into `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Apply the schema in [`supabase/schema.sql`](./supabase/schema.sql) to the project database. Keep `.env.local` private; `.env.example` documents the variables without containing credentials.

Then run the migrations in [`supabase/migrations/`](./supabase/migrations) in order:

1. `20261028_fix_profile_creation.sql` — lets a signed-in user create or update their own profile, which is required before creating a portfolio.
2. `20261028_add_portfolio_template.sql` — adds the `template` column. Every existing portfolio falls back to `konoha-ink`, so this is safe on a populated database.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## Templates

Browse them at `/templates`, or open one full-page at `/templates/<id>`.

| # | Template | World | Family | Layout | Signature interaction |
|---|---|---|---|---|---|
| 1 | Konoha Ink | Naruto | Anime | scroll | `inkTrail` |
| 2 | Soul Reaper | Bleach | Anime | editorial | `runeDraw` |
| 3 | Grand Line | One Piece | Anime | scene | `magnet` |
| 4 | Cursed Energy | Jujutsu Kaisen | Anime | hud | `scramble` |
| 5 | Breath of Flame | Demon Slayer | Anime | editorial | `streak` |
| 6 | Arc Reactor | Iron Man | Comics | hud | `ringFollow` |
| 7 | Star Shield | Captain America | Comics | deco | `sealPress` |
| 8 | Thunder Rune | Thor | Comics | deco | `tilt` |
| 9 | Web Slinger | Spider-Man | Comics | scene | `scramble` |
| 10 | Gotham Nocturne | Batman | Comics | deco | `searchlight` |
| 11 | Last Son | Superman | Comics | editorial | `orbit` |
| 12 | Amazonia | Wonder Woman | Comics | deco | `runeDraw` |
| 13 | Emerald Oath | Green Lantern | Comics | hud | `magnet` |
| 14 | Scarlet Speed | The Flash | Comics | scene | `chargeHold` |
| 15 | Alpine Meadow | Heidi | Worlds | packaging | `caustics` |
| 16 | Owl Post | Harry Potter | Worlds | editorial | `runeDraw` |
| 17 | Iron Throne | Game of Thrones | Worlds | deco | `stamp` |
| 18 | Dream House | Barbie | Worlds | packaging | `flapOpen` |
| 19 | Deep Field | Space | Worlds | scene | `starfield` |
| 20 | Abyss Light | Ocean | Worlds | scene | `dragRail` |
| 21 | Vinland Coast | Vinland Saga | Worlds | editorial | `magnet` |
| 22 | Longship | Vikings | Worlds | hud | `tilt` |

### Naming and artwork

Templates are **named after the world they are drawn from** so the reference is immediately legible, and each also carries its own product name ("Konoha Ink", "Arc Reactor", "Gotham Nocturne", "Dream House") so the library has titles you own.

Every visual is original: palettes, ornaments, SVG shapes and CSS pattern work, plus a small number of original generated illustrations. **No licensed franchise artwork, logos, character likenesses or typographic logos are shipped.** The reference lives in colour, type, structure and motion — not in copied assets. Keep it that way when adding templates.

---

## How the engine works

```
src/lib/templates/
  types.ts        Template contract: themes, layouts, motion ids, alpha()
  fonts.ts        Google Fonts fragments + merged stylesheet URL builder
  registry.ts     The 22 templates — the single source of truth

src/lib/portfolio/
  content.ts      PortfolioContent contract, toContent(), SAMPLE_CONTENT

src/components/portfolio/
  PortfolioRenderer.tsx        picks the layout, loads only that template's fonts
  motion/SignatureMotion.tsx   the 16 interaction mechanics
  layouts/                     Scroll, Hud, Editorial, Deco, Packaging, Scene
  TemplateCover.tsx            compact, palette-true cover for gallery + picker
  parts.tsx                    social-label → icon mapping

src/components/templates/
  TemplateGallery.tsx   /templates showroom (index + live palette preview)
  TemplatePicker.tsx    inline template region + full-screen picker in the editor
```

Three deliberate boundaries:

1. **Content never leaks into a template.** Layouts receive `PortfolioContent`, not a database row. Adding a column cannot break a template.
2. **A template declares, it does not implement.** `registry.ts` says which layout, palette, fonts and motion a template uses. `layout` decides section order and structure; `motion` decides the interaction.
3. **Only the selected template's fonts load.** `PortfolioRenderer` emits a single `<link>` for that template's two or three families, so a published portfolio is not carrying the library's whole type stack.

### Adding a template

1. Append an entry to `TEMPLATES` in [`src/lib/templates/registry.ts`](./src/lib/templates/registry.ts): `id`, `name`, `world`, `family`, `tagline`, `layout`, `motion`, `theme`, `fonts`, `art`.
2. Pick a `layout` that fits the world's structure, not just its palette. If none fit, add a renderer to `src/components/portfolio/layouts/` and register it in `LAYOUTS` inside `PortfolioRenderer`.
3. Pick a `motion` that does not repeat another template's in the same `family`.
4. `tagline` states the structure factually ("Ink band hero, seal-stamped skills, hairline project leaves"). It is not marketing copy.

Nothing else needs changing: the gallery, the picker, the editor, the public route, and the demo preview route all read from the registry.

### Signature interactions

`SignatureMotion` mounts one mechanic per template by reading `[data-template-root]` and wiring behaviour onto the data attributes a layout exposes. Every mechanic is pointer-, click- or drag-driven and changes real state:

| Motion | What it does | Attributes it binds |
|---|---|---|
| `inkTrail` | Fading ink dots follow the pointer inside the hero (capped at ~46 particles) | `[data-ink-host]` |
| `sealPress` | A seal compresses, latches and releases; `aria-pressed` tracks it | `[data-seal]` |
| `ringFollow` | Concentric rings rotate to the pointer angle; crosshairs track the cursor | `[data-ring-panel]` |
| `chargeHold` | Press and hold ~900ms to fill a meter, then commit and scroll to a target | `[data-charge]`, `[data-charge-fill]`, `[data-charge-label]` |
| `searchlight` | A beam follows the pointer; a switch locks it on and updates its label | `[data-beam]`, `[data-signal]` |
| `dragRail` | A horizontal rail you can throw, with velocity decay | `[data-rail]`, `[data-rail-step]` |
| `flapOpen` | Blister packs swing open to reveal the case study; `aria-expanded` tracks it | `[data-flap]` |
| `stamp` | A rubber stamp deposits a permanent imprint | `[data-stamp]` |
| `scramble` | Text decodes from noise on hover or focus | `[data-scramble]` |
| `tilt` | Cards lean individually toward the pointer | `[data-tilt]` |
| `streak` | Speed lines spawn along the pointer path | `[data-streak-host]` |
| `orbit` | Decorative rings parallax with pointer position | `[data-orbit]` |
| `caustics` | Light position follows the pointer via CSS custom properties | `--caustic-x/y` on the root |
| `starfield` | Star layers separate with pointer depth | `[data-stars]` |
| `magnet` | Cards lean in as the cursor passes | `[data-magnet]` |
| `runeDraw` | A hand-drawn SVG rule completes itself on hover | `[data-rune]` |

Six mechanics are shared by two or three templates, always across different families; each occurrence is re-styled by its template's palette, type and layout, so the same mechanic never reads the same twice.

**Motion accessibility:** prefers-reduced-motion disables every mechanic and reveals all content immediately. Motion never hides information — for example, blister descriptions expand on click as well as being part of the page.

---

## Routes

| Route | What it is |
|---|---|
| `/templates` | Showroom: 22-world index, search, family filter, live palette preview |
| `/templates/<id>` | One template rendered full page with sample content, plus a bar to apply it |
| `/portfolio/<slug>` | A published portfolio, rendered in its saved template |
| `/portfolio/edit` | Editor, with the inline template region and picker (`?template=<id>` preselects) |
| `/dashboard` | Your portfolios, each showing its current template |

## Data model

`public.portfolios` gained one column:

```sql
template text not null default 'konoha-ink'
```

It is written from the editor through `createPortfolio` / `updatePortfolio` in [`src/lib/db.ts`](./src/lib/db.ts) and read by the public route, which resolves it with `getTemplate()`. An unknown or missing id resolves to the default template rather than throwing, so a stale row can never 500 a portfolio.

## Notes on structure

- The app's own navigation is hidden on `/portfolio/<slug>` and `/templates/<id>` — a published portfolio is the owner's page, not a page inside the product.
- `/templates` keeps the product chrome because it is a shopping surface.
- Covers in the gallery and the picker are generated from the same tokens the full renderer uses, so a cover cannot misrepresent a template's palette or type.
