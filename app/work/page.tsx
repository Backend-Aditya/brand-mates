import type { Metadata } from "next";
import WorkClient from "@/components/WorkClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Selected Work — BrandMates",
  description: "Case studies from BrandMates — an Australian brand studio delivering web design, social media, paid ads, and content creation for ambitious founders.",
  openGraph: {
    title: "Selected Work — BrandMates",
    description: "Case studies from BrandMates — Australia's brand studio.",
    url: "https://brandmates.com.au/work",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Selected Work — BrandMates", description: "Case studies from BrandMates." },
  alternates: { canonical: "https://brandmates.com.au/work" },
};

export default function WorkPage() {
  return (
    <>
      <WorkClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
