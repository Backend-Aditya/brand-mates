import type { Metadata } from "next";
import StudioClient from "@/components/StudioClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Studio - BrandMates",
  description: "Meet the team behind BrandMates - Australia's brand studio for web design, social media, paid ads, and content creation.",
  openGraph: {
    title: "Studio - BrandMates",
    description: "Six senior Aussies. No juniors, no offshore hand-offs.",
    url: "https://brandmates.com.au/studio",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Studio - BrandMates", description: "Meet the team behind BrandMates." },
  alternates: { canonical: "https://brandmates.com.au/studio" },
};

export default function StudioPage() {
  return (
    <>
      <StudioClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
