import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BrandMates — Australia's Brand Studio. We Build Belief.",
  description:
    "BrandMates is an Australian brand studio for founders and CMOs who need identity, digital, and content work that holds up in the real world — based in Sydney and Melbourne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} scroll-smooth`}>
      <head>
        <link rel="preload" href="/hero.jpg" as="image" fetchPriority="high" />
      </head>
      <body suppressHydrationWarning className="bg-brand-ink font-sans text-white overflow-x-hidden antialiased">
        <SmoothScroll />
<Nav />
        {children}
      </body>
    </html>
  );
}
