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
  metadataBase: new URL("https://brandmates.au"),
  title: "BrandMates - Australia's Brand Studio. We Build Belief.",
  description:
    "BrandMates is an Australian brand studio for founders and CMOs who need identity, digital, and content work that holds up in the real world - based in Sydney.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BrandMates",
  url: "https://brandmates.au",
  logo: "https://brandmates.au/logo.png",
  image: "https://brandmates.au/logo.png",
  description:
    "BrandMates is an Australian brand studio for founders and CMOs who need identity, digital, and content work that holds up in the real world - based in Sydney.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Merrylands",
    addressRegion: "NSW",
    postalCode: "2160",
    addressCountry: "AU",
  },
  areaServed: { "@type": "Country", name: "Australia" },
  telephone: "+61426525614",
  email: "info@brandmates.au",
  sameAs: [
    "https://www.instagram.com/brandmates.au",
    "https://www.linkedin.com/company/brandmates",
    "https://dribbble.com/brandmates",
    "https://x.com/brandmates_au",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-brand-ink font-sans text-white overflow-x-hidden antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-brand-400 focus:text-brand-700 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
