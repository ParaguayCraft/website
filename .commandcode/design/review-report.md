# Review Report: ParaguayCraft Website

**Mode**: `/design review`
**Date**: 2026-07-30
**Score**: 34/50

## TL;DR

The site has a clear identity — Paraguayan Minecraft server with cinematic survival atmosphere. The palette is its strongest asset, with flag-derived red/white/blue carrying real meaning. The feature tile grid and muted type voice hold it back from feeling like a premium network homepage. The interaction feel is functional but basic.

## Heuristic Scores

| # | Lens | Score | Finding |
|---|---|---|---|
| 1 | First Impression | 7/10 | Dark cinematic feel with castle silhouette and Paraguayan colors creates a specific mood. The castle SVG at 0.06 opacity barely registers — the visual hook is weaker than it should be. |
| 2 | Hierarchy | 7/10 | Hero hierarchy is clear (greeting → title → description → actions). Feature cards have equal weight with no priority. Information grid's 3 panels have no visual ranking. |
| 3 | Color Voice | 8/10 | Every color has a domain job: red for PvP/CTAs, blue for links/community, green for online/survival, gold for economy, purple for events. Discord CTA's blue-to-purple gradient is the only generic moment. |
| 4 | Type Voice | 6/10 | Two-font system per spec (Minecraft display + Inter body). But the display font relies on "Minecraft Ten" which may not be loaded — fallback to "Press Start 2P" will dramatically change the feel. No `@font-face` or hosted font. |
| 5 | Interaction Feel | 6/10 | Buttons have active press states (shadow removal + translate). Cards have hover lift. Copy IP has confirmation feedback. Missing: loading skeletons, status change transitions, mobile menu close animation. States exist but transitions are minimal. |

## What's Working

**Palette justification** — Every accent color traces back to the Paraguayan flag or Minecraft domain. No random hex values. The dark base (#080b0d) gives the site cinematic weight.

**State coverage** — Server status handles loading, online, offline, and error. News handles empty. Copy button handles confirmation. This is more states than most generated landing pages cover.

**Semantic foundation** — Proper HTML landmarks, ARIA labels, keyboard support, and reduced-motion respect make this accessible from the structure up.

**Domain specificity** — "PARAGUAY" in white + "CRAFT" in red, Spanish copy, national pride in feature descriptions, flag-color diamonds. This could not be rethemed to a generic SaaS product by changing the logo.

## Priority Issues

**P0: Feature Tile Grid**
Five equal cards with no hierarchy. Icon + heading + one sentence per card. No feature leads, no priority, no variation in rhythm. This is the most generic pattern on the page.
→ `/design relayout` — break the uniform grid, give one feature visual dominance, vary card density or layout.

**P1: Type fallback risk**
Display font depends on "Minecraft Ten" which isn't loaded via `@font-face`. The fallback stack goes to "Press Start 2P" then generic monospace. Without the intended font, the entire heading + button voice collapses.
→ `/design typeset` — add `@font-face` for a properly licensed Minecraft-style font, or commit to a loaded display font.

**P1: Muted text contrast**
`text-muted` (#777e82) at 4.7:1 on background passes WCAG AA for regular text but fails for small/caption text at 12px or below. NewsCard uses `text-xs` with muted color — that's a real readability issue.
→ `/design recolor` — bump muted text to at least #8a8f92 for 5.5:1 ratio.

**P2: Castle SVG opacity**
The hero's castle silhouette at `opacity-[0.06]` is nearly invisible. The cinematic promise of "large castle or fortified Paraguayan city" from the spec isn't visually delivered.
→ Raise opacity to 0.12–0.15 or replace with actual artwork.

**P2: BlueMap iframe no error state**
The `/mapa` page shows a full-screen iframe but has no loading indicator or connection-failed message when BlueMap isn't running.
→ `/design interaction` — add loading spinner and error state for iframe.

## First Impression

The site opens with a dark cinematic mood — deep near-black background, warm red glow, and a faint castle silhouette. "Bienvenido a PARAGUAY CRAFT" establishes the brand immediately. The Paraguayan red CTA button stands out as the primary action. It feels like a Minecraft server homepage, not a SaaS template.

What's missing: the castle silhouette is too faint to register as a visual hook. A first-time visitor won't see it. The hero depends on the red glow and typography alone to create atmosphere.

## Smell Check

Three generic tells present: feature tile grid (strong), unearned blur (faint), center stack reflex (faint). See `.commandcode/design/smell-report.md` for full catalog.

## Next Modes

1. `/design relayout` — break the feature tile grid, introduce hierarchy
2. `/design typeset` — load or replace the display font properly
3. `/design recolor` — bump muted text contrast
4. `/design refine` — raise castle opacity, add iframe error state
