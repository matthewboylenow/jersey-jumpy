import { JsonLd } from "./JsonLd";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jerseyjumpy.com/#business",
    name: "Jersey Jumpy",
    legalName: "JerseyJumpy.com LLC",
    url: "https://jerseyjumpy.com",
    telephone: "+1-866-597-6625",
    email: "info@jerseyjumpy.com",
    foundingDate: "2007",
    description:
      "Family owned and operated bounce house, inflatable slide, and obstacle course rental company serving New Jersey since 2007.",
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "217",
      addressLocality: "Iselin",
      addressRegion: "NJ",
      postalCode: "08830",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey",
      sameAs: "https://en.wikipedia.org/wiki/New_Jersey",
    },
    priceRange: "$350-$800",
    image: "https://jerseyjumpy.com/og-image.jpg",
    logo: "https://jerseyjumpy.com/logo.svg",
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Inflatable Rentals",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Bounce Houses" },
        { "@type": "OfferCatalog", name: "Castle Bouncers" },
        { "@type": "OfferCatalog", name: "Combo Bouncers" },
        { "@type": "OfferCatalog", name: "Wet/Dry Slides" },
        { "@type": "OfferCatalog", name: "Obstacle Courses" },
      ],
    },
  };

  return <JsonLd data={data} />;
}
