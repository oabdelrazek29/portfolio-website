import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

/**
 * Outfit: display / headings — modern, geometric personality.
 * DM Sans: body — clean, highly readable UI type.
 */

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Portfolio`,
  description: siteConfig.heroSummaryLines.join(" "),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
