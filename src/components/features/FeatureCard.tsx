"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  Coins,
  Swords,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FeatureItem } from "@/types/feature";

const iconMap: Record<string, LucideIcon> = {
  Grass: Sprout,
  Gold: Coins,
  Swords: Swords,
  Portal: Sparkles,
  Users: Users,
};

const colorClasses: Record<string, { border: string; hover: string; text: string; glow: string }> = {
  green: {
    border: "border-[rgba(84,210,85,0.2)]",
    hover: "hover:border-[rgba(84,210,85,0.5)]",
    text: "text-[#54d255]",
    glow: "shadow-[0_0_15px_rgba(84,210,85,0.1)]",
  },
  gold: {
    border: "border-[rgba(232,179,66,0.2)]",
    hover: "hover:border-[rgba(232,179,66,0.5)]",
    text: "text-[#e8b342]",
    glow: "shadow-[0_0_15px_rgba(232,179,66,0.1)]",
  },
  red: {
    border: "border-[rgba(214,47,47,0.2)]",
    hover: "hover:border-[rgba(214,47,47,0.5)]",
    text: "text-[#d62f2f]",
    glow: "shadow-[0_0_15px_rgba(214,47,47,0.1)]",
  },
  purple: {
    border: "border-[rgba(147,51,234,0.2)]",
    hover: "hover:border-[rgba(147,51,234,0.5)]",
    text: "text-[#a855f7]",
    glow: "shadow-[0_0_15px_rgba(147,51,234,0.1)]",
  },
  blue: {
    border: "border-[rgba(60,123,217,0.2)]",
    hover: "hover:border-[rgba(60,123,217,0.5)]",
    text: "text-[#3c7bd9]",
    glow: "shadow-[0_0_15px_rgba(60,123,217,0.1)]",
  },
};

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] ?? Sparkles;
  const colors = colorClasses[feature.color] ?? colorClasses.blue;

  return (
    <motion.article
      className={`bg-[#12171a] border ${colors.border} p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 ${colors.hover} ${colors.glow}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className={`mb-4 ${colors.text}`} aria-hidden="true">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <h3 className={`font-display text-sm uppercase tracking-wider mb-2 ${colors.text}`}>
        {feature.title}
      </h3>
      <p className="text-sm text-[#b6b9bb] leading-relaxed">
        {feature.description}
      </p>
    </motion.article>
  );
}
