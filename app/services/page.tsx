import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Services — BrandMates",
  description: "Web design & development, social media, paid ads, and content creation — delivered by BrandMates, Australia's brand studio.",
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
