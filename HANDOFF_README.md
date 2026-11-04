# Profolion — Template Library Handoff for Kombai

**Read this file top to bottom before you touch anything.**

This document is written for a **new Kombai session on a different machine** that has design credits available. The previous session ran out of credits part way through building the template library. Everything that was finished is committed and building. Everything that is not finished is listed here with an exact, copy-pasteable prompt.

`README.md` explains the product. `TEMPLATE_HANDOFF.md` explains the engineering rules. **This file is the operational one:** what exists, what is missing, how to design the missing pages on the Kombai canvas, and how to get each design out of the canvas and into the running Next.js app so it appears on the live Netlify deployment.

> **Quick start (90 seconds):** unzip → open the folder in VS Code → `npm install` → `Copy-Item .env.example .env.local` → `npm run dev` → open `http://localhost:3000/templates` → open `.kombai/canvas/profolion_templates.canvas` in the Kombai extension. Then read section 6 before you design anything.

**Repo:** `https://github.com/Prudhvi-69/Build-Your-Portfolio.git` (branch `master`). The zip has no `.git/`, so either work from the zip as-is (simplest — the canvas is in the same folder) or `git clone` this repo and copy the `.kombai/` folder in from the zip. **Working from the zip is recommended**, because canvas files and the code they are linked to must stay in the same tree.

---

## 0. TL;DR — the three numbers you asked for

| Bucket | Count | Meaning |
|---|---|---|
| **Designed on canvas AND linked to the app** | **10** | A bespoke canvas page exists and the template renders through the app's layout engine |
| **Designed on canvas but NOT linked** | **0** | no orphaned designs exist |
| **Pending — registry entry only, no canvas page** | **12** | The template id exists in the registry and already renders, but no bespoke canvas design has been made yet |
| **Total** | **22** | |

Read that carefully, because it is the part that is easy to get wrong:

> **Every one of the 22 templates is already selectable and already renders on the live site.** "Pending" here means *no bespoke canvas design yet* — not *broken* and not *missing from the app*. Nothing is half-wired.

The nuance inside the "10 linked" bucket:

| Sub-state | Count | Templates |
|---|---|---|
| Bespoke canvas page **and** bespoke, one-off React markup | **4** | Konoha Ink, Arc Reactor, Gotham Nocturne, Dream House |
| Bespoke canvas page, rendered through the **shared layout archetype** (their unique palette, fonts, ornament and motion are live, but their canvas-specific section order is not yet ported) | **6** | Grand Line, Last Son, Iron Throne, Cursed Energy, Soul Reaper, Deep Field |

So the accurate one-line answer is:

- **10** designed-on-canvas and linked to the app (4 fully bespoke in code, 6 linked through their archetype)
- **0** designed but unlinked
- **12** pending (registry only, no canvas design)

> If "linked" is read strictly as *"the canvas page has been ported to bespoke code"*, the numbers become **4 linked / 6 designed-but-not-ported / 12 pending**. The target state — **22 links to the app** — is already reached.

`npm run build` was verified today on this exact folder: **32 static pages, all 22 `/templates/<id>` routes prerendered, TypeScript clean.** See section 9.

### 0.1 Update — 2026-11-04 (supersedes the tables below)

The 12 pending pages were designed on the canvas and wired into the app in one pass. Where the tables below disagree with this block, this block is current.

| Bucket | Count | Meaning |
|---|---|---|
| Designed on canvas **and** bespoke in code | **10** | Konoha Ink, Arc Reactor, Gotham Nocturne, Dream House, plus Grand Line, Last Son, Iron Throne, Cursed Energy, Soul Reaper, Deep Field (`<Template>Layout.tsx`, registered in `PortfolioRenderer.tsx` and `LayoutId`) |
| Designed on canvas, rendered through an archetype | **12** | Owl Post, Emerald Oath, Scarlet Speed, Web Slinger, Star Shield, Thunder Rune, Amazonia, Breath of Flame, Alpine Meadow, Abyss Light, Vinland Coast, Longship |
| Pending design | **0** | — |

Also done in that pass:

- **Artwork is local.** The five `kombai-assets.b-cdn.net` values are gone; the four images live in `public/art/` and the registry references `/art/...`.
- **The four unbound mechanics are hooked.** `magnet`, `runeDraw`, `orbit` and `caustics` now have emitters; so do `streak`, `chargeHold`, `dragRail` and the HUD/Deco `tilt` + `magnet` hooks. `SignatureMotion` itself was not modified.
- **Canvas node ids for the 12 new pages** (all children of `var_100ec6c3a362`): Owl Post `var_e34fda6ffc14`, Breath of Flame `var_75dff8ddd5f3`, Emerald Oath `var_cc8eaf62eb5e`, Longship `var_1204b51b367c`, Scarlet Speed `var_b1f9def77aea`, Abyss Light `var_cb5494e771e8`, Web Slinger `var_69e5b9965f73`, Vinland Coast `var_7d267dd03e67`, Star Shield `var_5a78107acc92`, Thunder Rune `var_962b49e55f61`, Amazonia `var_11bbd5e66616`, Alpine Meadow `var_87fee726cd4d`.
- Still outstanding from this document: the status badges on the canvas spec board `var_c1b6dd8380d6` were not flipped.

### 0.2 Update — 2026-11-04 (later). Every template is now bespoke in code.

The twelve archetype-only pages were ported. **Every template now renders its own canvas page** — the app matches the canvas page for page, including the hero ornaments the shared archetypes could not carry.

| Bucket | Count | Meaning |
|---|---|---|
| Dedicated `<Template>Layout.tsx` file | **18** | registered in `LayoutId` and `LAYOUTS` — the 6 earlier ports plus these 12 |
| Rendered by an archetype file authored from that template's own page | **4** | Konoha Ink → `scroll`, Arc Reactor → `hud`, Gotham Nocturne → `deco`, Dream House → `packaging` (each of those files was built from that one design, so it is bespoke in substance even though it is shared in name) |
| Still rendering a design it was not built from | **0** | — |
| Pending design | **0** | — |

`scene` and `editorial` no longer back any template — every page that used them has its own file now. They stay registered because `LAYOUTS` is a total record over `LayoutId` and `COVER_ALIAS` still points at them.

New layout files (one per template): `OwlPostLayout`, `BreathOfFlameLayout`, `VinlandCoastLayout`, `StarShieldLayout`, `ThunderRuneLayout`, `AmazoniaLayout`, `EmeraldOathLayout`, `LongshipLayout`, `WebSlingerLayout`, `ScarletSpeedLayout`, `AlpineMeadowLayout`, `AbyssLightLayout`.

The canvas-only ornaments now exist as inline SVG/markup inside those components, so nothing is fetched and nothing can fail to load:

