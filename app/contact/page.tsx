import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Contact - BrandMates",
  description: "Book a discovery call or get in touch with BrandMates - Australia's brand studio in Sydney.",
  openGraph: {
    title: "Contact - BrandMates",
    description: "Book a discovery call. 20 minutes. No pitch deck, no pressure.",
    url: "https://brandmates.com.au/contact",
    siteName: "BrandMates",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Contact - BrandMates", description: "Book a discovery call with BrandMates." },
  alternates: { canonical: "https://brandmates.com.au/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />
      <Footer />
      <FooterReveal />
    </>
  );
}
