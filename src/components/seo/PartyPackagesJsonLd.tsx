import { JsonLd } from "./JsonLd";
import type { PartyPackage } from "@/lib/db/schema";

interface PackageItem {
  quantity: number;
  name: string;
}

export function PartyPackagesJsonLd({ packages }: { packages: PartyPackage[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Jersey Jumpy Party Packages",
    itemListElement: packages.map((pkg) => {
      const items = pkg.items as PackageItem[];
      const description = items
        .map((item) => `${item.quantity}x ${item.name}`)
        .join(", ");

      return {
        "@type": "Offer",
        name: pkg.name,
        description,
        priceCurrency: "USD",
        price: pkg.price.toString(),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: pkg.price.toString(),
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        url: `https://jerseyjumpy.com/contact?package=${encodeURIComponent(pkg.name)}`,
        offeredBy: {
          "@type": "LocalBusiness",
          name: "Jersey Jumpy",
          url: "https://jerseyjumpy.com",
        },
      };
    }),
  };

  return <JsonLd data={data} />;
}
