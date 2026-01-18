"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InflatableCard } from "./InflatableCard";
import { CategoryFilter } from "./CategoryFilter";
import type { Inflatable, Category } from "@/lib/db/schema";

interface InflatablesGridProps {
  inflatables: Inflatable[];
  categories: Category[];
}

export function InflatablesGrid({ inflatables, categories }: InflatablesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredInflatables = useMemo(() => {
    if (!selectedCategory) return inflatables;
    return inflatables.filter((item) => item.category === selectedCategory);
  }, [inflatables, selectedCategory]);

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalCount={inflatables.length}
        filteredCount={filteredInflatables.length}
      />

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredInflatables.map((inflatable, index) => (
            <motion.div
              key={inflatable.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <InflatableCard inflatable={inflatable} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredInflatables.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🎈</div>
          <h3 className="font-display font-bold text-xl text-text-primary mb-2">
            No inflatables found
          </h3>
          <p className="text-text-muted">
            Try selecting a different category or{" "}
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-cta-primary hover:underline"
            >
              view all inflatables
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
}
