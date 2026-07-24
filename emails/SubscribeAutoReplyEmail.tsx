import { Text, Section } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export default function SubscribeAutoReplyEmail() {
  return (
    <EmailLayout preview="You're on the list — BrandMates Studio Dispatch">
      <Text style={emailStyles.heading}>You&apos;re on the list.</Text>
      <Text style={emailStyles.paragraph}>
        One thoughtful email a month: what&apos;s working in AU digital marketing right now. No filler, no
        agency self-promotion, just the stuff worth knowing.
      </Text>
      <Text style={emailStyles.paragraph}>First dispatch lands early next month.</Text>

      <Section style={emailStyles.ctaCard}>
        <Text style={emailStyles.overline}>In the meantime</Text>
        <Text style={emailStyles.ctaHeading}>Catch up on the journal.</Text>
        <Text style={emailStyles.ctaText}>
          Everything we&apos;ve already published, no waiting for next month.
        </Text>
        <a href="https://www.brandmates.au/journal" style={emailStyles.ctaButton}>
          Read the journal
        </a>
      </Section>
    </EmailLayout>
  );
}
