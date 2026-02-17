const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmad Nehela",
  url: "https://ahmadnehela.com",
  image: "https://ahmadnehela.com/images/profile-3.jpeg",
  jobTitle: "Web Developer",
  description:
    "Freelance web developer and designer in Boston, MA. Custom websites with SEO, Google Analytics, and WordPress.",
  email: "topwebdeveloperan@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Boston",
    addressRegion: "MA",
  },
  knowsAbout: [
    "Web Development",
    "Responsive Design",
    "SEO",
    "WordPress",
    "Google Analytics",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
