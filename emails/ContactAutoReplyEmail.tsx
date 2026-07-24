import { Text, Button } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export interface ContactAutoReplyEmailProps {
  name: string;
}

export default function ContactAutoReplyEmail({ name }: ContactAutoReplyEmailProps) {
  return (
    <EmailLayout preview="We've got your enquiry — BrandMates">
      <Text style={emailStyles.heading}>Thanks, {name}.</Text>
      <Text style={emailStyles.paragraph}>
        We&apos;ve received your enquiry and will reply within <strong>1 business day</strong> (AEST).
      </Text>
      <Text style={emailStyles.paragraph}>
        If it&apos;s urgent, call us on{" "}
        <a href="tel:+61426525614" style={{ color: "#d4af37" }}>
          +61 426 525 614
        </a>.
      </Text>
      <Button href="https://www.brandmates.au/work" style={emailStyles.button}>
        See our work
      </Button>
    </EmailLayout>
  );
}
