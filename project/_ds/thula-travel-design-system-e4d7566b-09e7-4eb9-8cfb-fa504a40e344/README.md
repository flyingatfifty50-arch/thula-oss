# Thula Travel — Design System

> **Thula** (isiZulu: *“be still”*) crafts **bespoke wellness & quiet retreats across South Africa, made for women.**
> No bucket lists. No noise. Slow, hand-built escapes — vetted, female-guided, and built around one woman or one small circle of them.

This repository is the brand's design system: color, type, shape and motion foundations, content/voice guidelines, reusable UI components, and a high-fidelity recreation of the marketing website. Use it to produce on-brand interfaces and assets — production or throwaway.

---

## Brand at a glance

| | |
|---|---|
| **Product** | A marketing website selling bespoke, women-only wellness retreats in South Africa. |
| **Audience** | Women (often 30s–60s, local & international) who are quietly burnt out and craving rest, safety and slowness. |
| **Personality** | Bold but classy · witty & warm · unhurried · grounded · a little poetic. |
| **Promise** | "Travel that gives you back to yourself." |
| **Palette** | **South African flag** — green, gold, chilli red, national blue, black & white — on warm cream. |
| **Shape language** | Generously rounded. Soft corners, pill buttons, warm low-contrast shadows. |

### Sources
This system was created from a brand brief (no prior codebase or Figma). There are **no external source files** to link — everything here is original to this project. If a codebase or Figma is added later, document its links/paths in this section.

---

## CONTENT FUNDAMENTALS — how Thula writes

The voice is **warm, witty, and quietly confident** — like a well-travelled friend who happens to be unbothered by luxury. It is bold in its point of view but never shouty.

- **Person:** Speaks as **"we"**, addresses the reader as **"you"**. Intimate, never corporate.
- **Casing:** **Sentence case** everywhere — headlines, buttons, labels. Only the wordmark and proper nouns are capitalised. Eyebrows are the one exception (UPPERCASE, wide-tracked).
- **Tone:** Calm and human first; wit is dry and gentle, never zany. Permission to rest is a recurring theme.
- **Sentences:** Short. Often fragments. Rhythm matters — copy is written to be *read slowly*.
- **Emoji:** Almost never. One warm flag (🇿🇦) appears in the footer as a signature; otherwise none. Use icons, not emoji.
- **Numbers:** Used sparingly and only when they reassure (group size, nights, "100% female-guided") — never vanity stats.

**Voice examples (use these as a yardstick):**
- Hero: *"Come be still."*
- Sub: *"Quiet, hand-crafted wellness escapes for women — where the only thing on the itinerary is you. No noise. No rush. Just sunsets you'll feel in your chest."*
- Packages: *"Pick a feeling, not a checklist."*
- Bespoke: *"Don't see your kind of quiet? Tell us what rest looks like for you and we'll build it from scratch."*
- Contact: *"Tell us where it hurts to rush."*
- Microcopy: *"scroll, slowly"* · *"Read one with tea."* · *"Slow letters, no noise."*
- Testimonial: *"I arrived holding my breath. By the third sunset I'd forgotten I was holding anything at all."*

**Do:** be poetic but concrete; let silence into the copy; lead with feeling.
**Don't:** use travel-industry clichés ("hidden gem", "bucket list", "wanderlust"), exclamation-mark hype, or urgency/FOMO tactics.

---

## VISUAL FOUNDATIONS

**Color.** Drawn directly from the **South African flag**, warmed for a wellness context. **Chilli red `#DE3831`** is the primary/CTA energy; **gold `#FFB915`** the warm highlight; **spectrum green `#007A4D`** carries nature & wellness and deepens to a rich **`#0B4A2E`** for dark sections and the footer; **national blue `#002395`** is the deep accent. **Black `#1F1E1A`** (warmed, never pure) sets text; **white** appears as **warm cream `#FBF7EE`** for backgrounds — never stark. Each flag colour is extended into a small tint/shade scale for real UI use. See `colors_and_type.css`.

