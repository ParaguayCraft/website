"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { siteConfig } from "@/config/site";

const LOADING_TIMEOUT_MS = 15_000;

export function MapaViewer() {
  const [state, setState] = useState<"loading" | "loaded" | "timeout" | "config-missing">(
    siteConfig.blueMapUrl ? "loading" : "config-missing",
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!siteConfig.blueMapUrl) return;

    timeoutRef.current = setTimeout(() => {
      setState((prev) => (prev === "loading" ? "timeout" : prev));
    }, LOADING_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRetry = () => {
    setState("loading");
    timeoutRef.current = setTimeout(() => {
      setState((prev) => (prev === "loading" ? "timeout" : prev));
    }, LOADING_TIMEOUT_MS);
  };

  if (state === "config-missing") {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#101417]">
        <div className="flex flex-col items-center text-center gap-3 max-w-md px-6">
          <p className="text-sm text-[#8a8f92]">
            El mapa interactivo aún no está configurado. Volvé más tarde.
          </p>
        </div>
      </div>
    );
  }

  const mapUrl = siteConfig.blueMapUrl!;

  return (
    <div className="flex-1 relative">
      {(state === "loading" || state === "timeout") && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#101417] z-10">
          <div className="flex flex-col items-center gap-3">
            {state === "loading" ? (
              <>
                <div className="w-8 h-8 border-2 border-[#3c7bd9] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#8a8f92]">Cargando mapa...</p>
              </>
            ) : (
              <>
                <p className="text-sm text-[#8a8f92]">
                  El mapa está tardando en cargar. Puede estar temporalmente fuera de servicio.
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#12171a] border border-[rgba(255,255,255,0.08)] text-[#f5f5f2] hover:border-[#3c7bd9] transition-colors"
                  >
                    <RefreshCw size={16} />
                    Reintentar
                  </button>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#12171a] border border-[rgba(255,255,255,0.08)] text-[#f5f5f2] hover:border-[#3c7bd9] transition-colors"
                  >
                    <ExternalLink size={16} />
                    Abrir en pestaña nueva
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <iframe
        key={state === "loading" ? undefined : "reload"}
        src={mapUrl}
        title="Mapa interactivo de ParaguayCraft"
        className="absolute inset-0 w-full h-full border-none"
        onLoad={() => {
          setState("loaded");
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        onError={() => {
          setState("timeout");
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
