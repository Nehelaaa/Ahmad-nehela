import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

/** Where inquiries are delivered (your inbox). */
const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL?.trim() || "topwebdeveloperan@gmail.com";

/**
 * Set `RESEND_FROM_EMAIL` in Netlify to an address on a domain you verify in Resend.
 * Sending from `onboarding@resend.dev` often goes to Gmail Spam — use your own domain.
 * Example: `Ahmad Nehela <hello@yourdomain.com>`
 */
function getFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) return configured;
  return `${site.name} <onboarding@resend.dev>`;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";

function stripHeaderUnsafe(s: string, max: number) {
  return s.replace(/[\r\n]/g, " ").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") as string | null)?.trim() || "";
    const email = (formData.get("email") as string | null)?.trim() || "";
    const subjectField = (formData.get("subject") as string | null)?.trim();
    const message = (formData.get("message") as string | null)?.trim() || "";
    const businessName = (
      formData.get("businessName") as string | null
    )?.trim();
    const plan = (formData.get("plan") as string | null)?.trim();
    const phone = (formData.get("phone") as string | null)?.trim();
    const preferredContact = (
      formData.get("preferredContact") as string | null
    )?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const safeSubject = subjectField
        ? stripHeaderUnsafe(subjectField, 200)
        : "";
      const mailSubject = safeSubject
        ? `${stripHeaderUnsafe(name, 80)}: ${safeSubject}`
        : `Message from ${stripHeaderUnsafe(name, 120)}`;

      const preferLabel =
        preferredContact === "call"
          ? "Book a free 15-min call"
          : preferredContact === "either"
            ? "Either email or call"
            : preferredContact === "email"
              ? "Email quote"
              : preferredContact || null;

      const text = [
        `${name} sent you a note through your website.`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        preferLabel ? `Preferred contact: ${preferLabel}` : null,
        businessName ? `Business: ${businessName}` : null,
        plan ? `Plan: ${plan}` : null,
        safeSubject ? `Topic: ${safeSubject}` : null,
        "",
        message,
        "",
        "—",
        SITE_URL ? `Form: ${SITE_URL}` : `${site.name} · contact form`,
      ]
        .filter(Boolean)
        .join("\n");

      const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5;color:#1e293b;background:#f8fafc;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;">
    <tr><td>
      <p style="margin:0 0 16px;font-size:15px;color:#334155;">${escapeHtml(name)} sent you a note through your website.</p>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      ${phone ? `<p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${preferLabel ? `<p style="margin:0 0 8px;"><strong>Preferred contact:</strong> ${escapeHtml(preferLabel)}</p>` : ""}
      ${businessName ? `<p style="margin:0 0 8px;"><strong>Business:</strong> ${escapeHtml(businessName)}</p>` : ""}
      ${plan ? `<p style="margin:0 0 8px;"><strong>Plan:</strong> ${escapeHtml(plan)}</p>` : ""}
      ${safeSubject ? `<p style="margin:0 0 8px;"><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>` : ""}
      <p style="margin:16px 0 8px;"><strong>Message</strong></p>
      <div style="border-left:3px solid #f59e0b;padding-left:12px;margin:0;color:#334155;">${escapeHtml(message).replace(/\n/g, "<br />")}</div>
      <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">${escapeHtml(SITE_URL ? SITE_URL : `${site.name} · website`)}</p>
    </td></tr>
  </table>
</body>
</html>`;

      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to: TO_EMAIL,
        replyTo: email,
        subject: mailSubject,
        text,
        html,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
