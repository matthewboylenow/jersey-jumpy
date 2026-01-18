import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  inflatables: [
    { href: "/inflatables?category=13x13-bouncers", label: "13x13 Bouncers" },
    { href: "/inflatables?category=castle-bouncers", label: "Castle Bouncers" },
    { href: "/inflatables?category=combo-bouncers", label: "Combo Bouncers" },
    { href: "/inflatables?category=wet-dry-slides", label: "Wet/Dry Slides" },
    { href: "/inflatables?category=obstacle-courses", label: "Obstacle Courses" },
  ],
  company: [
    { href: "/party-packages", label: "Party Packages" },
    { href: "/rates-deposits", label: "Rates & Deposits" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faqs", label: "FAQs" },
    { href: "/policies", label: "Policies" },
    { href: "/certifications", label: "Certifications" },
  ],
};

const socialLinks = [
  { href: "https://www.facebook.com/JerseyJumpy/", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/jerseyjumpy/", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/jerseyjumpy/", icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* Wave Divider */}
      <div className="w-full overflow-hidden bg-transparent">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <path
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            fill="#2D2A3E"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="bg-[#2D2A3E] text-white pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand & Contact */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="font-display font-extrabold text-2xl">
                  <span className="bg-gradient-to-r from-coral via-lavender to-mint bg-clip-text text-transparent">
                    Jersey
                  </span>
                  <span className="bg-gradient-to-r from-sky via-peach to-butter bg-clip-text text-transparent">
                    Jumpy
                  </span>
                </span>
              </Link>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                New Jersey&apos;s premier bounce house and inflatable rental company.
                Bringing joy to parties since 2007.
              </p>
              <p className="font-display font-bold text-lavender-light text-lg">
                GOOD. CLEAN. FUN.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:866-597-6625"
                    className="flex items-center gap-3 text-white/70 hover:text-lavender-light transition-colors"
                  >
                    <Phone className="w-4 h-4 text-lavender" />
                    <span className="text-sm">866-597-6625 (Toll Free)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:732-750-8810"
                    className="flex items-center gap-3 text-white/70 hover:text-lavender-light transition-colors"
                  >
                    <Phone className="w-4 h-4 text-mint" />
                    <span className="text-sm">732-750-8810 (Local)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@jerseyjumpy.com"
                    className="flex items-center gap-3 text-white/70 hover:text-lavender-light transition-colors"
                  >
                    <Mail className="w-4 h-4 text-peach" />
                    <span className="text-sm">info@jerseyjumpy.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-sky mt-0.5" />
                  <span className="text-sm">PO Box 217, Iselin, NJ 08830</span>
                </li>
              </ul>
            </div>

            {/* Inflatables Links */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Inflatables</h3>
              <ul className="space-y-2">
                {footerLinks.inflatables.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-lavender-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-lavender-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "bg-white/10 text-white/70",
                      "hover:bg-lavender hover:text-white hover:shadow-glow-lavender",
                      "transition-all duration-300"
                    )}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-sm text-white/50 text-center md:text-right">
                © {new Date().getFullYear()} JerseyJumpy.com LLC. All rights reserved.
                <br className="sm:hidden" />
                <span className="sm:ml-2">
                  Made with <span className="text-coral">❤</span> in New Jersey
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
