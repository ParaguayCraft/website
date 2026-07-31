"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { siteConfig } from "@/config/site";

export function DiscordCallToAction() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(60,123,217,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(214,47,47,0.04)_0%,transparent_60%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wider text-[#f1f1ed] mb-4">
          ÚNETE A LA COMUNIDAD
        </h2>
        <p className="text-[#b6b9bb] mb-8 text-base md:text-lg leading-relaxed">
          Conoce jugadores, participa en eventos, recibe anuncios y forma tu equipo en
          nuestro Discord.
        </p>

        <div className="flex flex-col items-center gap-4">
          <MinecraftButton
            variant="secondary"
            href={siteConfig.discordUrl}
            icon={<MessageCircle size={20} />}
            className="px-8 py-4 text-base"
          >
            UNIRME AL DISCORD
          </MinecraftButton>
          <p className="text-sm text-[#8a8f92]">
            +500 miembros en nuestra comunidad
          </p>
        </div>
      </motion.div>
    </section>
  );
}
