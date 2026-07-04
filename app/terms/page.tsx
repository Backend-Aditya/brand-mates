import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Terms of Use - BrandMates",
  description: "The terms governing use of the BrandMates website.",
  alternates: { canonical: "https://brandmates.com.au/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalLayout
        eyebrow="Legal"
        title="Terms of Use"
        updated="5 July 2026"
        intro="These terms govern your use of this website. They don't cover the separate service agreement we sign with clients before starting a project, that's a distinct document scoped to each engagement."
      >
        <div>
          <h2>1. Acceptance</h2>
          <p>
            By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site. This
            site is operated by BrandMates Pty Ltd (ABN 88 612 334 901), Merrylands NSW 2160, Australia.
          </p>
        </div>

        <div>
          <h2>2. Use of this site</h2>
          <p>
            You may browse this site and submit enquiries through it for legitimate business purposes. You may not use it
            to transmit unlawful, harmful, or misleading content, attempt to gain unauthorised access to our systems, or
            scrape or republish site content without our written permission.
          </p>
        </div>

        <div>
          <h2>3. Intellectual property</h2>
          <p>
            All text, design, code, and case study content on this site belongs to BrandMates Pty Ltd or is used with
            permission from our clients, unless otherwise credited. You may not reproduce, distribute, or create derivative
            works from it without our written consent. Client logos and brand assets shown in case studies remain the
            property of those clients.
          </p>
        </div>

        <div>
          <h2>4. No professional advice</h2>
          <p>
            Content on this site, including journal articles, is general commentary based on our experience running
            Australian marketing campaigns. It isn&apos;t tailored advice for your specific business and shouldn&apos;t be
            relied on as such. Talk to us directly, or a qualified advisor, before acting on it.
          </p>
        </div>

        <div>
          <h2>5. Third-party links</h2>
          <p>
            This site links to third-party platforms, client websites, and social media. We aren&apos;t responsible for the
            content, accuracy, or practices of sites we don&apos;t operate.
          </p>
        </div>

        <div>
          <h2>6. Liability</h2>
          <p>
            We keep this site accurate and available where we reasonably can, but we make no warranty that it will be
            uninterrupted or error-free. To the extent permitted by Australian law, BrandMates Pty Ltd isn&apos;t liable
            for loss arising from your use of, or inability to use, this site.
          </p>
        </div>

        <div>
          <h2>7. Governing law</h2>
          <p>These terms are governed by the laws of New South Wales, Australia, and disputes are subject to the exclusive jurisdiction of its courts.</p>
        </div>

        <div>
          <h2>8. Changes</h2>
          <p>
            We may update these terms from time to time. The &ldquo;last updated&rdquo; date above reflects the most recent
            revision. Questions: <a href="mailto:studio@brandmates.com.au">studio@brandmates.com.au</a>.
          </p>
        </div>
      </LegalLayout>
      <Footer />
      <FooterReveal />
    </>
  );
}
