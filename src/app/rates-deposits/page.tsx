import { Metadata } from "next";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { DollarSign, Phone, Info, Clock, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rates & Deposits | Jersey Jumpy",
  description:
    "View our inflatable rental pricing, deposit requirements, and rental terms. Transparent pricing with no hidden fees.",
};

const pricingData = [
  { type: "13×13 Jumpy", price: "$350" },
  { type: "15×15 Jumpy", price: "$375" },
  { type: "20×20 Jumpy", price: "$450" },
  { type: "4-1 Combo", price: "$425" },
  { type: "4-1 Combo with Pool", price: "$550" },
  { type: "5-1 Combo", price: "$475" },
  { type: "18' Single Lane Dry Slide", price: "$425" },
  { type: "18' Single Lane Wet Slide with Pool", price: "$600" },
  { type: "18' Dual Lane Dry Slide", price: "$550" },
  { type: "18' Dual Lane Wet Slide with Pool", price: "$700" },
  { type: "20' Dual Lane Dry Slide", price: "$675" },
  { type: "20' Dual Lane Wet Slide with Pool", price: "$800" },
  { type: "22' Dry Slide", price: "$700" },
  { type: "40' Obstacle Course", price: "$600" },
  { type: "50' Obstacle Course", price: "$700" },
  { type: "65' Obstacle Course", price: "$800" },
];

const additionalServices = [
  { service: "Generator Rental", price: "$100", note: "Required if no power within 100'" },
  { service: "Attendants", price: "$35/hour", note: "Professional supervision" },
];

export default function RatesDepositsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <DollarSign className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Transparent Pricing
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Rates &{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Deposits
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Fair pricing with no surprises. Prices include delivery, setup,
              and pickup within our service area.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="bg-gradient-to-r from-lavender/20 via-peach/20 to-mint/20 px-6 py-4">
              <h2 className="font-display font-bold text-xl text-text-primary">
                Inflatable Rental Rates
              </h2>
              <p className="text-sm text-text-muted">
                Prices shown are starting rates and may vary by location
              </p>
            </div>
            <div className="divide-y divide-lavender/10">
              {pricingData.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-6 py-4 ${
                    index % 2 === 0 ? "bg-white/50" : "bg-lavender/5"
                  }`}
                >
                  <span className="text-text-secondary">{item.type}</span>
                  <span className="font-display font-bold text-text-primary">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((item, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-lg text-text-primary">
                    {item.service}
                  </h3>
                  <span className="font-display font-bold text-xl text-cta-primary">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-lavender/20 flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-lavender-dark" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Deposit Required
              </h3>
              <p className="text-sm text-text-secondary">
                A deposit is required to secure your rental date. The remaining
                balance is due on the day of your event.
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-mint-dark" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Rental Duration
              </h3>
              <p className="text-sm text-text-secondary">
                Standard rental includes up to 8 hours of use. Extended hours
                may be available upon request.
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-peach/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-peach-dark" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                Power Requirements
              </h3>
              <p className="text-sm text-text-secondary">
                Each inflatable requires a dedicated 20-amp circuit. Setup must
                be within 100 feet of a power source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="relative py-16 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-peach/10 to-mint/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-8 text-center">
              What&apos;s Included in Every Rental
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🚚", label: "Free Delivery" },
                { icon: "🔧", label: "Professional Setup" },
                { icon: "📋", label: "Safety Instructions" },
                { icon: "📦", label: "Same-Day Pickup" },
                { icon: "🛡️", label: "Full Insurance" },
                { icon: "✨", label: "Clean Equipment" },
                { icon: "🔌", label: "Extension Cords" },
                { icon: "⚡", label: "Blower Included" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-4 text-center hover:shadow-hover transition-shadow"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-sm font-medium text-text-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
            Ready to Book?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Contact us for an exact quote based on your location and event
            details. We&apos;re happy to help you plan the perfect party!
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
      </section>
    </div>
  );
}
