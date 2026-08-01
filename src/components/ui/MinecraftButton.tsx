"use client";

import { type ReactNode } from "react";
import Link from "next/link";

interface MinecraftButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  /** Internal routes (/) or external URLs (https://...) */
  href?: string;
  className?: string;
  icon?: ReactNode;
}

function isExternalLink(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

function isInvalidHref(href: string): boolean {
  return href === "" || href === "#";
}

export function MinecraftButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  icon,
}: MinecraftButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-display text-sm uppercase tracking-wider px-6 py-3 transition-all duration-200 cursor-pointer border-2 select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-[#d62f2f] border-[#991f24] text-[#f1f1ed] hover:bg-[#e04040] hover:border-[#d62f2f] shadow-[inset_0_-3px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[2px] active:scale-[0.98]",
    secondary:
      "bg-[#12171a] border-[#2455a4] text-[#f5f5f2] hover:bg-[#181e22] hover:border-[#3c7bd9] shadow-[inset_0_-3px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[2px] active:scale-[0.98]",
    outline:
      "bg-transparent border-[rgba(255,255,255,0.15)] text-[#f5f5f2] hover:bg-[rgba(255,255,255,0.05)] hover:border-[#3c7bd9] active:scale-[0.98]",
  };

  // Button — no href at all
  if (!href || isInvalidHref(href)) {
    return (
      <button
        type="button"
        className={`${base} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    );
  }

  // External URL — standard anchor
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
        {children}
      </a>
    );
  }

  // Internal route — Next.js Link
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {icon}
      {children}
    </Link>
  );
}
