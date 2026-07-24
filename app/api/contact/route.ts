import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rateLimit";
import { looksLikeBot } from "@/lib/botCheck";
import ContactAdminEmail from "@/emails/ContactAdminEmail";
import ContactAutoReplyEmail from "@/emails/ContactAutoReplyEmail";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (looksLikeBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, website, service, budget, message } = body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      template: ContactAdminEmail({ name, email, company, website, service, budget, message }),
    });

    sendMail({
      to: email,
      subject: "We've got your enquiry — BrandMates",
      template: ContactAutoReplyEmail({ name }),
    }).catch((err) => console.error("Contact auto-reply failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Could not send your enquiry. Please email us directly." }, { status: 500 });
  }
}
