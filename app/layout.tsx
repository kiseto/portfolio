import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

import { SmoothScroll } from "@/components/portfolio/smooth-scroll";
import { ThemeInitScript } from "@/components/portfolio/theme-init-script";

const siteUrl = "https://kiseto.github.io/portfolio/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "drake.sekito | Portfolio",
  description:
    "Portfolio of Drake Sekito, an IT student developer building practical web systems and interfaces.",
  alternates: {
    canonical: siteUrl,
  },
  authors: [{ name: "Drake Sekito" }],
  creator: "Drake Sekito",
  keywords: [
    "Drake Sekito",
    "IT student developer",
    "web developer portfolio",
    "web systems",
    "full-stack developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "drake.sekito",
    title: "drake.sekito | Portfolio",
    description:
      "Portfolio of Drake Sekito, an IT student developer building practical web systems and interfaces.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "drake.sekito | Portfolio",
    description:
      "Portfolio of Drake Sekito, an IT student developer building practical web systems and interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeInitScript />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
