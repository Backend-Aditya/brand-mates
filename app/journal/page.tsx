import type { Metadata } from "next";
import JournalClient from "@/components/JournalClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Journal — BrandMates",
  description: "Insights on web design, social media, paid ads, and content creation from the BrandMates studio in Sydney and Melbourne.",
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
