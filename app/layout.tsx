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
      "Ahmad Nehela | Professional Web Development & Design | Boston, MA",
    template: "%s | Ahmad Nehela",
  },
  description:
    "Ahmad Nehela — freelance web developer in Boston, MA. Custom website design and development with SEO, Google Analytics, Google Ads, and WordPress. 8+ years experience. Free quote for your project.",
  keywords: [
    "web developer Boston",
    "website development Boston MA",
    "freelance web developer",
    "custom website design",
    "SEO website",
    "WordPress developer Boston",
    "Google Analytics setup",
    "responsive web design",
    "small business website",
    "professional website design",
  ],
  authors: [{ name: "Ahmad Nehela", url: "https://ahmadnehela.com" }],
  creator: "Ahmad Nehela",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmadnehela.com",
    siteName: "Ahmad Nehela — Web Developer",
    title: "Ahmad Nehela | Web Development & Design | Boston, MA",
    description:
      "Professional website development with SEO, Google Analytics & WordPress. 8+ years experience. Get your project quote today.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Nehela — Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Nehela | Web Development & Design",
    description: "Professional website development. SEO, WordPress, Google Analytics. Boston, MA.",
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
