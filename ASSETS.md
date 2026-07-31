# ParaguayCraft Website Assets

## Current State

The hero section uses an original SVG composition of a castle silhouetted against a warm sunset sky.
This is a temporary placeholder composition created for ParaguayCraft.

### Hero SVG (`src/components/hero/Hero.tsx` — inline)
- Source: Original composition created for ParaguayCraft
- License: ParaguayCraft-owned
- Status: TEMPORARY — awaiting final owner-approved hero artwork

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
