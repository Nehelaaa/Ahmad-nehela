export const site = {
  name: "Ahmad Nehela",
  tagline: "Web Development & Design",
  email: "topwebdeveloperan@gmail.com",
  phone: "6175952561",
  location: "Boston, MA",
  serviceArea: "Boston, MetroWest & Massachusetts",
  yearStarted: 2016,
  yearsExperience: 8,
  projectCount: 28,
};

export function getPhoneHref() {
  const digits = site.phone.replace(/\D/g, "");
  return digits ? `tel:+1${digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits}` : "";
}

export function getPhoneDisplay() {
  const digits = site.phone.replace(/\D/g, "");
  if (!digits) return "";
  const d = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (d.length !== 10) return site.phone;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const stats = [
  { value: 8, suffix: "+", label: "Years experience" },
  { value: 28, suffix: "+", label: "Projects delivered" },
  { value: 100, suffix: "%", label: "Client-focused" },
];

export const processSteps = [
  {
    step: 1,
    title: "Discovery & scope",
    description: "We discuss your goals, audience, and must-haves so your website is built on a clear plan.",
  },
  {
    step: 2,
    title: "Design & structure",
    description: "You get a structure and visual direction that fits your brand and converts visitors.",
  },
  {
    step: 3,
    title: "Build & integrate",
    description: "I build your site with SEO, analytics, and any integrations (forms, booking, etc.) from the start.",
  },
  {
    step: 4,
    title: "Launch & support",
    description: "We go live, and I make sure you know how to update content. Optional ongoing support available.",
  },
];

export const services = [
  {
    name: "Launch",
    tagline: "Best for getting online fast",
    price: 1500,
    regularPrice: 2000,
    promoLabel: "Limited-time rate",
    description:
      "A clean, mobile-ready site so your business looks legit and customers can find you — perfect for shops, salons, and local services.",
    features: [
      "Looks great on phones & Google",
      "Up to 5 pages (Home, About, Services, Work, Contact)",
      "SEO basics so neighbors can find you",
      "Contact form that sends leads to your inbox",
      "Click-to-call & social links",
      "1 round of revisions",
    ],
    cta: "Get this package",
    highlighted: false,
  },
  {
    name: "Grow",
    tagline: "Most popular for local businesses",
    price: 3700,
    regularPrice: 5000,
    promoLabel: "Limited-time rate",
    description:
      "Built to get found on Google and turn visitors into calls & bookings — ideal when you’re ready for more customers.",
    features: [
      "Everything in Launch",
      "Up to 10 pages + stronger SEO",
      "Google Business Profile setup help",
      "Easy updates (WordPress CMS)",
      "Booking-friendly layout & forms",
      "Light e‑commerce if you sell products",
      "Custom design that matches your brand",
      "2 rounds of revisions",
    ],
    cta: "Start growing",
    highlighted: true,
  },
  {
    name: "Scale",
    tagline: "For serious growth & ads",
    price: 10000,
    description:
      "A full online presence — advanced SEO, ads support, training, and ongoing help so your site keeps bringing in business.",
    features: [
      "Everything in Grow",
      "Unlimited pages as you expand",
      "Advanced SEO + content structure",
      "Google Ads setup guidance",
      "Blog so you keep ranking over time",
      "Newsletter / email signup ready",
      "Hands-on training for your team",
      "Priority support after launch",
      "3 rounds of revisions",
    ],
    cta: "Talk about Scale",
    highlighted: false,
  },
];

/** Types of websites I build — for the "What I build" section */
export const websiteTypes = [
  {
    title: "Custom-coded & React / Next.js",
    description: "Custom sites and web apps with modern stacks. Fast, performance-focused, and built for you.",
  },
  {
    title: "WordPress websites",
    description: "Easy-to-update sites on WordPress. Themes and plugins tailored to your brand, with training so you can manage content.",
  },
  {
    title: "Business & professional sites",
    description: "Clean, professional sites for businesses, consultants, and service providers. SEO and contact forms included.",
  },
  {
    title: "E-commerce & online stores",
    description: "Online shops and product pages. Setup for selling online, with secure checkout and inventory basics.",
  },
  {
    title: "Landing pages",
    description: "Single-page sites focused on one goal: sign-ups, leads, or a product launch. Built for conversions — with React/Next.js when you want maximum impact.",
  },
  {
    title: "Squarespace & CMS sites",
    description: "Sites on Squarespace or other CMS platforms. Design and structure done for you; you keep full control to edit later.",
  },
];

export const projects = [
  {
    title: "Boston Islamic Seminary",
    description:
      "Accredited master's program for religious studies. Clean, accessible site for an educational institution.",
    url: "https://www.bostonislamicseminary.org/",
    image: "/images/profile-1.jpeg",
    category: "Education",
  },
  {
    title: "KalamAllah",
    description:
      "Online tutoring platform connecting students worldwide with qualified tutors.",
    url: "https://kalamallah.org/",
    image: "/images/profile-2.jpeg",
    category: "EdTech",
  },
  {
    title: "Franklin Tire & Auto",
    description:
      "Local mechanic shop in Franklin serving surrounding cities with a professional, trust-building presence.",
    url: "https://www.franklintireauto.com/",
    image: "/images/%26%20(1).png",
    category: "Local Business",
  },
  {
    title: "Expert Auto Shop",
    description:
      "Auto repair shop website built to earn trust and drive calls—services, reviews, and clear contact info.",
    url: "https://expert-auto-boost.lovable.app/",
    image: "/images/expert-auto-shop.jpg?v=1",
    category: "Local Business",
  },
  {
    title: "WestNeuro",
    description:
      "#1 neurology practice in LA. High-end medical site emphasizing care and credibility.",
    url: "https://westneuro.com/",
    image: "/images/new.png",
    category: "Healthcare",
  },
  {
    title: "State Representative Dan Sena",
    description:
      "Campaign and community site for a Massachusetts state representative.",
    url: "https://repdansena.com",
    image: "/images/copys.png",
    category: "Government",
  },
  {
    title: "Mnandi Salon & Spa",
    description:
      "Black-owned salon in Central Massachusetts: spa, haircuts, and bridal events.",
    url: "https://www.mnandisalonspa.com",
    image: "/images/profile-4.jpeg",
    category: "Beauty",
  },
  {
    title: "PerfectSmile",
    description:
      "Dental practice website with clear navigation and patient-focused design.",
    url: "https://sharp-bassi-8a9226.netlify.app/",
    image: "/images/DD.jpg",
    category: "Healthcare",
  },
  {
    title: "Cryptocurrency",
    description:
      "Interactive crypto showcase built with Bootstrap, HTML, and JavaScript.",
    url: "https://hopeful-cray-2d574d.netlify.app/",
    image: "/images/bit.png",
    category: "Web App",
  },
  {
    title: "Ray's Auto",
    description:
      "Auto repair shop in Milford, MA. Trust-building site with services, reviews, and contact—same-day service when you need it.",
    url: "https://rays-auto.vercel.app/",
    image: "/images/rays-auto.png?v=2",
    category: "Local Business",
  },
  {
    title: "Grub Kebab",
    description:
      "Middle Eastern kitchen showcase: shawarma, skewers, and halal grill—bold typography, menu flow, and a warm brand story.",
    url: "https://kebabit.netlify.app/",
    image: "/images/GK.png",
    category: "Restaurant",
  },
  {
    title: "Paw & Co.",
    description:
      "Premium pet supplies storefront: categories, featured products, cart flow, and trust-focused copy for nutrition and gear.",
    url: "https://petvibee.netlify.app/",
    image: "/images/paw-co.jpg",
    category: "E‑commerce",
  },
  {
    title: "Jordan Ellis Photography",
    description:
      "Editorial & portrait photographer portfolio: hero carousel, gallery, booking flow, and investment sections with a calm editorial feel.",
    url: "https://personal-brandd.netlify.app/",
    image: "/images/jordan-ellis.jpg",
    category: "Photography",
  },
  {
    title: "Nouve Bakery",
    description:
      "Neighborhood bakery in Lexington, MA on Mass Ave — artisan breads and pastries, menu, story, and visit hours. Slow fermentation, laminated pastries, baked daily.",
    url: "https://nouveau-sweet-lexington.lovable.app/",
    image: "/images/nouve-bakery.jpg?v=3",
    category: "Food & Hospitality",
  },
  {
    title: "Bill's Auto Services",
    description:
      "Family-owned auto repair shop in Waltham, MA. Services, monthly specials, and reviews — built to win local customers and drive calls.",
    url: "https://bill-waltham-revamp.lovable.app/",
    image: "/images/bills-auto.jpg?v=3",
    category: "Local Business",
  },
  {
    title: "MK Detailing",
    description:
      "Mobile car detailing site — pricing, booking flow, and service highlights tuned for conversions and SEO.",
    url: "https://mk-detailing.lovable.app/",
    image: "/images/car-detailing.jpg?v=3",
    category: "Local Business",
  },
  {
    title: "Kleins Auto Perfection",
    description:
      "Mobile car wash and detailing in Massachusetts — ceramic coating, paint correction, and interior detail. Fully mobile: we come to your driveway or office.",
    url: "https://gleam-ride-hub.vercel.app/",
    image: "/images/kleins-auto-perfection.jpg?v=1",
    category: "Local Business",
  },
  {
    title: "Maison Noir",
    description:
      "Luxury barbering atelier — precision cuts, hot towel shaves, booking flow, gallery, and VIP membership. Premium grooming experience, mobile-first design.",
    url: "https://luxe-trim-co.vercel.app/",
    image: "/images/maison-noir.jpg?v=1",
    category: "Beauty",
  },
  {
    title: "Zoumi Auto Rental",
    description:
      "Weekly Nissan Rogue rentals in Boston and Greater Boston — fleet, policies, booking, and transparent pricing from $350/week. Insured, licensed in MA.",
    url: "https://www.zoumirentals.com/",
    image: "/images/zoumi-rentals.jpg?v=2",
    category: "Local Business",
  },
  {
    title: "Cambridge Black Limo",
    description:
      "Nationwide luxury limo service from Cambridge, MA — fleet, airport transfers, corporate travel, booking, and 24/7 chauffeur service across all 50 states.",
    url: "https://elite-drive-network.vercel.app/",
    image: "/images/cambridge-black-limo.jpg?v=2",
    category: "Local Business",
  },
  {
    title: "Entoscapes",
    description:
      "Native wildflower plant communities in metroWest, MA — proof-of-concept plots, learning resources, and low-maintenance protocols to turn turf back into habitat.",
    url: "https://entoscapes-dream-refresh.vercel.app/",
    image: "/images/entoscapes.png?v=2",
    category: "Environmental",
  },
  {
    title: "Amora Leah Beauty Salon",
    description:
      "Luxury hair, bridal makeup, lashes, facials, and spa in Framingham, MA — services, gallery, booking, and team pages for MetroWest clients.",
    url: "https://suave-salon-space.vercel.app/",
    image: "/images/amora-leah.jpg?v=1",
    category: "Beauty",
  },
  {
    title: "Crest Property Showcase",
    description:
      "Luxury property showcase site — listings, galleries, and polished presentation built to highlight high-end homes and drive inquiries.",
    url: "https://crest-property-showcase-q6kmxsatd.vercel.app/",
    image: "/images/crest-property.jpg?v=1",
    category: "Real Estate",
  },
];
