"use client";

import { useState } from "react";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { Sword } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CopyServerIpButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.serverDisplayAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: just show the IP was "copied"
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <MinecraftButton
      variant="primary"
      onClick={handleCopy}
      icon={<Sword size={20} />}
    >
      {copied ? "IP COPIADA" : "JUGAR AHORA"}
    </MinecraftButton>
  );
}
