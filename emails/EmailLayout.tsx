import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from "@react-email/components";

const brand = {
  gold: "#d4af37",
  ink: "#0a1733",
  inkSoft: "#13214a",
  textMuted: "#8b93a7",
  border: "#e5e7eb",
};

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.wordmark}>BrandMates</Text>
          </Section>

          <Section style={styles.content}>{children}</Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              BrandMates Pty Ltd &middot; Merrylands NSW 2160 &middot; ABN 88 612 334 901
            </Text>
            <Text style={styles.footerText}>
              <Link href="https://www.brandmates.au" style={styles.footerLink}>
                brandmates.au
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const emailStyles = {
  heading: {
    fontSize: "20px",
    fontWeight: 800,
    color: brand.ink,
    letterSpacing: "-0.01em",
    margin: "0 0 16px",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#374151",
    margin: "0 0 16px",
  } as React.CSSProperties,
  label: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: brand.textMuted,
    margin: "0 0 4px",
  },
  value: {
    fontSize: "15px",
    color: brand.ink,
    margin: "0 0 16px",
  } as React.CSSProperties,
  button: {
    display: "inline-block",
    backgroundColor: brand.gold,
    color: brand.ink,
    fontWeight: 700,
    fontSize: "14px",
    padding: "12px 24px",
    borderRadius: "999px",
    textDecoration: "none",
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    backgroundColor: "#fdf6e3",
    color: "#92720f",
    fontWeight: 700,
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    padding: "4px 12px",
    borderRadius: "999px",
    margin: "0 0 16px",
  } as React.CSSProperties,
};

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f5f7",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "32px 16px",
  },
  container: {
    backgroundColor: "#ffffff",
    maxWidth: "560px",
    margin: "0 auto",
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid ${brand.border}`,
  },
  header: {
    backgroundColor: brand.ink,
    padding: "28px 32px",
  },
  wordmark: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  content: {
    padding: "32px",
  },
  hr: {
    borderColor: brand.border,
    margin: 0,
  },
  footer: {
    padding: "20px 32px 28px",
  },
  footerText: {
    fontSize: "12px",
    lineHeight: "18px",
    color: brand.textMuted,
    margin: "0 0 4px",
  },
  footerLink: {
    color: brand.textMuted,
    textDecoration: "underline",
  },
};
