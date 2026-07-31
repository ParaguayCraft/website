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
      <div className="aspect-video bg-[#101417] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#8a8f92] text-xs">
        Captura del servidor
      </div>
    </PanelWrapper>
  );
}
