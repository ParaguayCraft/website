# Checkup Report: ParaguayCraft Website

**Mode**: `/design checkup`
**Date**: 2026-07-30
**Score**: 50/60

## TL;DR

Healthy overall. Palette, typography, and semantics are strong. Two Watch items: responsiveness is code-inspected but not viewport-tested, and muted text contrast is borderline. No Critical issues. This is shippable with minor tightening.

## Heuristic Scores

| # | Vital | Score | Status | Finding |
|---|---|---|---|---|
| 1 | Intentionality | 10/10 | Healthy | Palette from Paraguayan flag, spec-driven type, custom castle SVG, block-style panels — chosen, not defaulted |
| 2 | Readability | 10/10 | Healthy | Light text on dark base has good contrast; Inter body at readable size; Spanish copy is clear |
| 3 | Usability | 10/10 | Healthy | Copy IP works, Discord links resolve, nav is clear, status has loading/error/offline states, primary actions discoverable |
| 4 | Responsiveness | 5/10 | Watch | Tailwind breakpoints present; mobile nav and card stacking from code analysis; no viewport testing done; no iOS Safari input zoom check |
| 5 | Speed | 10/10 | Healthy | Turbopack build ~1.1s; no heavy JS beyond framer-motion; standalone output; lazy-load on below-fold content not verified |
| 6 | Accessibility | 5/10 | Watch | Strong semantics (`<header>`, `<nav>`, `<main>`, `<article>`, `aria-label`, `role="progressbar"`, `lang="es"`); focus-visible implemented; `prefers-reduced-motion` honored; muted text #777e82 on #080b0d is ~4.7:1 — passes WCAG AA for regular text, fails for small text |

## Positive Signals

- Focus outlines visible and styled
- Keyboard-accessible mobile menu with Escape key support
- Semantic HTML throughout
- Spanish `lang` attribute
- Progress bar has ARIA role and values
- Reduced-motion media query present

## Risk Signals

- Muted text (`text-muted` #777e82) contrast borderline for small text
- Responsive behavior not verified on real viewports
- iOS Safari form zoom not checked (no form elements currently present)
- Mapa iframe has no loading state or connection error handling
- No skip-to-content link

## Next Modes

- `/design finish` — run responsive verification, bump muted text contrast, add skip link
- `/design interaction` — add iframe error state for mapa page
