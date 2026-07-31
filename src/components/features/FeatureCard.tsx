"use client";

import React from "react";
import { motion } from "framer-motion";
import type { FeatureItem } from "@/types/feature";

type IconComponent = () => React.ReactElement;

const iconMap: Record<string, IconComponent> = {
  Grass: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="28" width="36" height="10" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="4" y="30" width="32" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="8" y="18" width="24" height="12" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="12" y="14" width="16" height="4" rx="1" fill="currentColor" />
      <rect x="16" y="10" width="8" height="4" rx="1" fill="currentColor" />
    </svg>
  ),
  Gold: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="24" height="20" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="12" y="14" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
    </svg>
  ),
  Swords: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="30" x2="22" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="10" x2="18" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="16" r="2" fill="currentColor" />
      <circle cx="26" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
  Portal: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="currentColor" opacity="0.1" />
      <rect x="8" y="8" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  ),
  Users: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="10" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="28" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 32c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
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
  variant?: "hero" | "compact";
}

export function FeatureCard({ feature, index, variant = "compact" }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon];
  const colors = colorClasses[feature.color] ?? colorClasses.blue;

  if (variant === "hero") {
    return (
      <motion.article
        className={`bg-[#12171a] border ${colors.border} p-6 md:p-10 flex flex-col h-full transition-all duration-300 ${colors.hover} ${colors.glow}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
      >
        <div className={`mb-6 ${colors.text}`} aria-hidden="true">
          <IconComponent />
        </div>
        <h3 className={`font-display text-lg uppercase tracking-wider mb-3 ${colors.text}`}>
          {feature.title}
        </h3>
        <p className="text-sm text-[#b6b9bb] leading-relaxed flex-1">
          {feature.description}
        </p>
        <div className={`mt-6 w-12 h-[2px] ${colors.text} opacity-40`} />
      </motion.article>
    );
  }

  return (
    <motion.article
      className={`bg-[#12171a] border ${colors.border} p-5 md:p-6 flex flex-row items-start gap-4 transition-all duration-300 ${colors.hover} ${colors.glow}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className={`flex-shrink-0 ${colors.text}`} aria-hidden="true">
        <IconComponent />
      </div>
      <div className="min-w-0">
        <h3 className={`font-display text-xs uppercase tracking-wider mb-1 ${colors.text}`}>
          {feature.title}
        </h3>
        <p className="text-xs text-[#b6b9bb] leading-relaxed line-clamp-3">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}
