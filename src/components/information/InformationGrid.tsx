"use client";

import { motion } from "framer-motion";
import { AboutPanel } from "./AboutPanel";
import { NewsPanel } from "./NewsPanel";
import { ServerStatusPanel } from "./ServerStatusPanel";

export function InformationGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <AboutPanel />
          <NewsPanel />
          <ServerStatusPanel />
        </motion.div>
      </div>
    </section>
  );
}
