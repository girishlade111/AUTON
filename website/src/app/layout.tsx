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

export const metadata: Metadata = {
  title: "Girish Lade — Building AI-Powered Tools That Empower Developers",
  description:
    "Portfolio of Girish Lade, solo founder of Lade Stack — free, no-login, AI-powered developer tools. Mechanical engineer turned software builder, vibe-coding products end-to-end.",
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
