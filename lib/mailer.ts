import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP environment variables are not configured");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  template: ReactElement;
  replyTo?: string;
}) {
  const t = getTransporter();
  const html = await render(opts.template);
  const text = await render(opts.template, { plainText: true });

  await t.sendMail({
    from: `"BrandMates Website" <${process.env.SMTP_USER}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html,
    text,
  });
}
