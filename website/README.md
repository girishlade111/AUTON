# AUTON — Girish Lade Portfolio (Next.js)

Animated dark-theme portfolio built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis**, designed 1:1 from the reference video in the repo root.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

## Deploy to Vercel

The app lives in the `website/` subfolder of this repository.

1. Push this repo to GitHub (already done).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the `girishlade111/AUTON` repository.
3. In the import screen, set **Root Directory** to `website` — Vercel auto-detects Next.js and fills in the build settings (`npm run build`, output `.next`). Leave everything else default.
4. Add the environment variable (optional but recommended):

   | Key | Value | Notes |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>.vercel.app` or your custom domain | Drives canonical URLs, Open Graph tags, robots.txt and sitemap.xml |

5. Click **Deploy**. Every push to `main` redeploys automatically; pull requests get preview URLs.

### Custom domain (optional)
Vercel → Project → Settings → Domains → add your domain, then point your DNS at Vercel (instructions shown in the dashboard). Update `NEXT_PUBLIC_SITE_URL` to the final domain afterwards.

## Production optimizations already in place

- Fully static prerender (`/` served from Vercel's edge CDN)
- AVIF/WebP image pipeline via `next/image` + long-lived cache headers for `/images/*`
- Hero photo compressed (78 KB, was 1.4 MB) with `priority` loading
- Security headers (`X-Frame-Options`, `nosniff`, Referrer-Policy, Permissions-Policy), `X-Powered-By` removed
- `robots.txt` + `sitemap.xml` routes generated from `NEXT_PUBLIC_SITE_URL`
- `prefers-reduced-motion` support; keyboard-accessible nav and forms

## Content TODOs (marked in code)

- `src/components/Hero.tsx` — swap the hero photo for a real one
- `src/components/Services.tsx` / `Projects.tsx` — replace placeholder screenshots in `public/images/`
- `src/components/Contact.tsx` — real LinkedIn/X URLs, wire the form stub to a backend
- `src/components/Testimonials.tsx` — add real quotes
