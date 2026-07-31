"use client";

import { useState, useEffect } from "react";
import { PanelWrapper } from "./PanelWrapper";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PlayerProgressBar } from "@/components/ui/PlayerProgressBar";
import { fetchServerStatus } from "@/services/minecraftStatus";
import type { ServerStatus } from "@/types/server";
import { siteConfig } from "@/config/site";

export function ServerStatusPanel() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval>;

    const fetchStatus = () => {
      setLoading(true);
      setError(false);

      fetchServerStatus()
        .then((data) => {
          if (!cancelled) {
            setStatus(data);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError(true);
            setStatus(null);
            setLoading(false);
          }
        });
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <PanelWrapper title="ESTADO DEL SERVIDOR">
      {loading ? (
        <p className="text-sm text-[#777e82] text-center py-8">
          Consultando servidor...
        </p>
      ) : error || !status ? (
        <p className="text-sm text-[#777e82] text-center py-8">
          No se pudo consultar el estado.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#777e82]">Estado</span>
            <StatusBadge status={status.online ? "online" : "offline"} />
          </div>

          <div>
            <span className="text-sm text-[#777e82] block mb-1">Jugadores</span>
            <PlayerProgressBar current={status.playersOnline} max={status.playersMax} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#777e82]">Versión</span>
            <span className="text-sm text-[#f5f5f2] font-mono">{status.version}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#777e82]">IP</span>
            <span className="text-sm text-[#f5f5f2] font-mono">{siteConfig.serverIp}</span>
          </div>
        </div>
      )}
    </PanelWrapper>
  );
}
