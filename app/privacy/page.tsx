import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Privacy Policy - BrandMates",
  description: "How BrandMates collects, uses, and protects your personal information.",
  alternates: { canonical: "https://brandmates.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalLayout
        eyebrow="Legal"
        title="Privacy Policy"
        updated="5 July 2026"
        intro="This policy explains what personal information BrandMates Pty Ltd collects through this website, why we collect it, and how you can access, correct, or delete it."
      >
        <div>
          <h2>1. Who we are</h2>
          <p>
            BrandMates Pty Ltd (ABN 88 612 334 901) is a brand studio based at Merrylands NSW 2160, Australia.
            For any privacy question, contact us at <a href="mailto:studio@brandmates.au">studio@brandmates.au</a> or
            call <a href="tel:+61426525614">+61 426 525 614</a>.
          </p>
        </div>

        <div>
          <h2>2. Information we collect</h2>
          <p>We collect information you give us directly, and information collected automatically when you use this site.</p>
          <ul>
            <li>Contact details you submit through our enquiry form or newsletter signup: name, email, company name, website, and project details.</li>
            <li>Correspondence you send us by email or phone.</li>
            <li>Standard technical data collected by our hosting and analytics providers: IP address, browser type, device type, pages visited, and referring site.</li>
          </ul>
        </div>

        <div>
          <h2>3. How we use it</h2>
          <ul>
            <li>To respond to enquiries and discovery call bookings.</li>
            <li>To send the monthly studio newsletter, if you opted in, you can unsubscribe at any time.</li>
            <li>To understand how visitors use the site so we can improve it.</li>
            <li>To meet our legal and accounting obligations.</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </div>

        <div>
          <h2>4. Who we share it with</h2>
          <p>
            We share information only with service providers who help us run the studio and this website: our email and CRM
            provider, our website hosting provider, and analytics tools. Each is bound to handle your data securely and only
            for the purpose we&apos;ve engaged them for. We disclose information if required by Australian law.
          </p>
        </div>

        <div>
          <h2>5. Cookies</h2>
          <p>
            This site uses cookies for essential site function and for analytics, so we can see which pages are useful and
            which aren&apos;t. You can disable cookies in your browser settings; the site will still work, though some
            preferences won&apos;t be remembered between visits.
          </p>
        </div>

        <div>
          <h2>6. Data storage and security</h2>
          <p>
            Data is stored with reputable Australian and international providers using industry-standard security measures.
            No online transmission is completely secure, but we take reasonable steps to protect information from misuse,
            loss, and unauthorised access.
          </p>
        </div>

        <div>
          <h2>7. Your rights</h2>
          <p>
            Under the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles, you can ask us what personal
            information we hold about you, request a correction, or ask us to delete it. Email{" "}
            <a href="mailto:studio@brandmates.au">studio@brandmates.au</a> and we&apos;ll respond within a
            reasonable time.
          </p>
        </div>

        <div>
          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy as our practices change. The &ldquo;last updated&rdquo; date at the top of this page
            reflects the most recent revision.
          </p>
        </div>
      </LegalLayout>
      <Footer />
      <FooterReveal />
    </>
  );
}
