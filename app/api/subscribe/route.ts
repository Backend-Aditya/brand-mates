import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rateLimit";
import { looksLikeBot } from "@/lib/botCheck";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`subscribe:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (looksLikeBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const { email, source } = body as Record<string, string>;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const to = process.env.SUBSCRIBE_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "Newsletter signup is not configured." }, { status: 500 });
  }

  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `New newsletter subscriber${source ? ` (${source})` : ""}`,
      text: `Email: ${email}\nSource: ${source ?? "unknown"}`,
    });

    sendMail({
      to: email,
      subject: "You're on the list — BrandMates Studio Dispatch",
      text: [
        "Thanks for subscribing to the Studio Dispatch.",
        "",
        "One thoughtful email a month, what's working in AU digital marketing right now. No filler, no agency self-promotion.",
        "",
        "First dispatch lands early next month.",
        "",
        "— The BrandMates team",
        "https://www.brandmates.au",
      ].join("\n"),
    }).catch((err) => console.error("Subscribe auto-reply failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe form send failed:", err);
    return NextResponse.json({ error: "Could not subscribe right now. Please try again later." }, { status: 500 });
  }
}
