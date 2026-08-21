import { getPhoneDisplay, site } from "@/lib/content";

export const faqs = [
  {
    question: "How much does a website cost in Boston?",
    answer:
      "New-client packages start around $799 (Launch) with clear discounts on Grow and Scale. Payment plans available. Book a free call or request a quote and I’ll recommend the right fit.",
  },
  {
    question: "Do you build websites for small businesses in Boston and MetroWest?",
    answer: `Yes. ${site.name} builds custom sites and web apps for local businesses across Boston, MetroWest, Framingham, and Massachusetts — with SEO, Google Analytics, and mobile-friendly design included.`,
  },
  {
    question: "How long does it take to launch a new website?",
    answer:
      "Most small-business sites launch in a few weeks once content and goals are clear. Timeline depends on pages, features (booking, WordPress, e‑commerce), and how quickly feedback comes back.",
  },
  {
    question: "Will my site show up on Google?",
    answer:
      "Every build includes basic SEO setup (titles, speed, mobile layout, and structure Google can read). For stronger local results I also recommend Google Business Profile, reviews, and ongoing content — I can help with that too.",
  },
  {
    question: "Do you offer WordPress or only custom code?",
    answer:
      "Both. I build custom React/Next.js sites when you need speed and flexibility, and WordPress when you want an easy CMS to update yourself. We pick the stack based on your goals and budget.",
  },
  {
    question: "How do I get started?",
    answer: `Call ${getPhoneDisplay()}, or use the contact form to book a free call or get a quote. You’ll get a clear plan — no pressure.`,
  },
];

export const areasServed = [
  "Boston",
  "Cambridge",
  "Somerville",
  "Brookline",
  "Newton",
  "Framingham",
  "Waltham",
  "Lexington",
  "Quincy",
  "MetroWest",
  "Greater Boston",
  "Massachusetts",
];

export type SeoServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bullets: string[];
  closing: string;
};

export const seoServicePages: SeoServicePage[] = [
  {
    slug: "web-developer-boston",
    title: "Web Developer Boston",
    metaTitle: "Web Developer Boston MA | Custom Sites & Web Apps",
    metaDescription:
      "Hire a freelance web developer in Boston & MetroWest. Custom websites, SEO, Google Analytics, and WordPress. Free consult — call (617) 595-2561.",
    h1: "Web developer in Boston & MetroWest",
    intro:
      "Looking for a web developer in Boston who builds sites that look sharp and bring in customers? I design and develop custom websites and web apps for local businesses — with SEO, analytics, and clear communication from day one.",
    bullets: [
      "Custom-coded and WordPress sites built for your industry",
      "Mobile-first layouts that load fast on Google",
      "SEO foundations so neighbors can find you online",
      "Contact forms, booking, and Google-friendly structure",
      "Serving Boston, MetroWest, and Massachusetts",
    ],
    closing:
      "Ready to stand out online? Book a free call or request a quote — let’s build a site that works for your business.",
  },
  {
    slug: "website-designer-boston",
    title: "Website Designer Boston",
    metaTitle: "Website Designer Boston MA | Small Business Web Design",
    metaDescription:
      "Professional website designer in Boston for small businesses. Modern design, SEO, and conversion-focused pages. Free consult with Ahmad Nehela.",
    h1: "Website designer for Boston small businesses",
    intro:
      "Your website is often the first impression. I design clean, trustworthy sites for Boston and MetroWest businesses — so visitors understand what you offer and know how to contact you.",
    bullets: [
      "Brand-aligned layouts that feel professional, not generic",
      "Clear calls to action: call, book, or get a quote",
      "Portfolio-proven work across salons, auto, food, and more",
      "Design that supports SEO and Google Business Profile",
      "Packages with transparent pricing",
    ],
    closing:
      "Want a site that represents your brand and wins local customers? Get a free quote or book a short call today.",
  },
  {
    slug: "small-business-website-boston",
    title: "Small Business Website Boston",
    metaTitle: "Small Business Website Boston | SEO & Local Visibility",
    metaDescription:
      "Get a small business website in Boston built to rank locally and convert visitors. SEO setup, mobile design, and free consult. Ahmad Nehela.",
    h1: "Small business websites built to get found on Google",
    intro:
      "A great small business website does two jobs: look credible and help people find you when they search. I build sites for Boston-area owners who want more calls, bookings, and visibility — not just a digital brochure.",
    bullets: [
      "Pages structured for local search (Boston, MetroWest, MA)",
      "Fast, mobile-friendly experience Google prefers",
      "Forms and CTAs that turn visitors into leads",
      "Optional WordPress so you can update content yourself",
      "Guidance on Google Business Profile and reviews",
    ],
    closing:
      "Let’s map a site that matches your budget and growth goals. Book a free call or submit a quote request.",
  },
  {
    slug: "wordpress-developer-boston",
    title: "WordPress Developer Boston",
    metaTitle: "WordPress Developer Boston MA | Easy-to-Update Sites",
    metaDescription:
      "WordPress developer in Boston for small businesses. Custom themes, SEO, training so you can edit content. Free consult — (617) 595-2561.",
    h1: "WordPress developer in Boston",
    intro:
      "Need a WordPress site you can update without calling a developer every time? I build WordPress websites for Boston and MetroWest businesses — designed for your brand, optimized for Google, and set up so you stay in control.",
    bullets: [
      "Custom or tailored WordPress themes",
      "SEO-ready pages, blogs, and service sections",
      "Training so your team can edit text and photos",
      "Forms, galleries, and booking-friendly layouts",
      "Secure, maintainable builds for long-term use",
    ],
    closing:
      "Start with a free call or quote — we’ll decide if WordPress or a custom stack is the better fit.",
  },
];
