import { site } from "@/lib/content";
import { faqs, areasServed } from "@/lib/seo-content";

const phoneDigits = site.phone.replace(/\D/g, "");
const telephone =
  phoneDigits.length >= 10
    ? `+1-${phoneDigits.length === 11 && phoneDigits.startsWith("1") ? phoneDigits.slice(1) : phoneDigits}`
    : undefined;

const person = {
  "@type": "Person",
  "@id": "https://ahmadnehela.com/#person",
  name: site.name,
  url: "https://ahmadnehela.com",
  image: "https://ahmadnehela.com/images/profile-3.jpeg",
  jobTitle: "Web Developer & Designer",
  description:
    "Freelance web developer and designer in Boston, MA. Custom websites and web apps with SEO, Google Analytics, and WordPress for small businesses.",
  email: site.email,
  ...(telephone ? { telephone } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Web Development",
    "Website Design",
    "SEO",
    "WordPress",
    "Google Analytics",
    "Google Business Profile",
    "Small Business Websites",
    "Local SEO Boston",
  ],
};

const localBusiness = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://ahmadnehela.com/#business",
  name: `${site.name} — Web Development & Design`,
  url: "https://ahmadnehela.com",
  image: "https://ahmadnehela.com/og-image.png",
  description:
    "Custom website design and development in Boston, MA. Sites and web apps with SEO, Google Analytics, WordPress, and conversion-focused design for small businesses across MetroWest and Massachusetts.",
  email: site.email,
  ...(telephone ? { telephone } : {}),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.3601,
    longitude: -71.0589,
  },
  areaServed: areasServed.map((name) => ({
    "@type": "Place",
    name,
  })),
  serviceType: [
    "Website Design",
    "Web Development",
    "WordPress Development",
    "SEO Setup",
    "Google Analytics Setup",
    "Small Business Websites",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website packages for local businesses",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Launch website package",
          description:
            "Mobile-ready small-business site with SEO basics and contact form — get online fast",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Grow website package",
          description:
            "SEO-focused site with Google Business help and WordPress so local businesses get more calls and bookings",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scale website package",
          description:
            "Full growth site with advanced SEO, blog, ads guidance, and ongoing support",
        },
      },
    ],
  },
  founder: { "@id": "https://ahmadnehela.com/#person" },
  sameAs: ["https://ahmadnehela.com"],
};

const website = {
  "@type": "WebSite",
  "@id": "https://ahmadnehela.com/#website",
  url: "https://ahmadnehela.com",
  name: `${site.name} — Web Developer Boston`,
  description:
    "Freelance web developer and website designer in Boston & MetroWest, MA.",
  publisher: { "@id": "https://ahmadnehela.com/#business" },
  inLanguage: "en-US",
};

const faqPage = {
  "@type": "FAQPage",
  "@id": "https://ahmadnehela.com/#faq",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [person, localBusiness, website, faqPage],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
