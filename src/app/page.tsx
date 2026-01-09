"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen animated-gradient overflow-hidden relative">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-lavender/30 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-mint/20 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-peach/15 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo Text */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
            style={{ fontFamily: "var(--font-baloo), sans-serif" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] via-[#4ECDC4] via-[#45B7D1] to-[#96CEB4] bg-clip-text text-transparent">
              Jersey
            </span>{" "}
            <span className="bg-gradient-to-r from-[#DDA0DD] via-[#FF69B4] to-[#FF6B6B] bg-clip-text text-transparent">
              Jumpy
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-2"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            New Jersey&apos;s #1 Bounce House Rentals
          </motion.p>

          <motion.p
            className="text-lg text-text-muted mb-8"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            GOOD. CLEAN. FUN. - Since 2007
          </motion.p>

          {/* Coming Soon Card */}
          <motion.div
            className="glass-card p-8 md:p-12 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span
                className="w-3 h-3 bg-mint rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-lg font-medium text-text-primary"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                New Website Coming Soon
              </span>
              <motion.span
                className="w-3 h-3 bg-lavender rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              />
            </div>

            <p
              className="text-text-secondary mb-8"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              We&apos;re building something magical! In the meantime, give us a
              call to book your next party.
            </p>

            {/* CTA Button */}
            <motion.a
              href="tel:866-597-6625"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white rounded-full font-bold text-lg shadow-lg"
              style={{ fontFamily: "var(--font-baloo), sans-serif" }}
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
              <Phone className="w-5 h-5" />
              Call Now: 866-597-6625
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <Phone className="w-4 h-4 text-lavender" />
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                732-750-8810
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <Mail className="w-4 h-4 text-peach" />
              <a
                href="mailto:info@jerseyjumpy.com"
                className="hover:text-cta-primary transition-colors"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                info@jerseyjumpy.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <MapPin className="w-4 h-4 text-mint" />
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Iselin, NJ
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="absolute bottom-6 left-0 right-0 text-center text-text-muted text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          <p>JerseyJumpy.com LLC - Family-owned since 2007</p>
          <p className="mt-1">NJ DCA Certified | SIOTO Trained</p>
        </motion.footer>
      </div>
    </div>
  );
}
