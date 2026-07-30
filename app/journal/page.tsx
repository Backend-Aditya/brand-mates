import type { Metadata } from "next";
import JournalClient from "@/components/JournalClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Journal - BrandMates",
  description: "Insights on web design, social media, paid ads, and content creation from the BrandMates studio in Sydney.",
  openGraph: {
    title: "Journal - BrandMates",
    description: "Practical insights from a studio that actually runs campaigns in the Australian market.",
    url: "https://www.brandmates.au/journal",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Journal - BrandMates", description: "From the studio desk." },
  alternates: { canonical: "https://www.brandmates.au/journal" },
};

export default function JournalPage() {
  return (
    <>
      <JournalClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
