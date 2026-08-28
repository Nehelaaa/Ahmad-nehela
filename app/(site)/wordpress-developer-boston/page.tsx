import type { Metadata } from "next";
import { seoServicePages } from "@/lib/seo-content";
import SeoServicePageContent from "@/components/SeoServicePageContent";

const page = seoServicePages.find((p) => p.slug === "wordpress-developer-boston")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `https://ahmadnehela.com/${page.slug}` },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: `https://ahmadnehela.com/${page.slug}`,
  },
};

export default function Page() {
  return <SeoServicePageContent page={page} />;
}