- **Owl Post** — envelope flap fold, wax seal, quill rules, postmark date stubs.
- **Thunder Rune** — the broken rune ring (four 24°-gapped arcs, tick glyphs, dashed inner circles) and the repeating rune pattern band.
- **Star Shield** — concentric ring rig, shield emblem, star clip-path markers, and a **seal impression that only appears once the seal latches** (`:has([data-seal][aria-pressed="true"])` in `globals.css`, so the state readout flips Unsealed → Sealed).
- **Emerald Oath** — the spinning construct ring (`[data-construct-spin]`, already reduced-motion gated).
- **Longship** — the banded longhouse hero (label band, name band, accent surname band, bio band, dark rune strip).
- **Scarlet Speed** — skewed speed bands and the horizontal hold-to-charge meter.
- **Abyss Light** — depth gradient, light shafts, caustic glows, horizon hairline, edge-faded rail.
- **Alpine Meadow** — the caustic light layer driven by `--caustic-x/y`, rolling-hills SVG.
- **Web Slinger** — halftone fields, sticker offset shadows, misregistration type, cut corners.
- **Vinland Coast, Breath of Flame, Amazonia** — the axe-cut band edge, the poster band with ember diagonals, the layered frames and crest.

Verified: `npx tsc --noEmit` and `npm run lint` clean; `npm run build` compiles in 11.5s and prerenders all 22 `/templates/<id>` routes (32 static pages); all 22 routes return 200 in dev; no horizontal overflow at 1280 or 390; each of the twelve interactions was exercised in a browser and changes real state (seal latches, meter fills, rail steps, titles decode, caustics track, tilt/magnet lean).

> One environment caveat worth knowing: `npm run dev` in this repo reaches a state where every `/templates/<id>` returns 500 with `Jest worker encountered 2 child process exceptions` while `/` and `/templates` stay 200. It is the `.next/dev/cache/turbopack` store getting corrupted — usually by a build running while dev is live, or by deleting `.next` under a running server. Recover by stopping the port-3000 process, `rm -rf .next`, then `npm run dev`. If `npx tsc --noEmit`, `npm run lint` and `npm run build` are all clean, the 500s are the cache, never your change.

The family vocabulary is also now `anime / marvel / dc / more` (5 / 4 / 5 / 8), replacing `anime / comics / worlds`. `TemplateFamily` and `FAMILY_LABEL` carry it, the gallery and the editor picker both build their filter chips from `FAMILY_LABEL` so a future family is a one-line change, and the canvas spec board groups its 22 rows the same way (Anime 5 / Marvel 4 / DC 5 / More 8), with every row reading **Bespoke**.

---

## 1. What is in this zip (what NOT to change)

The app is **complete, deployed to Netlify, and working.** The design work is additive.

```
Build-Your-Portfolio/
├── HANDOFF_README.md            ← this file (the one to read first)
├── README.md                    ← product + engine documentation
├── TEMPLATE_HANDOFF.md          ← engineering rules + prompt archive
├── Design Directions for further features and templates.txt   ← original design brief
├── AGENTS.md                    ← Next.js 16 agent rules (do not delete)
├── netlify.toml                 ← deploy config (npm run build → .next)
├── package.json                 ← Next 16.4.3, React 19.3, Tailwind 4
├── .env.example                 ← env var names (no secrets)
├── .env.local                   ← ⚠ real Supabase keys — DO NOT ZIP / DO NOT COMMIT
├── supabase/
│   ├── schema.sql
│   └── migrations/
│       ├── 20261028_fix_profile_creation.sql
│       └── 20261028_add_portfolio_template.sql
├── .kombai/
│   ├── canvas/profolion_templates.canvas   ← THE DESIGN CANVAS (all 10 pages live here)
│   └── assets/                             ← 2 generated jpgs used as hero/project art
└── src/
    ├── app/
    │   ├── page.tsx                    marketing home
    │   ├── templates/page.tsx          /templates showroom
    │   ├── templates/[id]/page.tsx     full-page preview + "Use this template" bar
    │   ├── portfolio/edit/page.tsx     editor (picker, ?template=<id>)
    │   ├── portfolio/[slug]/page.tsx   published portfolio (dynamic)
    │   └── dashboard/page.tsx
    ├── components/
    │   ├── portfolio/
    │   │   ├── PortfolioRenderer.tsx        picks layout + loads that template's fonts only
    │   │   ├── TemplateCover.tsx            palette-true cover for gallery/picker
    │   │   ├── parts.tsx                    social label → icon
    │   │   ├── layouts/{Scroll,Hud,Editorial,Deco,Packaging,Scene}Layout.tsx
    │   │   └── motion/SignatureMotion.tsx   16 mechanics
    │   └── templates/{TemplateGallery,TemplatePicker}.tsx
    └── lib/
        ├── templates/{registry,types,fonts}.ts
        ├── portfolio/content.ts
        └── db.ts, supabase/*
```

**Do not modify:** routes, Supabase schema/migrations, `db.ts`, auth, the editor's form logic, `netlify.toml`. None of it needs to change to add templates.

**You will touch, at most:** `src/lib/templates/registry.ts` (palette/font/art values only), `src/components/portfolio/layouts/*.tsx` (only if a design needs a section order no archetype has), and `.kombai/canvas/profolion_templates.canvas` (new pages).

### Before you zip

1. **Remove `.env.local`.** It holds live Supabase keys. `.gitignore` covers it but a zip bypasses git.
2. Optionally remove `node_modules/`, `.next/`, `tsconfig.tsbuildinfo`. They regenerate with `npm install` and `npm run build` and add ~500MB for nothing.
3. **Keep `.kombai/`.** The canvas and the two assets are the whole point of the handoff.
4. **Keep `.git/`** if you want history; it is not required.

---

## 2. First run on the new PC

> ⚠️ **Two things that will trip you up, both verified by extracting this exact zip and building it:**
>
> 1. **You must create `.env.local` before `npm run build`.** The product Navbar creates a Supabase client during prerender, so a missing env file fails the build with `@supabase/ssr: Your project's URL and API key are required` on `/` and `/templates/<id>`. Placeholder values from `.env.example` are enough to build; real values are only needed for auth and saved portfolios.
> 2. **Use `npm install`, not `npm ci`.** The committed `package-lock.json` is out of sync with `package.json` (`@emnapi/wasi-threads` drift), so `npm ci` aborts with `EUSAGE`. `npm install` resolves it and rewrites the lockfile — that is expected and safe.

```powershell
# 1. unzip, then in the project root:
npm install          # NOT npm ci — the lockfile is stale, npm install fixes it

# 2. environment — REQUIRED BEFORE BUILDING. Copy .env.example to .env.local
Copy-Item .env.example .env.local
#    then replace the two placeholder values with your Supabase project's URL and anon key:
#    NEXT_PUBLIC_SUPABASE_URL=...
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#    The live site already has these set in Netlify → Environment variables.

# 3. run
npm run dev            # http://localhost:3000

# 4. verify the baseline BEFORE changing anything
npm run lint
npx tsc --noEmit
npm run build
```

This sequence was run end to end against the extracted zip on a clean install: `npm install` (exit 0), `npm run lint` (clean), `npx tsc --noEmit` (clean), `npm run build` (32 pages, all 22 template previews prerendered).

