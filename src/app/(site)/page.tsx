import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { FeaturedInflatables } from "@/components/home/FeaturedInflatables";
import { AboutSection } from "@/components/home/AboutSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jerseyjumpy.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <FeaturedInflatables />
      <AboutSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
