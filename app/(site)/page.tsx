import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhatIBuild from "@/components/WhatIBuild";
import LocalSeo from "@/components/LocalSeo";

/* Interactive / heavier client islands — code-split so mobile parses less JS up front */
const Stats = dynamic(() => import("@/components/Stats"));
const Work = dynamic(() => import("@/components/Work"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Process />
      <WhatIBuild />
      <Work />
      <LocalSeo />
      <FAQ />
      <Contact />
    </>
  );
}
