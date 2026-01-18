"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cta-primary via-lavender to-cta-primary-hover" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Confetti/Sprinkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Emoji */}
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎉
          </motion.div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Ready to Party?
          </h2>

          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Let&apos;s make your next celebration unforgettable. Get a free quote
            today and reserve your perfect inflatable!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="tel:866-597-6625"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-cta-primary font-display font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call 866-597-6625</span>
            </motion.a>

            <Button
              asChild
              variant="outline"
              className="px-8 py-6 rounded-full font-display font-bold text-lg bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Request a Quote</span>
              </Link>
            </Button>
          </div>

          {/* Sub-text */}
          <p className="mt-8 text-white/70 text-sm">
            No obligation. We typically respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
