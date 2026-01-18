import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { FAQAccordion } from "@/components/faqs/FAQAccordion";
import { Phone, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Jersey Jumpy",
  description:
    "Find answers to common questions about bounce house rentals, delivery, setup, safety, and more. Jersey Jumpy - NJ's trusted inflatable rental company.",
};

async function getFAQs() {
  const db = getDb();
  const items = await db
    .select()
    .from(faqs)
    .where(eq(faqs.isActive, true))
    .orderBy(asc(faqs.sortOrder));
  return items;
}

export default async function FAQsPage() {
  const faqItems = await getFAQs();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <HelpCircle className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                We&apos;re Here to Help
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Everything you need to know about renting bounce houses and
              inflatables from Jersey Jumpy.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqItems} />
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/20 via-peach/20 to-mint/20" />
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
              Still Have Questions?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our friendly team is
              ready to help you plan the perfect party!
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/policies" className="glass-card p-6 text-center group hover:shadow-hover transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-lavender/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Safety Policies
              </h3>
              <p className="text-sm text-text-secondary">
                Learn about our safety guidelines and rules
              </p>
            </Link>
            <Link href="/rates-deposits" className="glass-card p-6 text-center group hover:shadow-hover transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Rates & Deposits
              </h3>
              <p className="text-sm text-text-secondary">
                View our pricing and deposit information
              </p>
            </Link>
            <Link href="/certifications" className="glass-card p-6 text-center group hover:shadow-hover transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-peach/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Our Certifications
              </h3>
              <p className="text-sm text-text-secondary">
                See our safety certifications and training
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
