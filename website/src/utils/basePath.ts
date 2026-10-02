/**
 * Deploy subpath helper (single source of truth for the project-site base).
 *
 * `output: "export"` + `images.unoptimized` means next/image passes `src`
 * through untouched, so the `basePath` prefix is NOT applied automatically.
 * Route every public/ asset through `withBase()` instead of hardcoding it.
 *
 * Set NEXT_PUBLIC_BASE_PATH=/AUTON when building for GitHub Pages;
 * leave it empty for local dev (`npm run dev`).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}
