import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      "Email is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD (see .env.example).",
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  return transporter;
}

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}): Promise<void> {
  const from = process.env.MAIL_FROM;
  if (!from) {
    throw new Error("MAIL_FROM is not configured — see .env.example.");
  }

  const t = getTransporter();
  await t.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
    attachments: options.attachments,
  });
}
