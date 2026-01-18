"use client";

import { motion } from "framer-motion";
import { Calendar, Package, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/contact",
    icon: Calendar,
    title: "Book Now",
    description: "Request a quote for your next party or event",
    color: "lavender",
    gradient: "from-lavender to-lavender-dark",
  },
  {
    href: "/party-packages",
    icon: Package,
    title: "Party Packages",
    description: "Save big with our bundled inflatable packages",
    color: "peach",
    gradient: "from-peach to-coral",
  },
  {
    href: "/faqs",
    icon: HelpCircle,
    title: "FAQs",
    description: "Get answers to common questions",
    color: "mint",
    gradient: "from-mint to-mint-dark",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export function QuickActions() {
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-32 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {actions.map((action) => (
            <motion.div key={action.href} variants={itemVariants}>
              <Link href={action.href} className="block h-full">
                <motion.div
                  className={cn(
                    "p-6 h-full rounded-3xl bg-white shadow-card border border-cloud",
                    "transition-all duration-300",
                    "hover:shadow-hover hover:-translate-y-2"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                      `bg-gradient-to-br ${action.gradient}`
                    )}
                  >
                    <action.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                    {action.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {action.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-1 text-cta-primary font-medium text-sm">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
