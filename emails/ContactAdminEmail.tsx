import { Text, Hr } from "@react-email/components";
import { EmailLayout, emailStyles } from "./EmailLayout";

export interface ContactAdminEmailProps {
  name: string;
  email: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  message: string;
}

const Field = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <>
      <Text style={emailStyles.label}>{label}</Text>
      <Text style={emailStyles.value}>{value}</Text>
    </>
  );
};

export default function ContactAdminEmail({
  name,
  email,
  company,
  website,
  service,
  budget,
  message,
}: ContactAdminEmailProps) {
  return (
    <EmailLayout preview={`New enquiry from ${name}`}>
      <span style={emailStyles.badge}>New website enquiry</span>
      <Text style={emailStyles.heading}>{name} wants to talk.</Text>

      <Field label="Name" value={name} />
      <Field label="Email" value={email} />
      <Field label="Company" value={company} />
      <Field label="Website" value={website} />
      <Field label="Service" value={service} />
      <Field label="Budget" value={budget} />

      <Hr style={{ borderColor: "#e5e7eb", margin: "8px 0 16px" }} />

      <Text style={emailStyles.label}>Message</Text>
      <Text style={emailStyles.value}>{message}</Text>
    </EmailLayout>
  );
}
