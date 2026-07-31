"use client";

import { PanelWrapper } from "./PanelWrapper";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PlayerProgressBar } from "@/components/ui/PlayerProgressBar";
import { useServerStatus } from "@/components/status/ServerStatusProvider";
import { siteConfig } from "@/config/site";

export function ServerStatusPanel() {
  const { status, state } = useServerStatus();

  const isLoading = state === "initial" || state === "loading";

  return (
    <PanelWrapper title="ESTADO DEL SERVIDOR">
      {isLoading ? (
        <p className="text-sm text-[#8a8f92] text-center py-8">
          Consultando servidor...
        </p>
      ) : state === "provider-unavailable" ? (
        <p className="text-sm text-[#8a8f92] text-center py-8">
          No se pudo consultar el estado.
        </p>
      ) : !status ? (
        <p className="text-sm text-[#8a8f92] text-center py-8">
          No se pudo consultar el estado.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8a8f92]">Estado</span>
            <StatusBadge status={status.online ? "online" : "offline"} />
          </div>

          <div>
            <span className="text-sm text-[#8a8f92] block mb-1">Jugadores</span>
            <PlayerProgressBar current={status.playersOnline} max={status.playersMax} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8a8f92]">Versión</span>
            <span className="text-sm text-[#f5f5f2] font-mono">{status.version}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8a8f92]">IP</span>
            <span className="text-sm text-[#f5f5f2] font-mono">{siteConfig.serverDisplayAddress}</span>
          </div>
        </div>
      )}
    </PanelWrapper>
  );
}
