import { seoServicePages, servicePageMetadata } from "@/lib/seo-content";
import SeoServicePageContent from "@/components/SeoServicePageContent";

const page = seoServicePages.find((p) => p.slug === "website-designer-boston")!;

export const metadata = servicePageMetadata(page);

export default function Page() {
  return <SeoServicePageContent page={page} />;
}
