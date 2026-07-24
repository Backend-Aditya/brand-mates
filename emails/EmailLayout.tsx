import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from "@react-email/components";

/** Mirrors app/globals.css @theme — keep these in sync with the site's palette. */
export const brand = {
  50: "#fdf7e3",
  100: "#f9ecc4",
  200: "#f4dd94",
  300: "#e8c45e",
  400: "#d4af37",
  500: "#1e3a8a",
  600: "#15295a",
  700: "#0f2147",
  ink: "#0a1733",
};

const fontFamily =
  "'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

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
          <Section style={styles.card}>
            <Section style={styles.header}>
              <Text style={styles.wordmark}>
                Brand<span style={{ color: brand[400] }}>Mates</span>
              </Text>
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
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const emailStyles = {
  heading: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#ffffff",
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
    fontFamily,
  } as React.CSSProperties,
  paragraph: {
    fontSize: "15px",
    lineHeight: "24px",
    color: "rgba(255,255,255,0.75)",
    margin: "0 0 16px",
    fontFamily,
  } as React.CSSProperties,
  label: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 4px",
    fontFamily,
  },
  value: {
    fontSize: "15px",
    color: "#ffffff",
    margin: "0 0 16px",
    fontFamily,
  } as React.CSSProperties,
  button: {
    display: "inline-block",
    backgroundColor: brand[400],
    color: brand[700],
    fontWeight: 700,
    fontSize: "14px",
    padding: "13px 28px",
    borderRadius: "999px",
    textDecoration: "none",
    fontFamily,
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    backgroundColor: "rgba(212,175,55,0.15)",
    border: `1px solid rgba(212,175,55,0.25)`,
    color: brand[400],
    fontWeight: 700,
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    padding: "6px 14px",
    borderRadius: "999px",
    margin: "0 0 20px",
    fontFamily,
  } as React.CSSProperties,
};

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#e8eaef",
    fontFamily,
    margin: 0,
    padding: "32px 16px",
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: brand.ink,
    backgroundImage: `linear-gradient(135deg, ${brand[700]} 0%, ${brand.ink} 60%)`,
    borderRadius: "20px",
    overflow: "hidden",
    border: `1px solid rgba(255,255,255,0.08)`,
  },
  header: {
    padding: "28px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  wordmark: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
    fontFamily,
  },
  content: {
    padding: "32px",
  },
  hr: {
    borderColor: "rgba(255,255,255,0.08)",
    margin: 0,
  },
  footer: {
    padding: "20px 32px 28px",
  },
  footerText: {
    fontSize: "12px",
    lineHeight: "18px",
    color: "rgba(255,255,255,0.35)",
    margin: "0 0 4px",
    fontFamily,
  },
  footerLink: {
    color: "rgba(255,255,255,0.45)",
    textDecoration: "underline",
  },
};