Open (or point the Kombai extension at) `.kombai/canvas/profolion_templates.canvas`. The extension renders the canvas file directly from the repo — no import step. You should see 12 nodes under the "Template Showroom" frame:

| Canvas node | Label | App template id |
|---|---|---|
| `var_100ec6c3a362` | Template Showroom — live 22-world index | `/templates` (the showroom itself) |
| `var_c1b6dd8380d6` | Template Library — 22 specs and status | spec board, source of truth for status |
| `var_bfb2989e1d06` | Konoha Ink — Naruto | `konoha-ink` |
| `var_4884b516601d` | Soul Reaper — Bleach | `soul-reaper` |
| `var_c72da1816899` | Grand Line — One Piece | `grand-line` |
| `var_aced5a7c1769` | Cursed Energy — Jujutsu Kaisen | `cursed-energy` |
| `var_e0c673694364` | Arc Reactor — Iron Man | `arc-reactor` |
| `var_7dc0c55e2e72` | Gotham Nocturne — Batman | `gotham-nocturne` |
| `var_6523fb6acae8` | Last Son — Superman | `last-son` |
| `var_82d95316a7aa` | Iron Throne — Game of Thrones | `iron-throne` |
| `var_0fa73db7153f` | Dream House — Barbie | `dream-house` |
| `var_d4a7e7aa951c` | Deep Field — Space | `deep-field` |

The base of the canvas (the "Template Showroom" node) is not a template — it is the design of the `/templates` browser, already implemented in `TemplateGallery.tsx`.

---

## 3. Status table — all 22 templates

`Layout` / `Motion` are the values **already in the registry** and already live. `Canvas node` is where the bespoke design lives (blank = not designed yet).

### Anime — 5

| # | Template | World | Layout | Motion | Canvas node | Status |
|---|---|---|---|---|---|---|
| 1 | Konoha Ink | Naruto | scroll | `inkTrail` | `var_bfb2989e1d06` | ✅ designed + bespoke code |
| 2 | Soul Reaper | Bleach | editorial | `runeDraw` | `var_4884b516601d` | ✅ designed, linked via `EditorialLayout` |
| 3 | Grand Line | One Piece | scene | `magnet` | `var_c72da1816899` | ✅ designed, linked via `SceneLayout` |
| 4 | Cursed Energy | Jujutsu Kaisen | hud | `scramble` | `var_aced5a7c1769` | ✅ designed, linked via `HudLayout` |
| 5 | Breath of Flame | Demon Slayer | editorial | `streak` | — | ⏳ pending |

### Comics — 9

| # | Template | World | Layout | Motion | Canvas node | Status |
|---|---|---|---|---|---|---|
| 6 | Arc Reactor | Iron Man | hud | `ringFollow` | `var_e0c673694364` | ✅ designed + bespoke code |
| 7 | Star Shield | Captain America | deco | `sealPress` | — | ⏳ pending |
| 8 | Thunder Rune | Thor | deco | `tilt` | — | ⏳ pending |
| 9 | Web Slinger | Spider-Man | scene | `scramble` | — | ⏳ pending |
| 10 | Gotham Nocturne | Batman | deco | `searchlight` | `var_7dc0c55e2e72` | ✅ designed + bespoke code |
| 11 | Last Son | Superman | editorial | `orbit` | `var_6523fb6acae8` | ✅ designed, linked via `EditorialLayout` |
| 12 | Amazonia | Wonder Woman | deco | `runeDraw` | — | ⏳ pending |
| 13 | Emerald Oath | Green Lantern | hud | `magnet` | — | ⏳ pending |
| 14 | Scarlet Speed | The Flash | scene | `chargeHold` | — | ⏳ pending |

### Worlds — 8

| # | Template | World | Layout | Motion | Canvas node | Status |
|---|---|---|---|---|---|---|
| 15 | Alpine Meadow | Heidi | packaging | `caustics` | — | ⏳ pending |
| 16 | Owl Post | Harry Potter | editorial | `runeDraw` | — | ⏳ pending |
| 17 | Iron Throne | Game of Thrones | deco | `stamp` | `var_82d95316a7aa` | ✅ designed, linked via `DecoLayout` |
| 18 | Dream House | Barbie | packaging | `flapOpen` | `var_0fa73db7153f` | ✅ designed + bespoke code |
| 19 | Deep Field | Space | scene | `starfield` | `var_d4a7e7aa951c` | ✅ designed, linked via `SceneLayout` |
| 20 | Abyss Light | Ocean | scene | `dragRail` | — | ⏳ pending |
| 21 | Vinland Coast | Vinland Saga | editorial | `magnet` | — | ⏳ pending |
| 22 | Longship | Vikings | hud | `tilt` | — | ⏳ pending |

**Layout distribution (already fixed):** scroll 1 · editorial 4 · scene 4 · hud 3 · deco 5 · packaging 2.
**Motion distribution:** 16 mechanics, no mechanic repeats inside one family.

---

## 4. How the engine works (the only thing you must understand)

### 4.1 The three files that matter

```
src/lib/templates/registry.ts   ← 22 entries. Single source of truth. Palette, fonts, layout, motion, art.
src/components/portfolio/PortfolioRenderer.tsx   ← reads the entry, picks a layout, loads its fonts
src/components/portfolio/layouts/*.tsx           ← 6 structural archetypes
```

A template is **declared**, not implemented:

```ts
{
  id: "grand-line",
  name: "Grand Line",
  world: "One Piece",
  family: "anime",
  tagline: "Full-bleed poster hero, log-book work rows.",  // factual, not marketing
  layout: "scene",          // decides section order + structure
  motion: "magnet",         // decides the one signature interaction
  theme: { bg, surface, ink, muted, accent, accentInk, dark, darkInk, darkMuted },
  fonts: { display, body, mono, query: [FONT_QUERY.bebas, ...] },
  art: { hero?: string, project?: string },   // optional image URLs
  dense?: true              // optional tighter rhythm
}
```

### 4.2 What happens automatically when you add a registry entry

Nothing else needs editing. The entry instantly appears in:

- `/templates` — the showroom list, family filter counts, search
- `/templates/<id>` — a full-page preview, prerendered at build time
- the editor's template picker (`/portfolio/edit`)
- `/dashboard` — each portfolio shows its template name
- `/portfolio/<slug>` — a published portfolio renders in the saved template
- the gallery/picker **covers**, generated from the same palette + font tokens (`TemplateCover.tsx`)

### 4.3 The six archetypes and their section order

