"use client";

import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { ServerConnectionBar } from "./ServerConnectionBar";
import { CopyServerIpButton } from "./CopyServerIpButton";
import { motion } from "framer-motion";
import { MessageCircle, Swords } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b0d]/80 via-transparent to-[#080b0d]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0d] via-[#080b0d]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,47,47,0.08)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
          }}
        />

        {/* Decorative castle silhouette */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-64 md:h-96 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="200" width="80" height="200" fill="#f1f1ed" />
            <rect x="180" y="160" width="60" height="240" fill="#f1f1ed" />
            <rect x="240" y="220" width="40" height="180" fill="#f1f1ed" />
            <rect x="280" y="180" width="50" height="220" fill="#f1f1ed" />
            <rect x="330" y="140" width="30" height="260" fill="#f1f1ed" />
            <rect x="360" y="240" width="80" height="160" fill="#f1f1ed" />
            <rect x="460" y="240" width="80" height="160" fill="#f1f1ed" />
            <rect x="540" y="140" width="30" height="260" fill="#f1f1ed" />
            <rect x="570" y="180" width="50" height="220" fill="#f1f1ed" />
            <rect x="620" y="220" width="40" height="180" fill="#f1f1ed" />
            <rect x="660" y="160" width="60" height="240" fill="#f1f1ed" />
            <rect x="720" y="200" width="80" height="200" fill="#f1f1ed" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-32 md:pb-40 max-w-[900px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-sm md:text-base text-[#b6b9bb] font-medium uppercase tracking-[0.2em] mb-4">
          Bienvenido a
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
          <span className="block text-[#f1f1ed]">PARAGUAY</span>
          <span className="block text-[#d62f2f]">CRAFT</span>
        </h1>

        <p className="text-base md:text-lg text-[#b6b9bb] max-w-xl mb-10 leading-relaxed">
          {siteConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <CopyServerIpButton />
          <MinecraftButton
            variant="secondary"
            href={siteConfig.discordUrl}
            icon={<MessageCircle size={20} />}
          >
            Discord
          </MinecraftButton>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[600px] px-6">
          <ServerConnectionBar />
        </div>
      </motion.div>
    </section>
  );
}
