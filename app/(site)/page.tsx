import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";

// Below-the-fold sections: code-split so mobile downloads less JS on first paint
const Process = dynamic(() => import("@/components/Process"));
const WhatIBuild = dynamic(() => import("@/components/WhatIBuild"));
const Work = dynamic(() => import("@/components/Work"));
const LocalSeo = dynamic(() => import("@/components/LocalSeo"));
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
