import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export const metadata: Metadata = {
  title: "Accessibility - BrandMates",
  description: "Our commitment to an accessible website for every visitor.",
  alternates: { canonical: "https://www.brandmates.au/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <LegalLayout
        eyebrow="Legal"
        title="Accessibility Statement"
        updated="5 July 2026"
        intro="We want everyone, including people using assistive technology, to be able to read about our work and get in touch. Here's what we've built in, and how to reach us if something isn't working."
      >
        <div>
          <h2>1. Our standard</h2>
          <p>
            We build this site to meet WCAG 2.1 Level AA as a floor, and Level AAA where we reasonably can. That includes
            keyboard navigation across every interactive element, visible focus states, labelled form fields, alt text on
            meaningful images, and a reduced-motion alternative for every animation.
          </p>
        </div>

        <div>
          <h2>2. What we&apos;ve built in</h2>
          <ul>
            <li>A &ldquo;skip to main content&rdquo; link for keyboard and screen reader users.</li>
            <li>Colour contrast checked against WCAG AA at minimum for body text and interactive elements.</li>
            <li>Motion that respects your operating system&apos;s reduced-motion preference.</li>
            <li>Semantic headings and landmarks so the page structure makes sense when read aloud.</li>
          </ul>
        </div>

        <div>
          <h2>3. Known limitations</h2>
          <p>
            Accessibility is ongoing work, not a box we tick once. If you hit a broken link, a missing label, or content
            that doesn&apos;t work with your assistive technology, we want to know about it and fix it.
          </p>
        </div>

        <div>
          <h2>4. Tell us</h2>
          <p>
            Email <a href="mailto:info@brandmates.au">info@brandmates.au</a> or call{" "}
            <a href="tel:+61426525614">+61 426 525 614</a> (Mon-Fri, 9-6 AEST) and describe the issue and the page it&apos;s
            on. We&apos;ll get back to you within one business day.
          </p>
        </div>
      </LegalLayout>
      <Footer />
      <FooterReveal />
    </>
  );
}
