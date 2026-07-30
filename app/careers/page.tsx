import type { Metadata } from "next";
import CareersClient from "@/components/CareersClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Careers - BrandMates",
  description: "Open roles at BrandMates, Australia's brand studio for founders and CMOs.",
  openGraph: {
    title: "Careers - BrandMates",
    description: "We hire experienced people who want to work on fewer, more considered Australian brands.",
    url: "https://brandmates.au/careers",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Careers - BrandMates" },
  alternates: { canonical: "https://brandmates.au/careers" },
};

export default function CareersPage() {
  return (
    <>
      <CareersClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
