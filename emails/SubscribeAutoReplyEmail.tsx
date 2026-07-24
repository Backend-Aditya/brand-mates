import { Text, Button } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export default function SubscribeAutoReplyEmail() {
  return (
    <EmailLayout preview="You're on the list — BrandMates Studio Dispatch">
      <Text style={emailStyles.heading}>You&apos;re on the list.</Text>
      <Text style={emailStyles.paragraph}>
        Thanks for subscribing to the Studio Dispatch: one thoughtful email a month on what&apos;s working in AU
        digital marketing right now. No filler, no agency self-promotion.
      </Text>
      <Text style={emailStyles.paragraph}>First dispatch lands early next month.</Text>
      <Button href="https://www.brandmates.au/journal" style={emailStyles.button}>
        Read the journal
      </Button>
    </EmailLayout>
  );
}
