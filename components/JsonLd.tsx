import { site, services, projects } from "@/lib/content";
import { faqs, areasServed, seoServicePages } from "@/lib/seo-content";

const phoneDigits = site.phone.replace(/\D/g, "");
const telephone =
  phoneDigits.length >= 10
    ? `+1-${phoneDigits.length === 11 && phoneDigits.startsWith("1") ? phoneDigits.slice(1) : phoneDigits}`
    : undefined;

const person = {
  "@type": "Person",
  "@id": "https://ahmadnehela.com/#person",
  name: site.personName,
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
  worksFor: { "@id": "https://ahmadnehela.com/#business" },
};

const localBusiness = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://ahmadnehela.com/#business",
  name: site.name,
  alternateName: [site.personName, "AN WEBDEV, CO"],
  url: "https://ahmadnehela.com",
  image: [
    "https://ahmadnehela.com/og-image.png",
    "https://ahmadnehela.com/brand/an-webdev-logo.png",
  ],
  logo: "https://ahmadnehela.com/brand/an-webdev-logo.png",
  description:
    "Custom website design and development in Boston, MA. Sites and web apps with SEO, Google Analytics, WordPress, and conversion-focused design for small businesses across MetroWest and Massachusetts.",
  email: site.email,
  ...(telephone ? { telephone } : {}),
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Stripe",
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
    "@type": "City",
    name,
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
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
    itemListElement: services.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} website package`,
      description: plan.description,
      price: String(plan.price),
      priceCurrency: "USD",
      url: "https://ahmadnehela.com/#services",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: `${plan.name} website package`,
        description: plan.description,
        provider: { "@id": "https://ahmadnehela.com/#business" },
      },
    })),
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
  potentialAction: {
    "@type": "CommunicateAction",
    name: "Get a free quote",
    target: "https://ahmadnehela.com/#contact",
  },
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

const portfolio = {
  "@type": "ItemList",
  "@id": "https://ahmadnehela.com/#work",
  name: "Web design and development portfolio",
  numberOfItems: projects.length,
  itemListElement: projects.slice(0, 12).map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: project.url,
      image: `https://ahmadnehela.com${project.image}`,
      genre: project.category,
      creator: { "@id": "https://ahmadnehela.com/#business" },
    },
  })),
};

const breadcrumb = {
  "@type": "BreadcrumbList",
  "@id": "https://ahmadnehela.com/#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ahmadnehela.com",
    },
    ...seoServicePages.map((page, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: page.title,
      item: `https://ahmadnehela.com/${page.slug}`,
    })),
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [person, localBusiness, website, faqPage, portfolio, breadcrumb],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
