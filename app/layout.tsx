import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

/* Lean font subset — variable axes + italic previously added ~270KB before paint */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadnehela.com"),
  title: {
    default:
      "Web Developer Boston MA | Top Web Developer — Sites & Web Apps",
    template: "%s | Top Web Developer",
  },
  description:
    "Top Web Developer — freelance web developer & website designer in Boston and MetroWest, MA. Custom small-business websites with SEO, WordPress, and Google Analytics. Free consult — call (617) 595-2561.",
  keywords: [
    "web developer Boston",
    "website designer Boston MA",
    "Top Web Developer",
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
  creator: "Top Web Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmadnehela.com",
    siteName: "Top Web Developer — Boston",
    title: "Web Developer Boston MA | Top Web Developer",
    description:
      "Custom websites & web apps for Boston and MetroWest businesses. SEO, WordPress, Google Analytics. Free 15‑min consult.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top Web Developer — Web Developer Boston",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer Boston | Top Web Developer",
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
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body min-h-screen bg-surface text-paper">
        {children}
      </body>
    </html>
  );
}
