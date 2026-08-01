"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { Sword, Copy, Check, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CopyServerIpButton() {
  const { state, copy } = useCopyToClipboard();

  const handleCopy = () => copy(siteConfig.serverIp);

  const labels: Record<string, string> = {
    idle: "JUGAR AHORA",
    copying: "COPIANDO...",
    copied: "IP COPIADA",
    failed: "NO SE PUDO COPIAR",
  };

  return (
    <div className="relative inline-flex">
      <MinecraftButton
        variant="primary"
        onClick={handleCopy}
        icon={
          state === "copied" ? (
            <Check size={20} />
          ) : state === "failed" ? (
            <AlertCircle size={20} />
          ) : (
            <Sword size={20} />
          )
        }
      >
        {labels[state]}
      </MinecraftButton>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied"
          ? "Dirección IP copiada"
          : state === "failed"
            ? `No se pudo copiar. IP: ${siteConfig.serverIp}`
            : ""}
      </span>
    </div>
  );
}
