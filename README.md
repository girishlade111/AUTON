# AUTON

**AUTON** — a cinematic, motion-rich personal portfolio site for Girish Lade (solo founder of LadeStack). Dark editorial aesthetic: black plate, ink gradients, green accent, giant display typography, scroll-driven reveals.

**Live site:** https://girishlade111.github.io/AUTON/

## What's in this repo

| Path | What it is |
|---|---|
| `website/` | The Next.js 16 + React 19 + Tailwind CSS v4 app (the actual site) |
| `01–13-*.md` | Section-by-section build prompts (hero entrance, sticky nav pill, word-by-word scroll reveals, services hover rows, project showcase, logo marquee, testimonials, contact form, footer, smooth-scroll nav) |
| `14-image-editing-prompt-landscape-hero-portrait.md` | Prompt recipe for the hero portrait image edit |
| `DESIGN.md` | Token-driven design-system guidance (colors, type scale, spacing, radius, motion, accessibility) |
| `SKILL.md` | Reusable design-system skill definition |

## Features (website/)

- 🎞️ **Hero** — full-bleed portrait with entrance cascade, scroll parallax exit
- 🧭 **Sticky bottom nav pill** with smooth-scroll anchor navigation (Lenis)
- ✍️ **About** — word-by-word scroll reveal
- 🛠️ **Services** — hover-expand rows with floating photo previews
- 🗂️ **Projects** — staggered showcase of live LadeStack products with ghost watermarks
- ∞ **Skills** — infinite logo marquee
- 💬 **Testimonials** — reveal-on-scroll cards
- ✉️ **Contact** form section + **giant-text hover footer**
- 🔍 **SEO** — metadata API (canonical, Open Graph, Twitter cards), `robots.txt`, `sitemap.xml`

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (static export), React 19 |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion 13, Lenis smooth scroll |
| TypeScript | Strict |
| Hosting | GitHub Pages (project site at `/AUTON` subpath) |

## Quick start

```sh
cd website
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # static export → website/out/
```

## Deploy notes

The site is a **fully static export** — no server, no API routes, no environment variables.

- `website/next.config.ts` sets `output: "export"` and `basePath: "/AUTON"` for GitHub Pages project-site hosting.
- `output: "export"` + `images.unoptimized` means `next/image` passes `src` through untouched — the `basePath` prefix is **not** applied automatically. Every `public/` asset is therefore routed through `withBase()` in `website/src/utils/basePath.ts`, which prefixes `NEXT_PUBLIC_BASE_PATH` (set to `/AUTON` at build time, empty for local dev). Never hardcode `/AUTON` in components.
- `async headers()` in the config is a no-op under static export (Next.js warns, build still succeeds).
- Metadata routes (`robots.ts`, `sitemap.ts`) need `export const dynamic = "force-static"` under `output: "export"`; canonical/OG URLs come from `NEXT_PUBLIC_SITE_URL` (set to `https://girishlade111.github.io/AUTON` at build time).
- Deploy flow: `npm run build` → publish `website/out/` to the `gh-pages` branch → GitHub Pages serves it at https://girishlade111.github.io/AUTON/.

## License

All rights reserved. Built by [Girish Lade](https://ladestack.in).
