"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion } from "framer-motion";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useServerStatus } from "@/components/status/ServerStatusProvider";
import { siteConfig } from "@/config/site";

export function ServerConnectionBar() {
  const { status, state } = useServerStatus();
  const { state: copyState, copy } = useCopyToClipboard({ resetAfter: 1500 });

  const handleCopyIp = () => copy(siteConfig.serverDisplayAddress);
  const isLoading = state === "initial";
  const copied = copyState === "copied";
  const failed = copyState === "failed";

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
            isLoading
              ? "bg-[#e8b342] animate-pulse"
              : status?.online
                ? "bg-[#54d255] shadow-[0_0_6px_#54d255]"
                : "bg-[#8a8f92]"
          }`}
          aria-hidden="true"
        />
        <span className="text-[#b6b9bb]">
          {isLoading
            ? "Consultando servidor..."
            : state === "provider-unavailable" && !status
              ? "No se pudo consultar"
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
        ) : failed ? (
          <AlertCircle size={16} className="text-[#e8b342]" />
        ) : (
          <Copy size={16} className="text-[#8a8f92]" />
        )}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copyState === "copied"
          ? `Dirección IP copiada: ${siteConfig.serverDisplayAddress}`
          : copyState === "failed"
            ? `No se pudo copiar la dirección IP: ${siteConfig.serverDisplayAddress}`
            : copyState === "copying"
              ? `Copiando la dirección IP: ${siteConfig.serverDisplayAddress}`
              : ""}
      </span>

      <span className="text-[#8a8f92] text-sm">
        Versión: {status?.version ?? "—"}
      </span>
    </motion.div>
  );
}
