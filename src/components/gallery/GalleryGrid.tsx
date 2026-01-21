"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  slug: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const categoryLabels: Record<string, string> = {
  "13x13-bouncers": "13'x13' Bouncer",
  "castle-bouncers": "Castle Bouncer",
  "combo-bouncers": "Combo Bouncer",
  "wet-dry-slides": "Wet/Dry Slide",
  "obstacle-courses": "Obstacle Course",
};

const categoryColors: Record<string, string> = {
  "13x13-bouncers": "bg-lavender/80",
  "castle-bouncers": "bg-peach/80",
  "combo-bouncers": "bg-mint/80",
  "wet-dry-slides": "bg-sky/80",
  "obstacle-courses": "bg-coral/80",
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-display font-medium text-sm transition-all ${
              filter === category
                ? "bg-cta-primary text-white shadow-lg shadow-cta-primary/30"
                : "bg-white/70 text-text-secondary hover:bg-white/90"
            }`}
          >
            {category === "all" ? "All" : categoryLabels[category] || category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.02 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={85}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Category Badge */}
              <div
                className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${
                  categoryColors[image.category] || "bg-lavender/80"
                } backdrop-blur-sm`}
              >
                {categoryLabels[image.category] || image.category}
              </div>
              {/* Name on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-display font-bold text-sm truncate">
                  {image.name}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  quality={90}
                />
              </div>
              {/* Caption */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-display font-bold text-xl">
                    {selectedImage.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {categoryLabels[selectedImage.category] ||
                      selectedImage.category}
                  </p>
                </div>
                <Link
                  href={`/inflatables/${selectedImage.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
