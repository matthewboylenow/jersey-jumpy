import { Metadata } from "next";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { Award, Shield, CheckCircle, ExternalLink, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications & Training | Jersey Jumpy",
  description:
    "Jersey Jumpy is NJ DCA certified and SIOTO trained. Learn about our safety certifications, insurance, and professional training.",
};

const certifications = [
  {
    name: "NJ Department of Community Affairs",
    shortName: "NJ DCA",
    description:
      "Jersey Jumpy is fully licensed and registered with the New Jersey Department of Community Affairs. All of our inflatables meet state safety standards and are inspected annually.",
    link: "http://www.state.nj.us/dca/",
    color: "lavender",
    icon: "🏛️",
  },
  {
    name: "Safe Inflatable Operators Training Organization",
    shortName: "SIOTO",
    description:
      "Our team has completed comprehensive training through SIOTO, the industry leader in inflatable safety education. This certification ensures we follow best practices for setup, operation, and supervision.",
    link: "http://www.sioto.org/",
    color: "mint",
    icon: "📚",
  },
];

const safetyFeatures = [
  {
    title: "Fully Insured",
    description:
      "We carry comprehensive general liability insurance to protect you and your guests.",
    icon: "🛡️",
  },
  {
    title: "Annual Inspections",
    description:
      "All equipment is inspected annually by certified inspectors and maintained to the highest standards.",
    icon: "🔍",
  },
  {
    title: "Clean Equipment",
    description:
      "Every inflatable is thoroughly cleaned and sanitized before and after each rental.",
    icon: "✨",
  },
  {
    title: "Professional Setup",
    description:
      "Our trained technicians handle all delivery, setup, and anchoring to ensure safe operation.",
    icon: "🔧",
  },
  {
    title: "Quality Materials",
    description:
      "We use only commercial-grade inflatables made with lead-free, fire-retardant vinyl.",
    icon: "🏆",
  },
  {
    title: "Safety Instructions",
    description:
      "We provide detailed safety guidelines and instructions with every rental.",
    icon: "📋",
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <Award className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Licensed & Certified
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Safety isn&apos;t just a priority—it&apos;s our foundation. We maintain
              the highest standards of certification and training in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                2007
              </p>
              <p className="text-text-muted text-sm">Established</p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                100%
              </p>
              <p className="text-text-muted text-sm">Insured</p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                NJ
              </p>
              <p className="text-text-muted text-sm">DCA Certified</p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                SIOTO
              </p>
              <p className="text-text-muted text-sm">Trained</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-8 text-center">
            Official Certifications
          </h2>
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-${cert.color}/20 flex items-center justify-center shrink-0`}
                  >
                    <span className="text-3xl">{cert.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h3 className="font-display font-bold text-xl text-text-primary">
                        {cert.name}
                      </h3>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-bold bg-${cert.color}/20 text-${cert.color}-dark rounded-full w-fit`}
                      >
                        {cert.shortName}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-4">{cert.description}</p>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cta-primary font-medium hover:text-cta-primary-hover transition-colors"
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="relative py-16 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-peach/10 to-mint/10" />
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-mint-dark" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">
                Our Safety Commitment
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
              Why Certification Matters
            </h2>
            <div className="space-y-4">
              {[
                "Many bounce house rental companies operate without proper licensing or insurance",
                "Uncertified operators may use equipment that hasn't been safety inspected",
                "Proper training ensures correct setup, anchoring, and supervision protocols",
                "NJ state law requires DCA registration for amusement ride operators",
                "Insurance protects you from liability in case of accidents",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-mint-dark shrink-0 mt-0.5" />
                  <p className="text-text-secondary">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-lavender/10 rounded-2xl">
              <p className="text-center text-text-secondary">
                <strong className="text-text-primary">Pro Tip:</strong> Always ask
                your rental company for proof of insurance and state registration
                before booking. A reputable company will be happy to provide this
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
            Book with Confidence
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            When you choose Jersey Jumpy, you&apos;re choosing a company that puts
            safety first. Family-owned and operated since 2007.
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
