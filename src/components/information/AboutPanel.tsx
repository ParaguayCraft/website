import { PanelWrapper } from "./PanelWrapper";

export function AboutPanel() {
  return (
    <PanelWrapper title="SOBRE NOSOTROS">
      <p className="text-sm text-[#b6b9bb] leading-relaxed mb-4">
        ParaguayCraft es un servidor de Minecraft creado para unir a la comunidad
        paraguaya y ofrecer una experiencia de juego duradera, competitiva y divertida.
      </p>
      <p className="text-sm text-[#b6b9bb] leading-relaxed mb-5">
        Nuestro objetivo es construir un mundo vivo donde cada jugador pueda sobrevivir,
        comerciar, competir, formar alianzas y participar en eventos junto a la comunidad.
      </p>
      <div className="aspect-video bg-[#101417] border border-[rgba(255,255,255,0.06)] flex items-center justify-center" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1a1f23]">
          <rect x="4" y="4" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 38l10-10 6 6 10-10 14 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </PanelWrapper>
  );
}
