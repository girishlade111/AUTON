import type { NextConfig } from "next";
import path from "path";

// Keep file tracing / Turbopack rooted at this app folder (matters when the
// repo root is a parent directory, e.g. deployed from a monorepo subfolder).
const appRoot = __dirname;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Static export for GitHub Pages project-site hosting at /AUTON.
  output: "export",
  basePath: "/AUTON",

  turbopack: {
    root: path.resolve(appRoot),
  },
  outputFileTracingRoot: path.resolve(appRoot),

  images: {
    // Static export has no image optimizer — serve originals.
    unoptimized: true,
    // Vercel's image CDN serves AVIF with WebP fallback automatically.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Brand/placeholder assets in /images never change — cache hard at the edge.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
