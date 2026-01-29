import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { inflatables, partyPackages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { ContactForm } from "@/components/forms/ContactForm";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Contact Jersey Jumpy to book your bounce house rental in New Jersey! Call us at 866-597-6625 or request a quote online. Professional delivery throughout NJ for birthday parties, school events, and corporate functions.",
  openGraph: {
    title: "Contact & Book | Jersey Jumpy",
    description: "Contact Jersey Jumpy to book your bounce house rental in New Jersey! Call 866-597-6625 for professional inflatable delivery.",
  },
  alternates: {
    canonical: "https://jerseyjumpy.com/contact",
  },
};

async function getInflatableOptions() {
  const db = getDb();
  const items = await db
    .select({ slug: inflatables.slug, name: inflatables.name })
    .from(inflatables)
    .where(eq(inflatables.isActive, true))
    .orderBy(asc(inflatables.name));
  return items;
}

async function getPackageOptions() {
  const db = getDb();
  const items = await db
    .select({ id: partyPackages.id, name: partyPackages.name })
    .from(partyPackages)
    .where(eq(partyPackages.isActive, true))
    .orderBy(asc(partyPackages.sortOrder));
  return items;
}

export default async function ContactPage() {
  const [inflatableOptions, packageOptions] = await Promise.all([
    getInflatableOptions(),
    getPackageOptions(),
  ]);

  // Combine into a single list for the dropdown
  const productOptions = [
    { value: "", label: "Select an inflatable or package..." },
    { value: "---packages---", label: "--- Party Packages ---", disabled: true },
    ...packageOptions.map((p) => ({
      value: `package-${p.id}`,
      label: p.name,
    })),
    { value: "---inflatables---", label: "--- Inflatables ---", disabled: true },
    ...inflatableOptions.map((i) => ({
      value: `inflatable-${i.slug}`,
      label: i.name,
    })),
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Party!
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Request a quote for your next event and we&apos;ll get back to you
              within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="font-display font-bold text-2xl text-text-primary mb-6">
                Request a Quote
              </h2>
              <ContactForm productOptions={productOptions} />
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-lg text-text-primary mb-4">
                Quick Contact
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:866-597-6625"
                  className="flex items-center gap-3 text-text-secondary hover:text-cta-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-lavender/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-lavender-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Toll Free</p>
                    <p className="font-medium">866-597-6625</p>
                  </div>
                </a>
                <a
                  href="tel:732-750-8810"
                  className="flex items-center gap-3 text-text-secondary hover:text-cta-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-mint/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-mint-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Local</p>
                    <p className="font-medium">732-750-8810</p>
                  </div>
                </a>
                <a
                  href="mailto:info@jerseyjumpy.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-cta-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-peach/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-peach-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <p className="font-medium">info@jerseyjumpy.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Business Info */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-lg text-text-primary mb-4">
                Business Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-xl bg-sky/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-sky-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Mailing Address</p>
                    <p className="font-medium">PO Box 217</p>
                    <p className="font-medium">Iselin, NJ 08830</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-xl bg-butter/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-butter-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Availability</p>
                    <p className="font-medium">7 Days a Week</p>
                    <p className="text-sm text-text-muted">
                      We deliver throughout New Jersey
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-lg text-text-primary mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint" />
                  NJ DCA Certified
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lavender" />
                  Fully Insured
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-peach" />
                  SIOTO Trained Staff
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky" />
                  Family-Owned Since 2007
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
