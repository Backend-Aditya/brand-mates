import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Contact — BrandMates",
  description: "Book a discovery call or get in touch with BrandMates — Australia's brand studio in Sydney and Melbourne.",
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
