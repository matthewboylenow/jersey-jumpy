"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Inflatable } from "@/lib/db/schema";

interface InflatableCardProps {
  inflatable: Inflatable;
  index?: number;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "13x13-bouncers": { bg: "bg-violet-600", text: "text-white" },
  "castle-bouncers": { bg: "bg-orange-500", text: "text-white" },
  "combo-bouncers": { bg: "bg-emerald-600", text: "text-white" },
  "wet-dry-slides": { bg: "bg-sky-600", text: "text-white" },
  "obstacle-courses": { bg: "bg-rose-600", text: "text-white" },
};

const categoryLabels: Record<string, string> = {
  "13x13-bouncers": "13x13 Bouncer",
  "castle-bouncers": "Castle Bouncer",
  "combo-bouncers": "Combo",
  "wet-dry-slides": "Slide",
  "obstacle-courses": "Obstacle Course",
};

export function InflatableCard({ inflatable, index = 0 }: InflatableCardProps) {
  const colors = categoryColors[inflatable.category] || {
    bg: "bg-lavender",
    text: "text-lavender-dark",
  };
  const label = categoryLabels[inflatable.category] || inflatable.category;

  // Placeholder image if no main image
  const imageUrl =
    inflatable.mainImageUrl || "/images/placeholder-bouncer.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <Link href={`/inflatables/${inflatable.slug}`} className="block group">
        <motion.div
          className={cn(
            "glass-card overflow-hidden h-full",
            "transition-all duration-300",
            "hover:shadow-hover"
          )}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Image Container */}
          <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-lavender-light/50 to-peach-light/50">
            {inflatable.mainImageUrl ? (
              <Image
                src={imageUrl}
                alt={inflatable.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 280px"
                quality={95}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🎪</div>
              </div>
            )}

            {/* Category Badge */}
            <div
              className={cn(
                "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold",
                colors.bg,
                colors.text
              )}
            >
              {label}
            </div>

            {/* Price Badge */}
            {inflatable.price && (
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                <span className="text-sm font-bold text-text-primary">
                  From ${inflatable.price}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-cta-primary transition-colors line-clamp-1">
              {inflatable.name}
            </h3>

            {inflatable.subtitle && (
              <p className="text-sm text-text-muted mt-1">{inflatable.subtitle}</p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted text-sm">
                {inflatable.width && inflatable.length && (
                  <span>
                    {inflatable.width} x {inflatable.length}
                  </span>
                )}
              </div>

              <motion.span
                className="text-cta-primary font-medium text-sm flex items-center gap-1"
                whileHover={{ x: 5 }}
              >
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
