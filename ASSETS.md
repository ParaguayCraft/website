# ParaguayCraft Website Assets

## Current State

The hero section uses an original hand-authored inline SVG scene created for ParaguayCraft:
a layered dusk composition with a crenellated castle (keep, side towers, lit windows,
glowing gate), the Paraguayan triband flying from the keep, a sunset sky with stars,
distant sierra silhouettes, a river reflection, valley mist, a torch-lit approach, and
framing foreground trees. It replaces the earlier flat-rectangle placeholder composition.

### Hero SVG (`src/components/hero/Hero.tsx` — inline)
- Source: Original vector artwork hand-authored for ParaguayCraft (no third-party or
  Minecraft-derived imagery; pure SVG shapes authored in code)
- License: ParaguayCraft-owned
- Status: CURRENT original artwork — may later be replaced by an owner-approved
  cinematic screenshot (see Pending Owner Assets)

### PR documentation screenshots (`docs/screenshots/`)
- `hero-desktop.png` (1920×1080 viewport) and `hero-mobile.png` (390×844 viewport)
- Source: captured locally from this branch's production build with Playwright (Chromium)
- Purpose: PR review documentation of the rendered hero scene

## Pending Owner Assets

The following assets require the ParaguayCraft owner to provide:

1. **Final hero image** — A cinematic Minecraft screenshot showing the ParaguayCraft spawn/castle/city.
   Should be desktop (1920px wide minimum) and mobile (768px wide minimum) variants.

2. **Server screenshots** — Real screenshots from the actual server for:
   - Homepage "Sobre nosotros" section
   - `/informacion` page

3. **News thumbnails** — Images for each news article (currently category badges serve as fallbacks).

4. **Favicon** — A custom ParaguayCraft icon (currently using a simple "PC" SVG).

## Adding New Assets

Place asset files in:
```
public/images/hero/       — hero background images
public/images/server/     — server screenshots
public/images/news/       — news article thumbnails
public/images/brand/      — logos, favicon, brand assets
```

Use `next/image` with `sizes` attribute for all raster images.
Convert to WebP or AVIF before committing.

## Asset Policy

- Do not use random Google images or other server screenshots
- All assets must be ParaguayCraft-owned, properly licensed, or original
- Document the source and license of each asset in this file
