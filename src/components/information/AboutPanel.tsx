import { PanelWrapper } from "./PanelWrapper";
import { ServerImage } from "@/components/ui/ServerImage";

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
      <ServerImage alt="Captura del servidor ParaguayCraft" />
    </PanelWrapper>
  );
}