| Layout | Section order (as implemented in code) | Used by |
|---|---|---|
| `scroll` | dark ink hero → work → experience (dark) → education → elsewhere | Konoha Ink |
| `hud` | instrumented hero → about band → work (dark) → experience (dark) → education/elsewhere | Arc Reactor, Cursed Energy, Emerald Oath, Longship |
| `editorial` | print hero → work → experience (dark) → education → elsewhere | Soul Reaper, Last Son, Breath of Flame, Owl Post, Vinland Coast |
| `deco` | deco hero → about → work → experience (dark) → education/elsewhere | Gotham Nocturne, Iron Throne, Star Shield, Thunder Rune, Amazonia |
| `packaging` | blister hero → skills strip → work (draggable rail) → experience → education/elsewhere | Dream House, Alpine Meadow |
| `scene` | full-bleed hero → work → experience (dark) → education → elsewhere | Grand Line, Deep Field, Web Slinger, Scarlet Speed, Abyss Light |

A canvas design whose section order **equals** its archetype's default can be shipped by the registry alone (palette, fonts, ornament) — that is what the six "linked via archetype" templates are. A canvas design whose section order is **different** needs the bespoke-porting step in section 7.

### 4.4 The 16 signature interactions

`SignatureMotion.tsx` mounts one mechanic per template by reading `[data-template-root]` and wiring behaviour onto the data attributes the layout exposes. Every mechanic is pointer-, click- or drag-driven and **changes real state** — none of them is a fade. `prefers-reduced-motion` disables all of them without hiding content.

| Motion | What it does | Data attributes the layout must expose |
|---|---|---|
| `inkTrail` | fading ink dots follow the pointer inside the hero | `[data-ink-host]` |
| `sealPress` | a seal compresses, latches, releases; `aria-pressed` tracks it | `[data-seal]` |
| `ringFollow` | concentric rings rotate toward the pointer; crosshairs track | `[data-ring-panel]` (+ optional `[data-ring]`, `[data-crosshair]`) |
| `chargeHold` | press & hold ~900ms to fill a meter, then commit and scroll | `[data-charge]`, `[data-charge-fill]`, `[data-charge-label]`, `[data-charge-target]`, `[data-charge-done]` |
| `searchlight` | beam follows the pointer; a switch locks it and updates label | `[data-beam]`, `[data-signal]`, `[data-signal-state]` |
| `dragRail` | horizontal rail you can throw, with velocity decay | `[data-rail]`, `[data-rail-step]` |
| `flapOpen` | blister packs swing open to reveal the case study | `[data-flap]` |
| `stamp` | rubber stamp deposits a permanent imprint | `[data-stamp]` |
| `scramble` | text decodes from noise on hover/focus | `[data-scramble]` |
| `tilt` | cards lean individually toward the pointer | `[data-tilt]` |
| `streak` | speed lines spawn along the pointer path | `[data-streak-host]` |
| `orbit` | decorative rings parallax with pointer position | `[data-orbit]` |
| `caustics` | light position follows the pointer via CSS custom properties | `--caustic-x/y` on the root |
| `starfield` | star layers separate with pointer depth | `[data-stars]` |
| `magnet` | cards lean in as the cursor passes | `[data-magnet]` |
| `runeDraw` | a hand-drawn SVG rule completes itself on hover/focus | `[data-rune]` on the SVG `<path>` itself, plus a `[data-rune-host]` container that receives the hover/focus events |

**Registered but not yet wired in any layout:** `magnet`, `orbit`, `runeDraw` and `caustics` have no layout emitting their hooks, so the templates that declare them currently show no interaction (they do not error — the mechanic finds no target and exits). `caustics` behaves slightly differently: it always sets `--caustic-x/y` on the root, but no layout reads those variables yet, so nothing visibly changes. When you port a design whose motion is one of these, emit the hook. See section 7.3.

### 4.5 Content contract

Templates receive `PortfolioContent` — **never a database row**:

```ts
{ name, firstName, lastName, initial, role, bio, avatarUrl,
  skills: string[], projects: Item[], experience: Item[],
  education: Item[], socials: { label, url }[] }
// Item = { title, description?, link?, date? }
```

Adding a column to Supabase can never break a template. A layout may only render fields from this object plus fixed UI copy ("Selected work", "Experience", "Read case study").

---

## 5. Where the designs stand, page by page

For the six linked-via-archetype pages, this is what the canvas has that the code does not yet render. Use it to scope prompt 1.

| Template | Canvas page structure | Archetype it currently renders through | What the bespoke port must add |
|---|---|---|---|
| **Grand Line** (`One Piece`) | Site header with in-page nav (Plunder / Log / Port) → full-bleed poster hero with radial glow, eyebrow, name with accent surname, bio + skills row, status stats row, wave divider → "Plunder" work grid with card-footers → "Ship's log" experience rows → education + signals (socials) → footer. Pointer rotates a compass; cards use `[data-tilt]`. | `SceneLayout` | poster hero with wave divider + stats row; rename section headings; add compass rotation (`data-magnet` hook) |
| **Last Son** (`Superman`) | Hero with decorative orbital rings, eyebrow, monumental two-line name, intro + action grid → skills label → "Selected work" → "Experience" → "Education" → "Elsewhere". | `EditorialLayout` | orbital ring layer bound to `[data-orbit]`; monumental display sizing; simpler (non-numbered) section headers |
| **Iron Throne** (`Game of Thrones`) | Textured stone hero → "Deeds" (projects) with rule dividers → "Service" (experience) on dark → "Lineage" (education) → "Halls" (socials). | `DecoLayout` | themed section titles (Deeds/Service/Lineage/Halls); stone texture; `[data-stamp]` seal placement |
| **Cursed Energy** (`Jujutsu Kaisen`) | Nav (Work/Experience/Education/Links) → hero grid with headline + tagline → work → experience → a light two-column band (education) → links. Scanner keyframes (`spin`, `scan`). Headings decode via `[data-scramble]`. | `HudLayout` | scanner line + spin ornament; tilted instrument readouts; `[data-scramble]` on headings |
| **Soul Reaper** (`Bleach`) | Nav (work/experience/education/elsewhere) → hero with decorative shapes + info grid + action links → **dark skills band** → work with heading rule → experience (dark) → education → elsewhere. SVG rules drawn on hover. | `EditorialLayout` | dark skills band between hero and work; drawn `[data-rune]` rules on section headings; decorative hero shapes |
| **Deep Field** (`Space`) | Dark starfield hero → role label, name, lower split grid (description + quick-facts strip) → "Selected work" with a header bar showing a count → experience (dark) → lower two-column grid: education + links. Three star layers driven by `[data-stars]`. | `SceneLayout` | count in the work header; quick-facts strip; education + links in one two-column band; three star layers |

The four **bespoke-coded** pages (Konoha Ink, Arc Reactor, Gotham Nocturne, Dream House) are done. Do not redo them. Open their canvas node and their layout file side by side if you need a worked example of "how a canvas page becomes code": that pairing is the template for everything you write.

**Also in the canvas but not a template:** `var_c1b6dd8380d6` "Template Library — 22 specs and status" is the consolidated spec board (layout, motion, palette, structure, state per template). When you finish a design, update **both** the status badge on that board and the table in `TEMPLATE_HANDOFF.md`. A canvas that says "designed" while code says otherwise is how the last handoff got confusing.

---

## 6. Designing the remaining 12 (Kombai work — what to do on the canvas)

