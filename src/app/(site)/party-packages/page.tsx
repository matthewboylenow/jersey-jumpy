import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { partyPackages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { PartyPackageCard } from "@/components/packages/PartyPackageCard";
import { Phone, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bounce House Rental Party Packages",
  description:
    "Wow your guests at your next event with multiple bounce house rentals! Our bounce house rental party packages are perfect for those looking for a variety of bounce houses to create the ultimate fun at school field days, corporate events, and large parties in New Jersey.",
  openGraph: {
    title: "Bounce House Rental Party Packages | Jersey Jumpy",
    description: "Wow your guests at your next event with multiple bounce house rentals! Our party packages combine obstacle courses, slides, and castles for maximum fun.",
  },
  alternates: {
    canonical: "https://jerseyjumpy.com/party-packages",
  },
};

async function getPackages() {
  const db = getDb();
  const items = await db
    .select()
    .from(partyPackages)
    .where(eq(partyPackages.isActive, true))
    .orderBy(asc(partyPackages.sortOrder));
  return items;
}

export default async function PartyPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <Sparkles className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Best Value for Big Events
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Party{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Packages
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Bundle and save! Our party packages combine the best inflatables
              for maximum fun at your next big event.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <PartyPackageCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/20 via-peach/20 to-mint/20" />
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              We can create custom packages tailored to your event size, budget,
              and preferences. Call us to discuss your needs!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:866-597-6625"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold text-lg shadow-lg shadow-cta-primary/30 hover:shadow-xl transition-shadow"
              >
                <Phone className="w-5 h-5" />
                <span>866-597-6625</span>
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-display font-bold text-lg border-2 border-cta-primary/20 text-cta-primary hover:bg-lavender-light/30 hover:border-cta-primary/40 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
            Package Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-lavender/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Perfect for Schools
              </h3>
              <p className="text-sm text-text-secondary">
                Great for field days, carnivals, and end-of-year celebrations
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Corporate Events
              </h3>
              <p className="text-sm text-text-secondary">
                Company picnics, team building events, and family days
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-peach/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎂</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Big Birthday Parties
              </h3>
              <p className="text-sm text-text-secondary">
                Make milestone birthdays unforgettable with multiple attractions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
