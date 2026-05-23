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
    "BrandMates is an Australian brand studio helping ambitious companies across Sydney, Melbourne, Brisbane and beyond build belief through strategy, identity, and digital craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} scroll-smooth`}>
      <body className="bg-brand-ink font-sans text-white overflow-x-hidden antialiased">
        <SmoothScroll />
<Nav />
        {children}
      </body>
    </html>
  );
}
