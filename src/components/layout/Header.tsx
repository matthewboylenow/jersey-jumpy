"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inflatables", label: "Inflatables" },
  { href: "/party-packages", label: "Party Packages" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-soft py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Image
                src="/logo.svg"
                alt="Jersey Jumpy"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200",
                  scrolled
                    ? "text-text-primary hover:text-cta-primary hover:bg-lavender-light/50"
                    : "text-white hover:text-white hover:bg-white/20 drop-shadow-sm"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Phone CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Phone Button */}
            <motion.a
              href="tel:866-597-6625"
              className={cn(
                "hidden sm:flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-gradient-to-r from-cta-primary to-cta-primary-hover",
                "text-white font-display font-bold text-sm",
                "shadow-lg shadow-cta-primary/30",
                "hover:shadow-xl hover:shadow-cta-primary/40 transition-shadow"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(124, 93, 250, 0.4)",
                  "0 0 40px rgba(124, 93, 250, 0.6)",
                  "0 0 20px rgba(124, 93, 250, 0.4)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Phone className="w-4 h-4" />
              <span>866-597-6625</span>
            </motion.a>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open navigation menu">
                  <Menu className="w-6 h-6" aria-hidden="true" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 bg-white/95 backdrop-blur-xl p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-lavender-light">
                    <Image
                      src="/logo.svg"
                      alt="Jersey Jumpy"
                      width={140}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block px-4 py-3 rounded-2xl font-display font-bold text-lg",
                              "text-text-primary hover:bg-lavender-light/50 transition-colors"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-lavender-light">
                    <a
                      href="tel:866-597-6625"
                      className={cn(
                        "flex items-center justify-center gap-2 w-full py-4 rounded-full",
                        "bg-gradient-to-r from-cta-primary to-cta-primary-hover",
                        "text-white font-display font-bold text-lg",
                        "shadow-lg shadow-cta-primary/30"
                      )}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Now: 866-597-6625</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
