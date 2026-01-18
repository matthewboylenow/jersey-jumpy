"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/db/schema";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <motion.div
      className="glass-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AccordionItem value={`item-${faq.id}`} className="border-b border-lavender/20">
              <AccordionTrigger className="text-left font-display font-semibold text-text-primary hover:text-cta-primary hover:no-underline py-5 text-base md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
