"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Rich dark overlay - creates drama and contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1033]/90 via-[#2d1f4e]/85 to-[#1a1033]/90" />
        {/* Accent color glows bleeding through */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cta-primary/20 via-transparent to-coral/20" />
      </div>

      {/* Floating color orbs - visible against dark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cta-primary/30 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-coral/20 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] bg-mint/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            className="mb-4 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <Image
              src="/logo.svg"
              alt="Jersey Jumpy"
              width={600}
              height={138}
              className="mx-auto w-64 sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto drop-shadow-xl"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-butter shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              New Jersey&apos;s #1 Bounce House Rentals Since 2007
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display font-extrabold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg">
              LET&apos;S
            </span>
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-[#a78bfa] via-[#f472b6] to-[#fb923c] bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 30px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 60px rgba(244, 114, 182, 0.3))",
                WebkitTextStroke: "1px rgba(255,255,255,0.1)"
              }}
            >
              BOUNCE!
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Premium bounce houses, slides, and obstacle courses for unforgettable
            parties. Professional delivery across New Jersey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {/* Phone CTA */}
            <motion.a
              href="tel:866-597-6625"
              className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-cta-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(124, 93, 250, 0.3)",
                  "0 10px 50px rgba(124, 93, 250, 0.5)",
                  "0 10px 30px rgba(124, 93, 250, 0.3)",
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
              <span>Call Now: 866-597-6625</span>
            </motion.a>

            {/* Browse Button */}
            <Link
              href="/inflatables"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-display font-bold text-base sm:text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-colors"
            >
              Browse Inflatables
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mint shadow-lg shadow-mint/50" />
              <span>NJ DCA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lavender shadow-lg shadow-lavender/50" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-peach shadow-lg shadow-peach/50" />
              <span>Family-Owned Since 2007</span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