You have credits. Design. Do not change code in this phase.

### 6.1 Order to design them in

The registry already fixes each template's layout and motion, so you are designing **one specific structure** each time, not choosing one. Recommended order (groups share an archetype, so the second and third in a group go faster):

1. **Owl Post** (Harry Potter, editorial, `runeDraw`) — highest recognition value; parchment, quill rules.
2. **Emerald Oath** (Green Lantern, hud, `magnet`) — completes the "glowing instrument" family.
3. **Scarlet Speed** (The Flash, scene, `chargeHold`) — speed bands; the charge mechanic needs a meter designed into the hero.
4. **Web Slinger** (Spider-Man, scene, `scramble`) — sticker-edged cards; distinct from Grand Line's poster.
5. **Star Shield** (Captain America, deco, `sealPress`) — ceremonial centre; seal must be a real button.
6. **Thunder Rune** (Thor, deco, `tilt`) — rune ring; distinct from Gotham's searchlight deco.
7. **Amazonia** (Wonder Woman, deco, `runeDraw`) — layered frames + crest; distinct from Star Shield.
8. **Breath of Flame** (Demon Slayer, editorial, `streak`) — flame band over a ledger.
9. **Alpine Meadow** (Heidi, packaging, `caustics`) — soft panels; caustic light needs a host area.
10. **Abyss Light** (Ocean, scene, `dragRail`) — depth bands; design the rail with visible prev/next affordances.
11. **Vinland Coast** (Vinland Saga, editorial, `magnet`) — rugged poster, worn rules.
12. **Longship** (Vikings, hud, `tilt`) — longhouse hero, rune rails.

### 6.2 The design brief each page must satisfy

Draw each page as a **new variant node inside the existing "Template Showroom" frame** (`var_100ec6c3a362`), next to the other ten. Name the node `"<Template Name> — <World> template"` so it matches the existing naming.

A page is finished only when **all** of these are true:

- [ ] **It is a real portfolio, full page.** Not a hero-only mock. Every **non-empty** content section from `PortfolioContent` must appear: hero (name, role, bio, skills, links), Selected work (projects), Experience, Education, Social links. If a field is empty in the sample, the design must degrade gracefully.
- [ ] **It uses its archetype's section order** unless you can state in one sentence why this world needs a different one (in which case it becomes a new archetype — see 6.5).
- [ ] **Palette is exactly this template's `theme`** from `registry.ts` — nine tokens: `bg`, `surface`, `ink`, `muted`, `accent`, `accentInk`, `dark`, `darkInk`, `darkMuted`. Sample content, backgrounds and borders use **only** these. No extra hexes beyond tints via opacity.
- [ ] **Type is exactly this template's `fonts`** — display, body, and mono where labels/numbers appear. Two or three families maximum.
- [ ] **The signature interaction is designed in.** Build the element that responds (the seal, the meter, the rail, the ring, a card that leans, a rule that draws) and give it the data attribute from the table in 4.4. An interaction that is not visible in the design cannot be ported.
- [ ] **Responsive at 390px and 1280px**, no horizontal scroll.
- [ ] **Reduced motion**: the design contains no information that only appears on hover/pointer movement.
- [ ] **Every visible string is stored content or fixed UI copy.** No invented statistics, no versions, no coordinates, no "drag me" instructions.
- [ ] **Original artwork only.** No franchise logos, character likenesses, movie stills, or franchise fonts. The reference lives in colour, structure, ornament and motion. See section 11.

### 6.3 Palette and type reference for the 12 pending pages

These are the **exact current registry values** — copied from `src/lib/templates/registry.ts` and re-verified against the file. Design to these so the canvas and the app match; if you improve a palette, propose the change as a registry edit and say so explicitly. `surface`, `muted`, `accentInk`, `darkMuted` are in the registry beside each row; read them from there rather than inventing tints.

| Template | bg / ink | accent / accentInk | dark / darkInk | Fonts (display / body / mono) |
|---|---|---|---|---|
| Owl Post | `#F6EFDD` / `#14100F` | `#7A2230` / `#F6EFDD` | `#14100F` / `#B08D3F` | Cinzel / Cormorant Garamond / IBM Plex Mono |
| Emerald Oath | `#EDF5EF` / `#05100A` | `#2FB863` / `#05100A` | `#050A08` / `#3BE07A` | Archivo Black / Space Grotesk / IBM Plex Mono |
| Scarlet Speed | `#F7F2E9` / `#B3121C` | `#F5C518` / `#141014` | `#B3121C` / `#F5C518` | Bebas Neue / Space Grotesk / IBM Plex Mono |
| Web Slinger | `#F5F1E8` / `#14161B` | `#C4161C` / `#F5F1E8` | `#1B4FA0` / `#F5F1E8` | Archivo Black / Instrument Sans / IBM Plex Mono |
| Star Shield | `#F1EDE3` / `#12233A` | `#B01427` / `#F1EDE3` | `#12233A` / `#F1EDE3` | Cinzel / Barlow / IBM Plex Mono |
| Thunder Rune | `#EDF1F5` / `#0E1B2B` | `#D9A441` / `#0E1B2B` | `#0E1B2B` / `#7FD3E8` | Cinzel / Cormorant Garamond / IBM Plex Mono |
| Amazonia | `#F6F0E6` / `#14100E` | `#A8232F` / `#F6F0E6` | `#14100E` / `#C9A227` | Cinzel / Cormorant Garamond / IBM Plex Mono |
| Breath of Flame | `#F7EFE6` / `#141014` | `#D8462F` / `#F7EFE6` | `#141014` / `#F2C744` | Archivo Black / Instrument Sans / IBM Plex Mono |
| Alpine Meadow | `#F4EEDC` / `#3C3A2A` | `#6E9B57` / `#F4EEDC` | `#3C3A2A` / `#F4EEDC` | Fredoka / Nunito / IBM Plex Mono |
| Abyss Light | `#E6F2F2` / `#04121A` | `#17888F` / `#E6F2F2` | `#04121A` / `#4FD6C8` | Fraunces / Nunito / IBM Plex Mono |
| Vinland Coast | `#F0ECE4` / `#101519` | `#C77B33` / `#F0ECE4` | `#101519` / `#E9DFC9` | Bebas Neue / Instrument Sans / IBM Plex Mono |
| Longship | `#EDE7DA` / `#12100D` | `#8C1C13` / `#EDE7DA` | `#12100D` / `#C1732B` | Cinzel / Barlow / IBM Plex Mono |

**Visual direction already agreed** for the three notionally designed pieces (from `Design Directions for further features and templates.txt`) — keep this level of specificity:

- *Konoha Ink / Shinobi Archive Scroll*: Edo hanging scrolls, cinnabar seals, vertical brush lettering, warm paper, ink-wash fields, speckled flat surfaces, notched edges.
- *Arc Reactor / Powered Armor Cockpit*: teal hull, visor glass, machined plates, amber readouts, geometric display lettering, clipped corners, recessed wells.
- *Gotham Nocturne / Nocturnal Art Deco*: black stone + gold searchlights, violet vault, stepped frames, skyline presentation, open-tracked serif titles.

