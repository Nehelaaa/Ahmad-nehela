import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const SmoothHashScroll = dynamic(() => import("@/components/SmoothHashScroll"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd />
      <SmoothHashScroll />
      <Header />
      <main className="flex-1 flex flex-col min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
