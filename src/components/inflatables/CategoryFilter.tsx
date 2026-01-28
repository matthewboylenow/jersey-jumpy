"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/db/schema";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  totalCount: number;
  filteredCount: number;
}

const categoryIcons: Record<string, string> = {
  "13x13-bouncers": "🏠",
  "castle-bouncers": "🏰",
  "combo-bouncers": "🎪",
  "wet-dry-slides": "🌊",
  "obstacle-courses": "🏃",
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  totalCount,
  filteredCount,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-20 z-20 bg-white/80 backdrop-blur-xl py-4 -mx-4 px-4 rounded-2xl shadow-soft">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* All Button */}
        <motion.button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200",
            !selectedCategory
              ? "bg-cta-primary text-white shadow-lg shadow-cta-primary/30"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All ({totalCount})
        </motion.button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;
          const icon = categoryIcons[category.slug] || "🎈";

          return (
            <motion.button
              key={category.slug}
              onClick={() => onSelectCategory(category.slug)}
              className={cn(
                "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
                isSelected
                  ? "bg-cta-primary text-white shadow-lg shadow-cta-primary/30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{icon}</span>
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Results Count */}
      {selectedCategory && (
        <motion.p
          className="text-center text-sm text-text-muted mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Showing {filteredCount} of {totalCount} inflatables
        </motion.p>
      )}
    </div>
  );
}
