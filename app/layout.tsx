import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadnehela.com"),
  title: {
    default:
      "Web Developer Boston MA | Ahmad Nehela — Sites & Web Apps",
    template: "%s | Ahmad Nehela",
  },
  description:
    "Freelance web developer & website designer in Boston and MetroWest, MA. Custom small-business websites with SEO, WordPress, and Google Analytics. Free consult — call (617) 595-2561.",
  keywords: [
    "web developer Boston",
    "website designer Boston MA",
    "freelance web developer MetroWest",
    "small business website Boston",
    "WordPress developer Boston",
    "SEO website design Massachusetts",
    "hire web developer Boston",
    "custom website Framingham",
    "Google Business Profile website",
    "local SEO Boston",
  ],
  authors: [{ name: "Ahmad Nehela", url: "https://ahmadnehela.com" }],
  creator: "Ahmad Nehela",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmadnehela.com",
    siteName: "Ahmad Nehela — Web Developer Boston",
    title: "Web Developer Boston MA | Ahmad Nehela",
    description:
      "Custom websites & web apps for Boston and MetroWest businesses. SEO, WordPress, Google Analytics. Free 15‑min consult.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Nehela — Web Developer Boston",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer Boston | Ahmad Nehela",
    description:
      "Small-business websites with SEO & WordPress. Boston & MetroWest. Free consult.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://ahmadnehela.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body min-h-screen flex flex-col bg-surface text-slate-100">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
