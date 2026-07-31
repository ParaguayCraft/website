# Smell Report: ParaguayCraft Website

**Mode**: `/design smell`
**Date**: 2026-07-30
**Score**: 6/10 — PRESENT

## TL;DR

The palette is the strongest element — Paraguayan flag red/white/blue with dark cinematic base. Three generic tells detected: a textbook feature tile grid, faint unearned blur on floating panels, and a center-stack reflex throughout sections. The domain fusion (Minecraft + Paraguay + cinematic survival) is specific, not generic.

## Heuristic Scores

| # | Odor | Score | Finding |
|---|---|---|---|
| 1 | Tech Gradient | 1 | Red radial in hero is domain-appropriate; Discord CTA blue-purple gradient is faint but not the classic indigo-cyan | 
| 2 | Generic Tech Hue | 1 | Red/blue from Paraguayan flag, not blue-purple tech reflex |
| 3 | Feature Tile Grid | 0 | Five equal cards in uniform grid — icon, heading, one sentence — with no hierarchy between them |
| 4 | Accent Rail | 1 | No colored side stripes on cards |
| 5 | Unearned Blur | 0 | `backdrop-blur-sm` on Header and ServerConnectionBar without a real depth system |
| 6 | Stat Monument | 1 | Player count, version, IP — all server-domain stats with context |
| 7 | Icon Topper | 1 | Paraguayan flag color diamonds have domain meaning, not decorative filler |
| 8 | Bounce Everywhere | 1 | Motion uses simple fade + slide with `easeOut`; no elastic or bounce |
| 9 | Default Type | 1 | Inter + Minecraft display font per spec; intentional choice |
| 10 | Center Stack | 0 | Hero, feature heading, and CTA all centered; InformationGrid breaks the pattern |

## Symptoms

### Strong: Feature Tile Grid
Five identical cards with icon + colored title + one-sentence description. Every card has equal visual weight and the grid gives no indication of which features matter most. This is the most common AI-generated homepage pattern.

### Faint: Unearned Blur  
`backdrop-blur-sm` appears on the Header (after scroll) and ServerConnectionBar. These elements float but there's no consistent elevation system — no shadow scale, no z-index rationale, no intentional depth layering.

### Faint: Center Stack
Hero, section headings, and Discord CTA all use `text-center`. The InformationGrid breaks this with a multi-column layout, but three of five sections default to centered alignment without compositional tension.

## Domain Default Check

A Minecraft server site as dark + blocky is the domain expectation. The Paraguayan identity (flag colors, Spanish copy, national pride in feature descriptions) breaks the generic mold. The cinematic castle-survival atmosphere is a deliberate fusion, not a default.

## Positive Signals

- Palette has project-level justification (Paraguayan flag hex values)
- Typography follows the spec's two-font system
- Server-status states (loading, error, offline) are implemented
- Castle SVG silhouette is custom, not a stock asset
- Button interactions have active press states
- `prefers-reduced-motion` is respected

## Next Modes

- `/design relayout` — break the feature tile grid, introduce hierarchy
- `/design refine` — replace backdrop-blur with intentional depth or remove it
- `/design relayout` — add compositional tension to centered sections
