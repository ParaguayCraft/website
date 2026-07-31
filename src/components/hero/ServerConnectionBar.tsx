"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { fetchServerStatus, toLegacyStatus } from "@/services/minecraftStatus";
import type { ServerStatus } from "@/types/server";
import { siteConfig } from "@/config/site";

export function ServerConnectionBar() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = () => {
      fetchServerStatus()
        .then((response) => {
          if (!cancelled) {
            setStatus(toLegacyStatus(response));
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setStatus({
              online: false,
              playersOnline: 0,
              playersMax: 0,
              version: "—",
              address: siteConfig.serverDisplayAddress,
            });
            setLoading(false);
          }
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.serverDisplayAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      className="bg-[#101417] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] px-4 py-3 md:px-6 md:py-4 flex flex-wrap items-center justify-center md:justify-between gap-3 md:gap-6 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            loading
              ? "bg-[#e8b342] animate-pulse"
              : status?.online
                ? "bg-[#54d255] shadow-[0_0_6px_#54d255]"
                : "bg-[#8a8f92]"
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

      <button
        onClick={handleCopyIp}
        className="flex items-center gap-1.5 text-[#f5f5f2] hover:text-[#3c7bd9] transition-colors cursor-pointer font-mono text-sm"
        aria-label={`Copiar IP del servidor: ${siteConfig.serverDisplayAddress}`}
      >
        <span>IP: {siteConfig.serverDisplayAddress}</span>
        {copied ? (
          <Check size={16} className="text-[#54d255]" />
        ) : (
          <Copy size={16} className="text-[#8a8f92]" />
        )}
      </button>

      <span className="text-[#8a8f92] text-sm">
        Versión: {status?.version ?? "—"}
      </span>
    </motion.div>
  );
}