**Two palettes, one set of tokens.** The system ships with a **Bold flag** default and a **Calm heritage** alternative (green + gold lead, red reserved for CTAs, blue retired into warm stone, everything desaturated). They share the exact same token names — set `data-palette="calm"` on `:root` (or flip it in the website's **Tweaks** panel) and the entire system, imagery included, re-skins instantly. Use Bold for splashy hero/campaign moments, Calm for long-form reading and editorial.

**Type.** Two roles (see substitution note below):
- *Headings* — **Amsterdam Three**, a signature brush script — used large for hero/section moments. Adds the warm, hand-made signature.
- *Body & functional headings (h3↓)* — **Recoleta**, a soft rounded serif — classy and highly legible. The script is never used below ~h2 size so reading stays effortless.

**Spacing & layout.** 8pt-based rhythm with generous air; content max-width ~1240px, 40px gutters. Sections breathe with 90–130px vertical padding. Layouts alternate between cream (`--paper`), tonal sand (`--sand`) and tinted hero washes (blush/amber/sage) to create rhythm. One or two background tones per page, max.

**Backgrounds & imagery.** Photography is the hero medium — warm, golden-hour, sun-washed landscapes and intimate moments; never cold or clinical. **Until real photos are supplied, the kit uses on-brand sunset/fynbos/dusk gradient placeholders** (see `Figure` component) with a soft vignette + subtle grain to mimic photographic warmth. Hero sections layer a radial "sun" glow and a top protection scrim so cream nav text stays legible.

**Corners.** Everything is rounded — small `6px`, cards `24px`, hero panels `36px`, and **pill (`999px`) for all buttons, tags and inputs**. Nothing sharp.

**Shadows.** Warm and soft, tinted with espresso (`rgba(94,60,38,…)`) — never grey, never harsh. Three tiers (sm/md/lg) plus a clay-tinted `--shadow-glow` for primary-button hover.

**Borders.** Hairline `1px` in warm sand `#E4D5C0`. Buttons use `1.5px`.

**Motion.** Gentle and unhurried. `240ms` with a soft ease-out (`cubic-bezier(0.22,0.61,0.36,1)`). Pages fade + rise `8px` on enter. Cards lift `-4px` on hover. Arrows nudge `+4px` on hover. No bounces, no spins — motion should feel like a slow exhale.

**Hover / press states.** Hover: primary darkens to `--clay-600` and gains the warm glow; secondary/ghost fill in; links rise to full opacity. Press: subtle `scale(0.97)`. Inputs: `1.5px` clay border + a soft `4px` clay focus ring.

**Transparency & blur.** Used only on the sticky nav once scrolled (cream at 86% + `blur(14px)` saturate) and for the protection scrim over hero imagery. Otherwise surfaces are solid.

**Cards.** Solid `--card` (`#FFFBF4`), `1px` sand border, `24px` radius, soft `shadow-sm` at rest → `shadow-lg` + lift on hover. Image sits flush at the top (radius 0 inside the clipped card), content padded `22–26px`.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) — thin (`1.75` stroke), rounded line icons. Their soft, even stroke matches the brand's gentle, classy feel. Loaded from CDN (`lucide@0.469.0`) and rendered via the `<Icon>` component in the UI kit.
- **Why Lucide:** open-source, rounded line terminals, no fills — quiet and elegant, never chunky or playful. If you need an icon not in Lucide, pick the nearest Lucide glyph before reaching elsewhere.
- **Common glyphs in use:** `map-pin`, `leaf`, `sun`, `moon`, `heart`, `heart-handshake`, `shield-check`, `users`, `camera`, `quote`, `arrow-right`, `chevron-down`, `mail`, `phone`, `sparkles`, social (`instagram`, `facebook`, `youtube`).
- **Emoji:** avoided. The single exception is 🇿🇦 in the footer copyright line, used as a warm signature.
- **Unicode glyphs:** not used as icons. Use Lucide.
- **Logo / wordmark:** there is no separate logo file — the brand mark is the **wordmark**: "Thula" set in the script face, with a small wide-tracked "TRAVEL" lockup beneath. Rendered by the `<Wordmark>` component. (A dedicated SVG logo should be commissioned for production.)

---

## ⚠️ Font substitution — please confirm

The brand fonts are **commercial and not bundled here**. The kit substitutes the nearest free Google Fonts so everything renders today:

| Brand intent | Role | Substitute in use | Notes |
|---|---|---|---|
| **Amsterdam Three** (signature script) | Headings / display | **Dancing Script** | Warm, bold-capable signature script. The real Amsterdam Three is a more refined brush signature. |
| **Recoleta** (rounded serif) | Body + h3↓ | **Lora** | Classy, warm, legible serif. Recoleta is softer/rounder & more geometric. |

**Action for you:** if you have licensed `.woff2`/`.ttf` files for Amsterdam Three and Recoleta, drop them into `/fonts` and update the `@font-face` / `--font-script` / `--font-serif` declarations in `colors_and_type.css`. Until then, the substitutes above are wired up.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — brand context, voice, visual foundations, iconography. |
| `colors_and_type.css` | The single source of truth: color scale + semantic tokens, type families & scale, radii, shadows, spacing, motion. Import this everywhere. |
| `SKILL.md` | Agent Skill manifest — lets this system be used as a downloadable Claude skill. |
| `preview/` | Small HTML specimen cards that populate the **Design System** tab (colors, type, components, etc.). Reference, not for reuse. |
| `ui_kits/website/` | **The product** — a high-fidelity, interactive recreation of the Thula marketing site. See its own `README.md`. |
| `fonts/` | (Reserved) drop licensed brand font files here. |
| `assets/` | (Reserved) drop logos, real photography and brand imagery here. |

### UI kits
- **`ui_kits/website/`** — the marketing website. 5 pages (Home, About, Retreats/Packages, Journal/Blog, Contact+Footer) built from reusable JSX components (`ui.jsx`, `Chrome.jsx`, `Pages1.jsx`, `Pages2.jsx`). Open `ui_kits/website/index.html` for the click-through prototype.
