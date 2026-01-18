"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/db/schema";

interface TestimonialGridProps {
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

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {testimonials.map((testimonial, index) => {
        const colorIndex = testimonial.customerName.charCodeAt(0) % avatarColors.length;
        const avatarColor = avatarColors[colorIndex];

        return (
          <motion.div
            key={testimonial.id}
            className="glass-card p-6 relative h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-3 -left-1">
              <Quote className="w-10 h-10 text-lavender/40 fill-lavender/20" />
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-butter-dark fill-butter-dark"
                />
              ))}
            </div>

            {/* Content */}
            <p className="font-handwritten text-lg text-text-secondary leading-relaxed flex-1 mb-6">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-lavender/20">
              <div
                className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold`}
              >
                {testimonial.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-display font-bold text-text-primary">
                  {testimonial.customerName}
                </p>
                {testimonial.location && (
                  <p className="text-sm text-text-muted">{testimonial.location}</p>
                )}
              </div>
            </div>

            {/* Featured Badge */}
            {testimonial.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs font-bold bg-butter/30 text-butter-dark rounded-full">
                  Featured
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
