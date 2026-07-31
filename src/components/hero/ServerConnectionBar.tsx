"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { fetchServerStatus } from "@/services/minecraftStatus";
import type { ServerStatus } from "@/types/server";
import { siteConfig } from "@/config/site";

export function ServerConnectionBar() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchServerStatus()
      .then((data) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled)
          setStatus({
            online: false,
            playersOnline: 0,
            playersMax: 0,
            version: "—",
            address: siteConfig.serverIp,
          });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.serverIp);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      className="bg-[#101417]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] shadow-lg px-4 py-3 md:px-6 md:py-4 flex flex-wrap items-center justify-center md:justify-between gap-3 md:gap-6 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            loading
              ? "bg-[#e8b342] animate-pulse"
              : status?.online
                ? "bg-[#54d255] shadow-[0_0_6px_#54d255]"
                : "bg-[#777e82]"
          }`}
          aria-hidden="true"
        />
        <span className="text-[#b6b9bb]">
          {loading
            ? "Consultando servidor..."
            : status?.online
              ? `${status.playersOnline} jugadores conectados`
              : "Servidor desconectado"}
        </span>
      </div>

      {/* IP */}
      <button
        onClick={handleCopyIp}
        className="flex items-center gap-1.5 text-[#f5f5f2] hover:text-[#3c7bd9] transition-colors cursor-pointer font-mono text-sm"
        aria-label="Copiar IP del servidor"
      >
        <span>IP: {siteConfig.serverIp}</span>
        {copied ? (
          <Check size={16} className="text-[#54d255]" />
        ) : (
          <Copy size={16} className="text-[#777e82]" />
        )}
      </button>

      {/* Version */}
      <span className="text-[#777e82] text-sm">
        Versión: {status?.version ?? "—"}
      </span>
    </motion.div>
  );
}