For each pending template write a two-line brief in that same shape before you draw (concept, then character), and add it to section 6.3 of this file when the page is done.

### 6.4 What each pending world should evoke (structure, not story)

| Template | Structural idea to design | Interaction to bake in |
|---|---|---|
| Owl Post | Parchment letter: envelope-fold hero, wax seal, quill-drawn rules, correspondence-style experience entries | `runeDraw` — rules draw under each section heading (`[data-rune]`) |
| Emerald Oath | Glowing construct rails, energy plates, hard light beams in the hero, ring of light as the accent motif | `magnet` — cards pivot toward the cursor (`[data-magnet]`) |
| Scarlet Speed | Diagonal speed bands, motion-blur streaks, a "charge" meter as a circular track in the hero | `chargeHold` — press and hold to fill, then jump to work (`[data-charge]`, `[data-charge-fill]`, `[data-charge-label]`) |
| Web Slinger | Comic sticker panels with halftone dots, web-rule dividers, masked card corners | `scramble` — project titles decode on hover (`[data-scramble]`) |
| Star Shield | Ceremonial centred hero with concentric rings and a star rule, civic/poster typography | `sealPress` — a shield seal you press, latches, releases (`[data-seal]`) |
| Thunder Rune | Rune ring framing the hero, gold keylines, storm-grey bands, rune-glyph labels | `tilt` — cards lean toward pointer (`[data-tilt]`) |
| Amazonia | Layered deco frames, crest, bronze/oxblood, tall narrow columns | `runeDraw` — ornament rule draws in (`[data-rune]`) |
| Breath of Flame | Flame-swept poster band over a ledger; ember particles along a rule | `streak` — speed lines follow the pointer (`[data-streak-host]`) |
| Alpine Meadow | Soft rounded panels, meadow-light wash, picture-book spacing, calendar-like education block | `caustics` — light follows pointer via `--caustic-x/y` |
| Abyss Light | Depth bands (light at top → dark below), caustic light shafts, horizontal project rail | `dragRail` — throwable project rail (`[data-rail]`, `[data-rail-step]`) |
| Vinland Coast | Rugged full-width poster, worn paper rules, axe-cut shapes, weathered texture | `magnet` — cards lean in (`[data-magnet]`) |
| Longship | Longhouse hero, timber bands, rune-carved rails, low horizontal HUD strip | `tilt` — cards lean (`[data-tilt]`) |

### 6.5 Only if a structure genuinely does not fit

The six archetypes cover: single-column dark hero + sections (`scroll`), instrument panel (`hud`), print article (`editorial`), symmetrical deco (`deco`), boxed/blister (`packaging`), full-bleed cinematic (`scene`). If a design truly needs a different section order, **that is a new archetype, not a flag inside an existing one**:

1. New file `src/components/portfolio/layouts/<Name>Layout.tsx` exporting `{ content, template }`.
2. Register it in `LAYOUTS` in `PortfolioRenderer.tsx` and add the id to `LayoutId` in `types.ts`.
3. Set `layout: "<name>"` on the one template that needs it.
4. The cover in `TemplateCover.tsx` needs a matching `case`, or it falls through to a default.

Adding a seventh archetype is a real cost. Prefer the registry-only path whenever the section order matches an existing archetype.

---

## 7. Linking a finished design into the app (code work — do this after each design, or in a batch)

The rule that keeps this maintainable: **a template is a registry entry.** A canvas page gives you palette, fonts, ornament and *section order*. If the order matches the archetype, you only edit the registry. If it does not, you write one bespoke layout for that template and leave the archetype alone.

### 7.0 Prerequisites (blocking)

**Four** registry `art` values currently point at Kombai-hosted images that **will expire** (only these four — every other entry has `art: {}`):

```ts
// registry.ts — verified line numbers as of this handoff
arc-reactor   :176  .art.hero    = "https://kombai-assets.b-cdn.net/.../ea7586e3...jpg"   // cockpit plate
arc-reactor   :177  .art.project = "https://kombai-assets.b-cdn.net/.../858e7dfd...jpg"   // suit schematic (different file)
gotham-nocturne :288 .art.hero    = "https://kombai-assets.b-cdn.net/.../fb7206cc...jpg"
gotham-nocturne :289 .art.project = "https://kombai-assets.b-cdn.net/.../fb7206cc...jpg"   // same file reused
konoha-ink    :38   .art.project = "https://kombai-assets.b-cdn.net/.../ba55f263...jpg"
```

That is **5 fields across 4 distinct images** (Gotham reuses one file for both slots). Those URLs live on Kombai's CDN, not yours. **When the host expires, the Arc Reactor hero + project, the Gotham hero, and the Konoha project image will 404 on the live Netlify site.** Before you ship anything else:

1. Download those images. Two are already local: `.kombai/assets/Machined teal armor plate-ea7586e3.jpg` (Arc Reactor hero) and `.kombai/assets/Technical suit schematic-858e7dfd.jpg` (Arc Reactor project). The Gotham and Konoha files still need downloading.
2. Put them in `public/art/` with stable names, e.g. `public/art/arc-reactor-hero.jpg`, `public/art/arc-reactor-project.jpg`, `public/art/gotham-nocturne-hero.jpg`, `public/art/konoha-ink-project.jpg`.
3. Change the registry values to `/art/arc-reactor-hero.jpg` etc.
4. Do the same for **every** image you generate from now on: generate → save into `public/art/` → reference `/art/<file>`. Never paste a design-tool CDN URL into the registry.

If a design has no artwork, leave `art: {}`. Layouts already handle a missing hero.

### 7.1 Path A — design matches its archetype (registry only)

Use this for most pages. It takes minutes and cannot break the build.

1. Open the canvas node. Copy the nine palette values into the entry's `theme`, mapping them to tokens: page ground → `bg`, panels → `surface`, body text → `ink`, secondary text → `muted`, the single signal colour → `accent`, text on it → `accentInk`, the inverse band (usually the hero) → `dark`, text on it → `darkInk`, secondary text on the band → `darkMuted`.
2. Map the fonts to `FONT_STACK` / `FONT_QUERY` in `src/lib/templates/fonts.ts`. If a family is not there yet, add both a query fragment (`Family+Name:wght@400;500;600`) and a stack (`'Family Name', fallback, serif|sans-serif`). Always include a real fallback.
3. Save generated art into `public/art/` and set `art` (see 7.0).
4. Rewrite `tagline` so it states the **structure** factually, e.g. `"Full-bleed poster hero, log-book work rows, dark service band."` Not marketing copy.
5. **Ornament that the archetype cannot express** (a wave divider, an orbital ring, a scanner line, a dark skills band): add it to the *archetype* only if it is generic; otherwise it is Path B. Small palette-driven variants can be gated on the template's own tokens or `template.motion`, which is how `SceneLayout` decides between starfield, rail and plain scene.
6. Nothing else. No route, no picker, no gallery edits.

