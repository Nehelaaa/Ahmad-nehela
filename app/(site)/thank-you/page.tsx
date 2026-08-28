import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message was sent successfully.",
  robots: "noindex, follow",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow justify-center mb-5">Message sent</p>
      <h1 className="font-display text-3xl sm:text-4xl tracking-tightest text-paper mb-4">
        Thank you for reaching out!
      </h1>
      <p className="text-paper/55 max-w-md mb-8">
        I&apos;ve received your message and will get back to you as soon as possible.
      </p>
      <Link
        href="/#home"
        className="inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-surface hover:bg-gold-400 transition-all duration-300 ease-premium hover:scale-[1.02]"
      >
        Back to home
      </Link>
    </section>
  );
}
