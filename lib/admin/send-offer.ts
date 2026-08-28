import { Resend } from "resend";
import { site } from "@/lib/content";
import { getOffer, type StripeOffer } from "@/lib/admin/stripe-catalog";
import { updateSite } from "@/lib/admin/queries";
import { isTwilioConfigured, sendSms, toE164 } from "@/lib/sms";

function getFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) return configured;
  return `${site.name} <onboarding@resend.dev>`;
}

function buildSmsBody(offer: StripeOffer, businessName: string): string {
  return (
    `Hi — this is ${site.personName} at ${site.name}. ` +
    `Here's your payment link for ${offer.name} (${offer.summary}): ` +
    `${offer.paymentLinkUrl} ` +
    `Questions? Call/text ${site.phone}.`
  );
}

function buildEmail(offer: StripeOffer, businessName: string, contactName: string | null) {
  const greeting = contactName ? `Hi ${contactName},` : "Hi,";
  const text = [
    greeting,
    "",
    `Thanks for working with ${site.name}.`,
    "",
    `Here's your secure checkout link for ${offer.name} (${offer.summary}):`,
    offer.paymentLinkUrl,
    "",
    `Questions? Reply to this email or call ${site.phone}.`,
    "",
    `— ${site.personName}`,
    `${site.name} · For ${businessName}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1e293b;padding:24px;">
  <p>${greeting}</p>
  <p>Thanks for working with <strong>${site.name}</strong>.</p>
  <p>Here's your secure checkout for <strong>${offer.name}</strong> (${offer.summary}):</p>
  <p style="margin:24px 0;">
    <a href="${offer.paymentLinkUrl}" style="display:inline-block;background:#f59e0b;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;">
      Pay securely
    </a>
  </p>
  <p style="font-size:13px;color:#64748b;">Or open: ${offer.paymentLinkUrl}</p>
  <p>Questions? Reply to this email or call ${site.phone}.</p>
  <p>— ${site.personName}<br/>${site.name} · For ${businessName}</p>
</body></html>`;

  return { text, html, subject: `Your ${offer.name} payment link — ${site.name}` };
}

export type SendOfferResult = {
  offer: StripeOffer;
  sent: { sms?: string; email?: string };
  skipped: string[];
};

export async function sendOfferToClient(params: {
  siteId: string;
  offerId: string;
  channels: Array<"sms" | "email">;
  businessName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
}): Promise<SendOfferResult> {
  const offer = getOffer(params.offerId);
  if (!offer) throw new Error("Unknown plan");

  const channels = params.channels.length
    ? params.channels
    : (["sms"] as Array<"sms" | "email">);

  const sent: SendOfferResult["sent"] = {};
  const skipped: string[] = [];

  if (channels.includes("sms")) {
    const e164 = toE164(params.phone);
    if (!e164) {
      skipped.push("No phone number on file for this client");
    } else if (!isTwilioConfigured()) {
      skipped.push(
        "SMS not set up yet — add Twilio env vars (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)"
      );
    } else {
      await sendSms(e164, buildSmsBody(offer, params.businessName));
      sent.sms = e164;
    }
  }

  if (channels.includes("email")) {
    const to = params.email?.trim();
    if (!to) {
      skipped.push("No email on file for this client");
    } else if (!process.env.RESEND_API_KEY) {
      skipped.push("Email not set up — RESEND_API_KEY is missing");
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const mail = buildEmail(offer, params.businessName, params.contactName);
      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      });
      if (error) throw new Error(error.message || "Failed to send email");
      sent.email = to;
    }
  }

  if (!sent.sms && !sent.email) {
    throw new Error(skipped.join(". ") || "Nothing was sent");
  }

  // Mark as sent on the site
  const isCare =
    offer.id === "site_care" ||
    offer.id === "starter" ||
    offer.id === "standard" ||
    offer.id === "full_access";
  const isProject =
    offer.id === "launch" ||
    offer.id === "grow" ||
    offer.id === "scale" ||
    offer.id === "starter" ||
    offer.id === "standard" ||
    offer.id === "full_access";

  await updateSite(params.siteId, {
    ...(isProject ? { project_payment_status: "sent" } : {}),
    ...(isCare ? { care_status: "sent" } : {}),
  });

  return { offer, sent, skipped };
}
