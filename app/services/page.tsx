import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Services — BrandMates",
  description: "Web design & development, social media, paid ads, and content creation — delivered by BrandMates, Australia's brand studio.",
  openGraph: {
    title: "Services — BrandMates",
    description: "Web design, social media, paid ads, and content creation for Australian brands.",
    url: "https://brandmates.com.au/services",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Services — BrandMates", description: "Four disciplines. One Australian studio." },
  alternates: { canonical: "https://brandmates.com.au/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