### 7.2 Path B — the design needs its own section order (bespoke port)

This is what prompt 1 in section 8 does for the six archetype-linked templates.

1. Read the canvas node **and** its current archetype (`layouts/SceneLayout.tsx` etc.) side by side.
2. Write `src/components/portfolio/layouts/<Template>Layout.tsx` exporting the same `{ content, template }` signature. Copy the archetype's data-attribute hooks so `SignatureMotion` still binds:
   - `data-template-root` on the outermost element (mandatory)
   - the hook for that template's motion (table in 4.4) on exactly one place
   - any secondary hooks the archetype already used, if your design keeps that element
3. `SignatureMotion` is called **once**, inside the layout, with `motion={template.motion}` — never mount it twice.
4. Register it in `PortfolioRenderer.tsx` and `LayoutId` in `types.ts` (same steps as 6.5). If only one template uses it, that is fine; if the structure is genuinely generic, give it a neutral name.
5. Add a `case` in `TemplateCover.tsx` only if the cover needs to change; otherwise reuse the closest case.
6. Never hard-code a hex, a font family, or a pixel colour inside the layout. Everything comes from `template.theme` / `template.fonts`, with `alpha()` for tints.
7. No CSS `transition` on any element a mechanic animates — the mechanic owns that property.

### 7.3 Wiring the four unbound mechanics

`magnet`, `orbit`, `runeDraw` and `caustics` are implemented in `SignatureMotion.tsx` but no archetype emits their hook. Until a layout exposes it, a template using that motion simply shows no interaction (it does not error). Note that `runeDraw` targets `[data-rune]` on the SVG `<path>` and attaches its hover/focus listeners to the nearest `[data-rune-host]`, so you need both.

| Mechanic | Add to your layout | Where |
|---|---|---|
| `magnet` | `data-magnet` | each project/skill card wrapper |
| `orbit` | `data-orbit` | the ring/ornament container in the hero |
| `runeDraw` | `data-rune-host` on the heading container, and `data-rune` on an inline `<svg><path d="…" /></svg>` inside it — both are required | each section heading |
| `caustics` | nothing on the element — consume `--caustic-x` / `--caustic-y` in a `radial-gradient()` background (or a `filter`) on the host area; the mechanic sets them on the root for you | hero background |

Do this once per archetype where it makes sense (e.g. `data-rune` on every `deck`/`editorial` heading, `data-magnet` on project cards in `scene`), and the six already-linked templates gain their intended interaction for free.

### 7.4 Registry-only changes that are always safe

- Editing `theme`, `fonts`, `art`, `tagline`, `dense`.
- Adding an entry with a brand-new id.
- Editing a cover case that only affects visuals.

### 7.5 Things that must never be done

- Renaming or deleting an `id`. Published rows store the id; `getTemplate()` falls back to Konoha Ink on an unknown id, so a rename silently repaints live portfolios.
- Adding a database column a template reads directly.
- Passing the Supabase row into a layout.
- Adding an npm dependency for a template (no animation libraries — mechanics are hand-written).
- Loading every font family on one template page (`PortfolioRenderer` emits one `<link>` for the selected template only; keep it that way).
- Editing an existing migration file.

---

## 8. Copy-paste prompts for the next Kombai session

Paste one at a time. Each assumes this repo exactly as zipped. Replace `CANVAS` with the node id when known.

### Prompt 0 — prerequisites: make artwork durable

> In this Next.js 16 repository, `src/lib/templates/registry.ts` contains five `art.hero` / `art.project` values that point at `https://kombai-assets.b-cdn.net/...` URLs, hosted by a third party and liable to expire: `arc-reactor` hero and project, `gotham-nocturne` hero and project, and `konoha-ink` project. Two of those files already exist under `.kombai/assets/`. Download any that are missing, save each under `public/art/<template-id>-<hero|project>.jpg`, and update those registry values to the local `/art/...` paths. Do not change any other field. Then verify `npm run build` still prerenders all 22 `/templates/<id>` pages.

### Prompt 1 — port the six archetype-linked designs into bespoke code

> The Profolion template engine is in `src/lib/templates/registry.ts` (22 entries), `src/components/portfolio/layouts/` (6 archetypes) and `src/components/portfolio/motion/SignatureMotion.tsx` (16 mechanics). Six templates have bespoke designs on the canvas `.kombai/canvas/profolion_templates.canvas` but currently render through a shared archetype:
>
> - `var_c72da1816899` Grand Line (One Piece) — `scene`, motion `magnet`
> - `var_6523fb6acae8` Last Son (Superman) — `editorial`, motion `orbit`
> - `var_82d95316a7aa` Iron Throne (Game of Thrones) — `deco`, motion `stamp`
> - `var_aced5a7c1769` Cursed Energy (Jujutsu Kaisen) — `hud`, motion `scramble`
> - `var_4884b516601d` Soul Reaper (Bleach) — `editorial`, motion `runeDraw`
> - `var_d4a7e7aa951c` Deep Field (Space) — `scene`, motion `starfield`
>
> Bring each into code as its own renderer `src/components/portfolio/layouts/<Template>Layout.tsx` matching its canvas page, register it in `PortfolioRenderer.tsx` and `LayoutId`, and add a `TemplateCover.tsx` case only where the cover must differ. Rules: layouts consume `PortfolioContent` and never read Supabase; every colour and font comes from that template's `theme`/`fonts` via `alpha()`, no hard-coded hexes; every layout keeps `data-template-root` and the hook for its own motion (`[data-magnet]`, `[data-orbit]`, `[data-stamp]`, `[data-scramble]`, `[data-rune]`, `[data-stars]`); `SignatureMotion` is mounted exactly once per layout; no CSS `transition` on an animated element; no new npm dependency. Verify with `npm run lint`, `npx tsc --noEmit`, and by loading `/templates/grand-line`, `/templates/last-son`, `/templates/iron-throne`, `/templates/cursed-energy`, `/templates/soul-reaper`, `/templates/deep-field` at 1280 and 390 wide.

### Prompt 2 — design one pending page on the canvas

