import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "BrandMates — Australia's Brand Studio. We Build Belief.",
  description: "BrandMates is an Australian brand studio for founders and CMOs who need identity, digital, and content work that holds up in the real world — based in Sydney and Melbourne.",
  openGraph: {
    title: "BrandMates — Australia's Brand Studio. We Build Belief.",
    description: "From Surry Hills seed rounds to ASX-listed rebrands, the studio Australian founders and CMOs call when the brand needs to work harder than it does.",
    url: "https://brandmates.com.au",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "BrandMates — Australia's Brand Studio", description: "From Surry Hills seed rounds to ASX-listed rebrands." },
  alternates: { canonical: "https://brandmates.com.au" },
};

export default function Home() {
  return (
    <>
      <HomeClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
