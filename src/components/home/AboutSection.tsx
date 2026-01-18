"use client";

import { motion } from "framer-motion";
import { Shield, Award, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "NJ DCA Certified",
    description:
      "Fully licensed and inspected by the NJ Department of Community Affairs",
    color: "bg-lavender",
  },
  {
    icon: Award,
    title: "Trained Operators",
    description:
      "SIOTO certified staff ensuring safe setup and operation",
    color: "bg-mint",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We arrive early to set up so you can focus on your party",
    color: "bg-peach",
  },
  {
    icon: Truck,
    title: "Full Service",
    description:
      "We handle delivery, setup, and pickup - you just have fun",
    color: "bg-sky",
  },
];

export function AboutSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-butter/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-coral via-peach to-lavender bg-clip-text text-transparent">
                Jersey Jumpy?
              </span>
            </h2>

            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Since 2007, Jersey Jumpy has been bringing joy to families across New
              Jersey. We&apos;re not just a rental company - we&apos;re party partners
              committed to making your celebration unforgettable.
            </p>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Every inflatable is professionally cleaned and inspected before each
              rental. Our certified team handles everything from delivery to pickup,
              so you can focus on what matters - enjoying your party!
            </p>

            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-lavender-light/50 to-mint-light/50">
              <div className="text-4xl">🎈</div>
              <div>
                <p className="font-display font-bold text-2xl text-text-primary">
                  GOOD. CLEAN. FUN.
                </p>
                <p className="text-text-muted text-sm">Our promise to every family</p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    feature.color
                  )}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