> In `CANVAS` (`.kombai/canvas/profolion_templates.canvas`), create a new variant node inside the "Template Showroom" frame (`var_100ec6c3a362`) labelled `<Template Name> — <World> template`, designed as a full portfolio page for the template `<template-id>` that is already declared in `src/lib/templates/registry.ts`. Use exactly that entry's nine `theme` tokens and its `fonts` — no other colours or families. Section order must follow the `<layout>` archetype: `<paste the archetype's section order from section 4.3>`. It must render hero (name, role, bio, skills, links), Selected work, Experience, Education and Social links, degrade cleanly when a field is empty, and not scroll horizontally at 390px or 1280px. Bake in the signature interaction `<motion>`: `<which element responds, and give it data-attribute>`. No franchise artwork, logos, character likenesses or franchise typography — original ornament only. Copy is either stored content or fixed UI labels; no invented statistics or instructions.

### Prompt 3 — link the freshly designed page into the app

> The canvas node `CANVAS` is now a finished design for template `<template-id>`. Open `src/lib/templates/registry.ts`, and update that entry's `theme` to exactly the nine colours in the design and its `fonts` to the families used (add missing `FONT_QUERY`/`FONT_STACK` entries in `src/lib/templates/fonts.ts` with real fallbacks). If the design's section order matches its current archetype, stop there. If it does not, write `src/components/portfolio/layouts/<Name>Layout.tsx`, register it in `PortfolioRenderer.tsx` and `LayoutId`, keep `data-template-root` plus the `data-*` hook for motion `<motion>`, and add a `TemplateCover.tsx` case only if the cover needs it. Put any generated artwork in `public/art/` and reference `/art/...`. Update the `tagline` to a factual one-line structure statement. Verify `/templates/<template-id>` at 1280 and 390, `npm run lint`, `npx tsc --noEmit`, `npm run build`.

### Prompt 4 — wire the four unbound mechanics into their archetypes

> `SignatureMotion.tsx` implements 16 mechanics, but `magnet`, `orbit`, `runeDraw` and `caustics` have no layout emitting their hooks, so the templates using them (`grand-line`, `emerald-oath`, `vinland-coast` → `magnet`; `last-son` → `orbit`; `soul-reaper`, `amazonia`, `owl-post` → `runeDraw`; `alpine-meadow` → `caustics`) show no interaction. Add the hooks described in `HANDOFF_README.md` section 4.4 to the appropriate elements in `ScrollLayout`, `HudLayout`, `EditorialLayout`, `DecoLayout`, `PackagingLayout`, `SceneLayout`: `data-magnet` on project/skill cards, `data-orbit` on the hero ornament container, `data-rune-host` on section-heading containers with `data-rune` on an inline SVG `<path>` inside each, and a `radial-gradient()` in the packaging hero that reads `--caustic-x`/`--caustic-y`. Do not change the mechanics themselves. Verify reduced-motion still hides nothing.

### Prompt 5 — put the library on the marketing home page

> `/` in this repository never mentions that Profolion ships 22 portfolio templates, though `/templates` exists. Add one section to `src/app/page.tsx` between "how it works" and the closing CTA: a short heading, a row of 4–6 palette-true covers using `TemplateCover`, and a link to `/templates`. Match the paper/forest/lime system in `src/app/globals.css` — no new colours, no invented statistics.

### Prompt 6 — accessibility and performance audit

> Review the template system: keyboard access to the template index and picker dialog (focus trap, `aria-activedescendant`, Escape), `prefers-reduced-motion` coverage for every one of the 16 mechanics, contrast of each template's `muted` text on its `bg` and `darkMuted` on `dark` (list any pair below 4.5:1 and fix it in the registry), and that no template loads more than three font families. Report findings as a list with file paths before changing anything.

---

## 9. Verification and deployment

### Local, before every commit

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Baseline verified on this zip:

```
▲ Next.js 16.4.3 (Turbopack)
✓ Compiled successfully
✓ Generating static pages (32/32)
● /templates/[id]  → 22 prerendered paths (konoha-ink … longship)
ƒ /portfolio/[slug]  → dynamic, as intended
```

Routes to click after any template change:

| Route | What must be true |
|---|---|
| `/templates` | every registry entry listed; search + family filter work; preview matches the selected palette |
| `/templates/<id>` | renders at 1280 **and** 390 with no horizontal scroll; "Use this template" carries the id |
| `/portfolio/edit?template=<id>` | the picker preselects it, staging works, Save persists `template` |
| `/portfolio/<slug>` | published page renders in its saved template; the product navbar is hidden |
| `/dashboard` | each card shows its template name |
| reduced motion (OS setting) | all 16 mechanics inert, all content visible |

### Netlify

The live build uses `netlify.toml`: `npm run build` → publish `.next`, Node 22, Next runtime plugin. **A pipeline change is a deploy, not a design change.**

- Every template page is **static** (`generateStaticParams` over `TEMPLATE_IDS`). A new registry entry becomes a new prerendered route at the next deploy — no manual route creation.
- `/portfolio/[slug]` is **dynamic** (server-rendered per request). Its template id is resolved at request time, so switching a portfolio's template takes effect immediately without a redeploy — but only if the id exists in the deployed registry. Ship the code first, then let users pick it.
- Env vars must exist in **Netlify → Site configuration → Environment variables** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). A template-only change never needs them changed.
- Images added to `public/art/` are served as-is; no image service is configured, so keep them compressed and reasonably sized.
- Deploy order for a new template: merge → Netlify builds → confirm `/templates/<new-id>` returns 200 on the live domain → then announce/enable.

---

## 10. Guardrails (these are not optional)

**Licensing.** Templates are named after public worlds, but every asset must be original: palettes, ornaments, SVG, CSS patterns, generated illustrations. Never ship franchise artwork, logos, character likenesses or franchise typography. The reference lives in colour, structure and motion.

**Copy.** Every visible string is a stored field (`title`, `bio`, `skills`, `projects`, `experience`, `education`, `social_links`) or fixed UI copy ("Selected work", "Experience", "Read case study"). No sentences that explain the layout. No instructions to click, hover or drag. No fake metadata — no versions, coordinates, serial numbers, liveness, "verified" badges. A stock photo credit belongs in `alt` only.

**Motion.** No fade-ins as the mechanism. One signature interaction per template, and it must change state. `prefers-reduced-motion` disables every mechanic without hiding content. Never put a CSS `transition` on an element a mechanic animates.

**Type.** Load only the families a template uses (`PortfolioRenderer` already does). Always provide a fallback stack. `display=swap` is in `googleFontsHref()`.

**Structure.** A new template is a registry entry plus, at most, one new archetype. If two templates need genuinely different section orders, that is two layouts — not flags inside one.

**Data.** Templates receive `PortfolioContent`. Never a database row. Never a new DB column read by a template.

---

## 11. Final scoreboard (update this when you finish a page)

| | Items |
|---|---|
| ✅ **Designed + linked to the app (10)** | Konoha Ink*, Soul Reaper, Grand Line, Cursed Energy, Arc Reactor*, Gotham Nocturne*, Last Son, Iron Throne, Dream House*, Deep Field |
| 🟡 **Designed, linked through archetype only (6 of the 10)** | Soul Reaper, Grand Line, Cursed Energy, Last Son, Iron Throne, Deep Field |
| ❌ **Designed but not linked (0)** | — |
| ⏳ **Pending design (12)** | Owl Post, Emerald Oath, Scarlet Speed, Web Slinger, Star Shield, Thunder Rune, Amazonia, Breath of Flame, Alpine Meadow, Abyss Light, Vinland Coast, Longship |

`*` = bespoke, one-off React markup (not just palette + archetype).

When you complete a pending page: flip it to ✅ here, flip it in the canvas spec board `var_c1b6dd8380d6`, and update the table in `TEMPLATE_HANDOFF.md`. Three places, one truth.
