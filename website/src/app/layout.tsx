import type { Metadata } from "next";
import { Inter, Oswald, Poppins, Mrs_Saint_Delafield } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const signature = Mrs_Saint_Delafield({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

/* TODO: set NEXT_PUBLIC_SITE_URL in Vercel → Settings → Environment Variables
   to your final domain (e.g. https://girishlade.vercel.app or a custom domain).
   It drives canonical URLs, Open Graph tags, robots and the sitemap. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Girish Lade — Building AI-Powered Tools That Empower Developers",
  description:
    "Portfolio of Girish Lade, solo founder of Lade Stack — free, no-login, AI-powered developer tools. Mechanical engineer turned software builder, vibe-coding products end-to-end.",
  alternates: { canonical: "/" },
  icons: { icon: "/images/logo.png" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Girish Lade",
    title: "Girish Lade — Building AI-Powered Tools That Empower Developers",
    description:
      "Solo founder of Lade Stack — free, no-login, AI-powered developer tools. Mechanical engineer turned software builder.",
    images: [{ url: "/images/hero-portrait.jpg", width: 1920, height: 1080, alt: "Girish Lade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Girish Lade — Building AI-Powered Tools That Empower Developers",
    description:
      "Solo founder of Lade Stack — free, no-login, AI-powered developer tools.",
    images: ["/images/hero-portrait.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${oswald.variable} ${inter.variable} ${signature.variable} antialiased`}
    >
      <body className="bg-bg text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
