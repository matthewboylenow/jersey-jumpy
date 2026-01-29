import { Metadata } from "next";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { Shield, AlertTriangle, Users, Sun, CloudRain, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety Policies & Rules",
  description:
    "Safety is our top priority at Jersey Jumpy! Read our inflatable rental safety policies, rules, and guidelines to ensure a fun and safe bounce house experience for children at your New Jersey event.",
  openGraph: {
    title: "Safety Policies & Rules | Jersey Jumpy",
    description: "Safety is our top priority. Read our inflatable rental safety policies and guidelines for a fun, safe experience.",
  },
  alternates: {
    canonical: "https://jerseyjumpy.com/policies",
  },
};

const safetyRules = [
  "Remove shoes, glasses, jewelry, and sharp objects before entering",
  "No food, drinks, gum, or candy inside the inflatable",
  "No roughhousing, flips, wrestling, or climbing on walls",
  "No silly string, confetti, or paint near the inflatable",
  "Keep the entrance clear at all times",
  "Do not hang on the netting or entrance",
  "Exit feet first only",
  "No water on dry inflatables (unless specifically designed for water use)",
];

const capacityGuidelines = [
  {
    ageGroup: "Ages 2-4",
    description: "Requires constant adult supervision",
    note: "Smaller children should play separately from larger children",
  },
  {
    ageGroup: "Ages 4-7",
    description: "Adult supervision required at all times",
    note: "Mix of ages should be monitored carefully",
  },
  {
    ageGroup: "Ages 7-10",
    description: "Adult supervision recommended",
    note: "Follow capacity limits strictly",
  },
  {
    ageGroup: "Ages 10+",
    description: "Responsible adult nearby",
    note: "Weight limits apply to all participants",
  },
];

const weatherPolicy = [
  {
    condition: "Rain",
    action: "Rental must be postponed or cancelled",
    icon: CloudRain,
  },
  {
    condition: "High Winds (15+ mph)",
    action: "Inflatables must be deflated immediately",
    icon: AlertTriangle,
  },
  {
    condition: "Lightning/Thunder",
    action: "All participants must exit immediately",
    icon: AlertTriangle,
  },
  {
    condition: "Extreme Heat",
    action: "Provide shade and hydration breaks",
    icon: Sun,
  },
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <Shield className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Safety First, Always
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Safety{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Policies
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Your family&apos;s safety is our top priority. Please review these
              guidelines to ensure a fun and safe experience.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-coral/20 to-peach/20 border border-coral/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-coral/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-coral-dark" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-text-primary mb-2">
                  Adult Supervision Required
                </h2>
                <p className="text-text-secondary">
                  A responsible adult (18+) must supervise all inflatable activities
                  at all times. The supervising adult is responsible for enforcing
                  safety rules and capacity limits. Jersey Jumpy is not responsible
                  for accidents resulting from unsupervised play or failure to follow
                  safety guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Rules */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-lavender/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-lavender-dark" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">
                Safety Rules
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-mint-dark font-bold text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-text-secondary">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Guidelines */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-sky-dark" />
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary">
              Capacity Guidelines
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capacityGuidelines.map((item, index) => (
              <div key={index} className="glass-card p-6">
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  {item.ageGroup}
                </h3>
                <p className="text-text-secondary mb-2">{item.description}</p>
                <p className="text-sm text-text-muted italic">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-text-muted mt-6 text-sm">
            Specific capacity limits vary by inflatable. Check each unit&apos;s
            specifications for exact numbers.
          </p>
        </div>
      </section>

      {/* Weather Policy */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-peach/20 flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-peach-dark" />
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary">
              Weather Policy
            </h2>
          </div>
          <div className="glass-card p-6 md:p-8">
            <p className="text-text-secondary mb-6">
              Weather conditions can change quickly. For the safety of all
              participants, please follow these guidelines:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weatherPolicy.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-butter/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-butter-dark" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary">
                      {item.condition}
                    </h3>
                    <p className="text-sm text-text-secondary">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Setup Requirements */}
      <section className="relative py-16 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-peach/10 to-mint/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-8 text-center">
              Setup Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <span className="text-3xl mb-4 block">📏</span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Clear Space
                </h3>
                <p className="text-sm text-text-secondary">
                  Ensure adequate clearance around the inflatable (typically 3-5
                  feet on all sides)
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <span className="text-3xl mb-4 block">🌱</span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Level Surface
                </h3>
                <p className="text-sm text-text-secondary">
                  Setup area must be relatively flat on grass or pavement (no
                  slopes or uneven ground)
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <span className="text-3xl mb-4 block">⚡</span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Power Access
                </h3>
                <p className="text-sm text-text-secondary">
                  Dedicated 20-amp outlet within 100 feet required (generator
                  rental available)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Agreement */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
              Rental Agreement
            </h2>
            <p className="text-text-secondary mb-4">
              All rentals require a signed rental agreement. By signing, you
              acknowledge that you have read and understood our safety policies
              and agree to:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-lavender mt-2 shrink-0" />
                Provide adult supervision at all times during use
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-mint mt-2 shrink-0" />
                Enforce all safety rules with participants
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-peach mt-2 shrink-0" />
                Not exceed capacity limits
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-sky mt-2 shrink-0" />
                Cease use during inclement weather
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-butter mt-2 shrink-0" />
                Accept responsibility for any damage beyond normal wear
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            We&apos;re happy to answer any questions you have about safety,
            setup, or our rental process.
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
              href="/faqs"
              className="px-8 py-4 rounded-full font-display font-bold text-lg border-2 border-cta-primary/20 text-cta-primary hover:bg-lavender-light/30 hover:border-cta-primary/40 transition-colors"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
