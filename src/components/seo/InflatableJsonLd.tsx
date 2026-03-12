import { JsonLd } from "./JsonLd";
import type { Inflatable } from "@/lib/db/schema";

export function InflatableJsonLd({ inflatable }: { inflatable: Inflatable }) {
  const currentYear = new Date().getFullYear();

  const additionalProperty: { "@type": string; name: string; value: string }[] = [];
  if (inflatable.width) {
    additionalProperty.push({ "@type": "PropertyValue", name: "Width", value: inflatable.width });
  }
  if (inflatable.length) {
    additionalProperty.push({ "@type": "PropertyValue", name: "Length", value: inflatable.length });
  }
  if (inflatable.height) {
    additionalProperty.push({ "@type": "PropertyValue", name: "Height", value: inflatable.height });
  }
  if (inflatable.spaceRequired) {
    additionalProperty.push({ "@type": "PropertyValue", name: "Space Required", value: inflatable.spaceRequired });
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${inflatable.name} Rental`,
    url: `https://jerseyjumpy.com/inflatables/${inflatable.slug}`,
    brand: {
      "@type": "Brand",
      name: "Jersey Jumpy",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      ...(inflatable.price ? { price: inflatable.price.toString() } : {}),
      priceValidUntil: `${currentYear}-12-31`,
      availability: "https://schema.org/InStock",
      url: "https://jerseyjumpy.com/contact",
    },
  };

  if (inflatable.description) {
    data.description = inflatable.description;
  }
  if (inflatable.mainImageUrl) {
    data.image = inflatable.mainImageUrl;
  }
  if (additionalProperty.length > 0) {
    data.additionalProperty = additionalProperty;
  }

  return <JsonLd data={data} />;
}
