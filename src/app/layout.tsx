import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omar Abdelrazek | Portfolio",
  description:
    "Engineer. Builder. Creator of intelligent systems. A premium interactive developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <PageTransition>
          {children}
          <SiteFooter />
        </PageTransition>
      </body>
    </html>
  );
}
