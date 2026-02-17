import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message was sent successfully.",
  robots: "noindex, follow",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-5">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
        Thank you for reaching out!
      </h1>
      <p className="text-slate-400 text-center max-w-md mb-8">
        I&apos;ve received your message and will get back to you as soon as possible.
      </p>
      <Link
        href="/#home"
        className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-white hover:bg-brand-400 transition-all duration-200 hover:scale-[1.02]"
      >
        Back to home
      </Link>
    </section>
  );
}
