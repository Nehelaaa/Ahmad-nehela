import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "topwebdeveloperan@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const subject = formData.get("subject") as string | null;
    const message = formData.get("message") as string | null;
    const businessName = formData.get("businessName") as string | null;
    const plan = formData.get("plan") as string | null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        businessName ? `Business: ${businessName}` : null,
        plan ? `Plan: ${plan}` : null,
        subject ? `Subject: ${subject}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: email,
        subject: subject ? `Portfolio: ${subject}` : `Portfolio contact from ${name}`,
        text: body,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    }
    // If no API key, still return 200 so form doesn't break (e.g. using Netlify Forms instead)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
