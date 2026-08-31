import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

/* Below-fold sections: split JS so the first paint only needs Hero + chrome */
const About = dynamic(() => import("@/components/About"));
const Stats = dynamic(() => import("@/components/Stats"));
const Services = dynamic(() => import("@/components/Services"));
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
