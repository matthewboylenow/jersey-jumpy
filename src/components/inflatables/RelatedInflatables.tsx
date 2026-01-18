"use client";

import { motion } from "framer-motion";
import { InflatableCard } from "./InflatableCard";
import type { Inflatable } from "@/lib/db/schema";

interface RelatedInflatablesProps {
  inflatables: Inflatable[];
}

export function RelatedInflatables({ inflatables }: RelatedInflatablesProps) {
  return (
    <section className="container mx-auto px-4 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-8">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inflatables.map((inflatable, index) => (
            <InflatableCard key={inflatable.id} inflatable={inflatable} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
