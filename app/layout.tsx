import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BrandMates - Australia's Brand Studio. We Build Belief.",
  description:
    "BrandMates is an Australian brand studio for founders and CMOs who need identity, digital, and content work that holds up in the real world - based in Sydney.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-brand-ink font-sans text-white overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-brand-400 focus:text-brand-700 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main-content">{children}</main>
        <SpeedInsights />
      </body>
    </html>
  );
}
