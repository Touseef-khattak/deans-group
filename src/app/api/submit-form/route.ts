import { NextResponse } from "next/server";
import { sendMail, type MailAttachment } from "@/lib/mail";
import { adminNotificationEmail, customerConfirmationEmail } from "@/lib/emailTemplates";
import { verifyRecaptcha } from "@/lib/recaptcha";

// nodemailer needs real Node APIs (net/tls) - never runs on the Edge runtime.
export const runtime = "nodejs";
// this always does side effects (sends email); never let it be cached.
export const dynamic = "force-dynamic";

type FormType =
  | "consultation"
  | "application"
  | "enquiry"
  | "booking"
  | "newsletter";

const FORM_TITLES: Record<FormType, string> = {
  consultation: "Consultation Request",
  application: "Job Application",
  enquiry: "Contact Enquiry",
  booking: "Booking Request",
  newsletter: "Newsletter Signup",
};

// key = the FormData field name every form is expected to send; label = what
// shows up in the admin notification email.
const FIELD_LABELS: Record<FormType, { key: string; label: string }[]> = {
  consultation: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
  ],
  application: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "position", label: "Position" },
    { key: "message", label: "Message" },
  ],
  enquiry: [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "country", label: "Country" },
    { key: "enquiringAbout", label: "Enquiring about" },
    { key: "project", label: "Project" },
    { key: "message", label: "Message" },
  ],
  booking: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "duration", label: "Stay duration" },
    { key: "rooms", label: "Number of rooms" },
  ],
  newsletter: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "whoAreYou", label: "Who are you" },
  ],
};

function isFormType(value: string | null): value is FormType {
  return !!value && value in FORM_TITLES;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed submission." },
      { status: 400 },
    );
  }

  const formTypeRaw = formData.get("formType");
  const formType = typeof formTypeRaw === "string" ? formTypeRaw : null;
  if (!isFormType(formType)) {
    return NextResponse.json(
      { ok: false, error: "Unknown form." },
      { status: 400 },
    );
  }

  const recaptchaToken = formData.get("recaptchaToken");
  if (typeof recaptchaToken !== "string" || !recaptchaToken) {
    return NextResponse.json(
      { ok: false, error: "Missing verification token." },
      { status: 400 },
    );
  }

  try {
    const { ok: recaptchaOk } = await verifyRecaptcha(recaptchaToken, formType);
    if (!recaptchaOk) {
      return NextResponse.json(
        { ok: false, error: "We couldn't verify you're not a bot. Please try again." },
        { status: 400 },
      );
    }
  } catch (err) {
    console.error("[submit-form] reCAPTCHA verification failed to run:", err);
    return NextResponse.json(
      { ok: false, error: "Submission is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }

  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 },
    );
  }

  const fields = FIELD_LABELS[formType]
    .map(({ key, label }) => ({
      label,
      value: (formData.get(key) as string | null)?.trim() ?? "",
    }))
    .filter((f) => f.value);

  const attachments: MailAttachment[] = [];
  if (formType === "application") {
    const cv = formData.get("cv");
    if (cv instanceof File && cv.size > 0) {
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        filename: cv.name || "cv",
        content: buffer,
        contentType: cv.type || undefined,
      });
      fields.push({ label: "CV attached", value: cv.name || "yes" });
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("[submit-form] ADMIN_EMAIL is not configured.");
    return NextResponse.json(
      { ok: false, error: "Submission is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }

  const formTitle = FORM_TITLES[formType];

  try {
    await sendMail({
      to: adminEmail,
      subject: `${formTitle}: ${name}`,
      html: adminNotificationEmail({
        formTitle,
        submittedAt: new Date(),
        fields,
      }),
      replyTo: email,
      attachments: attachments.length ? attachments : undefined,
    });

    await sendMail({
      to: email,
      subject: "We've received your message — Deans Group of Companies",
      html: customerConfirmationEmail({ customerName: name, formTitle }),
    });
  } catch (err) {
    console.error("[submit-form] sending mail failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message right now. Please try again, or WhatsApp us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
