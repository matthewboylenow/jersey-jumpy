"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const avatarColors = [
  "bg-lavender",
  "bg-mint",
  "bg-peach",
  "bg-sky",
  "bg-butter",
  "bg-coral",
];

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-card relative"
          >
            {/* Quote Mark */}
            <span className="absolute -top-4 left-8 text-8xl text-lavender/30 font-serif leading-none">
              &ldquo;
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating || 5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-butter text-butter-dark" />
                </motion.span>
              ))}
            </div>

            {/* Content */}
            <p className="font-handwritten text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
              {testimonials[activeIndex].content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  "text-white font-display font-bold text-xl",
                  avatarColors[activeIndex % avatarColors.length]
                )}
              >
                {testimonials[activeIndex].customerName.charAt(0)}
              </div>
              <div>
                <p className="font-display font-bold text-lg text-text-primary">
                  {testimonials[activeIndex].customerName}
                </p>
                {testimonials[activeIndex].location && (
                  <p className="text-sm text-text-muted">
                    {testimonials[activeIndex].location}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white shadow-soft border-0 hover:shadow-card hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="w-12 h-12 rounded-full bg-white shadow-soft border-0 hover:shadow-card hover:scale-110 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-8 bg-cta-primary"
                : "bg-lavender-light hover:bg-lavender"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
