"use client";

import { motion } from "framer-motion";
import { Package, Check } from "lucide-react";
import { PartyPackage } from "@/lib/db/schema";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface PartyPackageCardProps {
  package: PartyPackage;
  index: number;
}

interface PackageItem {
  quantity: number;
  name: string;
}

const packageColors = [
  { bg: "bg-violet-100", border: "border-violet-200", accent: "text-violet-700", iconBg: "bg-violet-200" },
  { bg: "bg-emerald-100", border: "border-emerald-200", accent: "text-emerald-700", iconBg: "bg-emerald-200" },
  { bg: "bg-orange-100", border: "border-orange-200", accent: "text-orange-700", iconBg: "bg-orange-200" },
  { bg: "bg-sky-100", border: "border-sky-200", accent: "text-sky-700", iconBg: "bg-sky-200" },
];

export function PartyPackageCard({ package: pkg, index }: PartyPackageCardProps) {
  const color = packageColors[index % packageColors.length];
  const items = pkg.items as PackageItem[];

  return (
    <motion.div
      className="glass-card overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className={`${color.bg} p-6 border-b ${color.border}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${color.iconBg} flex items-center justify-center`}>
              <Package className={`w-5 h-5 ${color.accent}`} />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary">
              {pkg.name}
            </h3>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-extrabold text-3xl text-text-primary">
            {formatPrice(pkg.price)}
          </span>
          <span className="text-text-muted text-sm">total</span>
        </div>
      </div>

      {/* Items */}
      <div className="p-6 flex-1">
        <p className="text-sm text-text-muted mb-4">This package includes:</p>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full ${color.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Check className={`w-3 h-3 ${color.accent}`} />
              </div>
              <span className="text-text-secondary">
                <span className="font-semibold">({item.quantity})</span> {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0">
        <Link
          href={`/contact?package=${encodeURIComponent(pkg.name)}`}
          className="block w-full py-3 px-6 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold text-center shadow-lg shadow-cta-primary/20 hover:shadow-xl transition-shadow"
        >
          Book This Package
        </Link>
      </div>
    </motion.div>
  );
}
