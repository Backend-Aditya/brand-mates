import type { Metadata } from "next";
import StudioClient from "@/components/StudioClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Studio — BrandMates",
  description: "Meet the team behind BrandMates — Australia's brand studio for web design, social media, paid ads, and content creation.",
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
