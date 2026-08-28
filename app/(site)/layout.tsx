import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothHashScroll from "@/components/SmoothHashScroll";
import JsonLd from "@/components/JsonLd";

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
