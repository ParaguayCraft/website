"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export function MapaViewer() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-1 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#101417] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#3c7bd9] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#8a8f92]">Cargando mapa...</p>
          </div>
        </div>
      )}
      <iframe
        src={siteConfig.blueMapUrl ?? undefined}
        title="Mapa interactivo de ParaguayCraft"
        className="absolute inset-0 w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}
