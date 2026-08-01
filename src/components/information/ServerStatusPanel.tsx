"use client";

import { PanelWrapper } from "./PanelWrapper";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PlayerProgressBar } from "@/components/ui/PlayerProgressBar";
import { useServerStatus } from "@/components/status/ServerStatusProvider";
import { siteConfig } from "@/config/site";

export function ServerStatusPanel() {
  const { status, state, stale } = useServerStatus();

  const isLoading = state === "initial";
  const badgeStatus =
    state === "provider-unavailable"
      ? "unavailable"
      : status?.online
        ? "online"
        : "offline";
  const statusAnnouncement =
    state === "provider-unavailable"
      ? stale
        ? "No se pudo actualizar el estado. Mostrando el último estado conocido."
        : "No se pudo consultar el estado del servidor."
      : state === "online"
        ? "Servidor en línea."
        : state === "offline"
          ? "Servidor desconectado."
          : "Consultando el estado del servidor.";

  return (
    <PanelWrapper title="ESTADO DEL SERVIDOR">
      {isLoading ? (
        <p className="text-sm text-[#8a8f92] text-center py-8">
          Consultando servidor...
        </p>
      ) : !status ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8a8f92]">Estado</span>
            <StatusBadge status="unavailable" />
          </div>
          <p className="text-sm text-[#8a8f92] text-center py-4">
            No se pudo consultar el estado.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8a8f92]">Estado</span>
            <StatusBadge status={badgeStatus} />
          </div>

          {stale && (
            <p className="text-xs text-[#e8b342]" role="note">
              Mostrando el último estado conocido; puede estar desactualizado.
            </p>
          )}

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
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusAnnouncement}
      </p>
    </PanelWrapper>
  );
}
