import type { Metadata } from "next";
import WorkClient from "@/components/WorkClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Selected Work — BrandMates",
  description: "Case studies from BrandMates — an Australian brand studio delivering web design, social media, paid ads, and content creation for ambitious founders.",
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
