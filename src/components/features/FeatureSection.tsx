"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "./FeatureCard";
import { features } from "@/data/features";

export function FeatureSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading>¿QUÉ ENCONTRARÁS?</SectionHeading>
          <div className="flex justify-center gap-2 mt-3">
            <span className="text-[#d62f2f] text-lg" aria-hidden="true">⬥</span>
            <span className="text-[#f1f1ed] text-lg" aria-hidden="true">⬥</span>
            <span className="text-[#2455a4] text-lg" aria-hidden="true">⬥</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
