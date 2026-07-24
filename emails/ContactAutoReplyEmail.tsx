import { Text, Section } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export interface ContactAutoReplyEmailProps {
  name: string;
}

export default function ContactAutoReplyEmail({ name }: ContactAutoReplyEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <EmailLayout preview="We've got your enquiry — BrandMates">
      <Text style={emailStyles.heading}>
        Got it, {firstName}. We&apos;re on it.
      </Text>
      <Text style={emailStyles.paragraph}>
        Your enquiry just landed with the team. We read every single one, and someone will reply within{" "}
        <strong style={{ color: "#ffffff" }}>1 business day</strong>, AEST.
      </Text>
      <Text style={emailStyles.paragraph}>
        Urgent? Call{" "}
        <a href="tel:+61426525614" style={{ color: "#d4af37", textDecoration: "none", fontWeight: 700 }}>
          +61 426 525 614
        </a>.
      </Text>

      <Section style={emailStyles.ctaCard}>
        <Text style={emailStyles.overline}>While you wait</Text>
        <Text style={emailStyles.ctaHeading}>See the work first.</Text>
        <Text style={emailStyles.ctaText}>
          A look at the brands we&apos;ve built belief for, before we get on a call.
        </Text>
        <a href="https://www.brandmates.au/work" style={emailStyles.ctaButton}>
          View selected work
        </a>
      </Section>
    </EmailLayout>
  );
}
