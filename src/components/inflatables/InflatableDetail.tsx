"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowLeft,
  Ruler,
  Users,
  Droplets,
  Zap,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Inflatable } from "@/lib/db/schema";

interface InflatableDetailProps {
  inflatable: Inflatable;
}

const categoryLabels: Record<string, string> = {
  "13x13-bouncers": "13x13 Bouncer",
  "castle-bouncers": "Castle Bouncer",
  "combo-bouncers": "Combo",
  "wet-dry-slides": "Wet/Dry Slide",
  "obstacle-courses": "Obstacle Course",
};

const categoryColors: Record<string, string> = {
  "13x13-bouncers": "bg-lavender text-lavender-dark",
  "castle-bouncers": "bg-peach text-peach-dark",
  "combo-bouncers": "bg-mint text-mint-dark",
  "wet-dry-slides": "bg-sky text-sky-dark",
  "obstacle-courses": "bg-coral text-coral-dark",
};

export function InflatableDetail({ inflatable }: InflatableDetailProps) {
  const categoryLabel = categoryLabels[inflatable.category] || inflatable.category;
  const categoryColor = categoryColors[inflatable.category] || "bg-lavender text-lavender-dark";

  return (
    <div className="container mx-auto px-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href="/inflatables"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-cta-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inflatables</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-lavender-light/50 to-peach-light/50 shadow-card">
            {inflatable.mainImageUrl ? (
              <Image
                src={inflatable.mainImageUrl}
                alt={inflatable.name}
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl">🎪</div>
              </div>
            )}

            {/* Category Badge */}
            <Badge className={cn("absolute top-4 left-4", categoryColor)}>
              {categoryLabel}
            </Badge>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          {/* Title */}
          <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-2">
            {inflatable.name}
          </h1>

          {inflatable.subtitle && (
            <p className="text-text-secondary text-lg mb-6">{inflatable.subtitle}</p>
          )}

          {/* Price */}
          {inflatable.price && (
            <div className="glass-card p-6 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-4xl text-cta-primary">
                  ${inflatable.price}
                </span>
                <span className="text-text-muted">starting price</span>
              </div>
              {inflatable.priceNote && (
                <p className="text-sm text-text-muted mt-2">
                  {inflatable.priceNote}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {inflatable.description && (
            <p className="text-text-secondary leading-relaxed mb-6">
              {inflatable.description}
            </p>
          )}

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {inflatable.width && inflatable.length && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavender/20 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-lavender-dark" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Size</p>
                  <p className="font-medium text-text-primary">
                    {inflatable.width} x {inflatable.length}
                    {inflatable.height && ` x ${inflatable.height}`}
                  </p>
                </div>
              </div>
            )}

            {inflatable.spaceRequired && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-mint-dark" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Space Needed</p>
                  <p className="font-medium text-text-primary">
                    {inflatable.spaceRequired}
                  </p>
                </div>
              </div>
            )}

            {inflatable.canUseWater && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-sky-dark" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Water Use</p>
                  <p className="font-medium text-text-primary">
                    Can be used wet
                  </p>
                </div>
              </div>
            )}

            {inflatable.powerRequirement && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-butter/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-butter-dark" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Power</p>
                  <p className="font-medium text-text-primary text-sm">
                    {inflatable.powerRequirement}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-8">
            {inflatable.hasSlide && (
              <Badge variant="secondary" className="bg-peach/20 text-peach-dark">
                Has Slide
              </Badge>
            )}
            {inflatable.hasPool && (
              <Badge variant="secondary" className="bg-sky/20 text-sky-dark">
                Has Pool
              </Badge>
            )}
            {inflatable.hasBasketballHoop && (
              <Badge variant="secondary" className="bg-coral/20 text-coral-dark">
                Basketball Hoop
              </Badge>
            )}
            {inflatable.hasClimbingWall && (
              <Badge variant="secondary" className="bg-mint/20 text-mint-dark">
                Climbing Wall
              </Badge>
            )}
            {inflatable.adultsAllowed && (
              <Badge variant="secondary" className="bg-lavender/20 text-lavender-dark">
                Adults Welcome
              </Badge>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <motion.a
              href="tel:866-597-6625"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold shadow-lg shadow-cta-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call to Book: 866-597-6625</span>
            </motion.a>

            <Button
              asChild
              variant="outline"
              className="px-8 py-6 rounded-full font-display font-bold border-2 border-cta-primary/20 text-cta-primary hover:bg-lavender-light/30"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 mt-6 text-sm text-text-muted">
            <Shield className="w-4 h-4 text-mint" />
            <span>NJ DCA Certified • Fully Insured • Professional Setup</span>
          </div>
        </motion.div>
      </div>

      {/* Detailed Specs */}
      {(inflatable.capacityAges2to4 ||
        inflatable.capacityAges4to7 ||
        inflatable.capacityAges7to10 ||
        inflatable.capacityAges10Plus ||
        inflatable.comboFeatures ||
        inflatable.setupSurface) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6">
            Specifications
          </h2>

          <div className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Capacity by Age */}
              {(inflatable.capacityAges2to4 ||
                inflatable.capacityAges4to7 ||
                inflatable.capacityAges7to10 ||
                inflatable.capacityAges10Plus) && (
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-3">
                    Capacity by Age
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    {inflatable.capacityAges2to4 && (
                      <li>Ages 2-4: {inflatable.capacityAges2to4}</li>
                    )}
                    {inflatable.capacityAges4to7 && (
                      <li>Ages 4-7: {inflatable.capacityAges4to7}</li>
                    )}
                    {inflatable.capacityAges7to10 && (
                      <li>Ages 7-10: {inflatable.capacityAges7to10}</li>
                    )}
                    {inflatable.capacityAges10Plus && (
                      <li>Ages 10+: {inflatable.capacityAges10Plus}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Adult Info */}
              {inflatable.adultsAllowed && (
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-3">
                    Adult Information
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>Adults allowed: Yes</li>
                    {inflatable.adultWeightLimit && (
                      <li>Weight limit: {inflatable.adultWeightLimit}</li>
                    )}
                    {inflatable.adultMaxCount && (
                      <li>Max adults: {inflatable.adultMaxCount}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Setup Requirements */}
              <div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-3">
                  Setup Requirements
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {inflatable.setupSurface && (
                    <li>Surface: {inflatable.setupSurface}</li>
                  )}
                  {inflatable.powerRequirement && (
                    <li>Power: {inflatable.powerRequirement}</li>
                  )}
                  {inflatable.generatorNote && (
                    <li className="text-text-muted">{inflatable.generatorNote}</li>
                  )}
                </ul>
              </div>

              {/* Combo Features */}
              {inflatable.comboFeatures && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="font-display font-bold text-lg text-text-primary mb-3">
                    Features Included
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {inflatable.comboFeatures}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
