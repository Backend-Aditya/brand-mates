import { Text } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export interface SubscribeAdminEmailProps {
  email: string;
  source?: string;
}

export default function SubscribeAdminEmail({ email, source }: SubscribeAdminEmailProps) {
  return (
    <EmailLayout preview={`New newsletter subscriber: ${email}`}>
      <span style={emailStyles.badge}>New subscriber</span>
      <Text style={emailStyles.heading}>Someone joined the Studio Dispatch.</Text>

      <Text style={emailStyles.label}>Email</Text>
      <Text style={emailStyles.value}>{email}</Text>

      <Text style={emailStyles.label}>Source</Text>
      <Text style={emailStyles.value}>{source ?? "unknown"}</Text>
    </EmailLayout>
  );
}
