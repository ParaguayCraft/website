import type { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
import { PanelWrapper } from "@/components/information/PanelWrapper";
import { ServerImage } from "@/components/ui/ServerImage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Información | ParaguayCraft",
  description:
    "Conocé más sobre ParaguayCraft, el servidor de Minecraft para la comunidad paraguaya.",
};

export default function InformacionPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-display text-2xl md:text-3xl text-[#f1f1ed] uppercase tracking-wider mb-8">
          Información
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PanelWrapper title="SOBRE NOSOTROS">
            <p className="text-sm text-[#b6b9bb] leading-relaxed mb-4">
              ParaguayCraft es un servidor de Minecraft creado para unir a la comunidad
              paraguaya y ofrecer una experiencia de juego duradera, competitiva y divertida.
            </p>
            <p className="text-sm text-[#b6b9bb] leading-relaxed mb-5">
              Nuestro objetivo es construir un mundo vivo donde cada jugador pueda sobrevivir,
              comerciar, competir, formar alianzas y participar en eventos junto a la comunidad.
            </p>
            <p className="text-sm text-[#b6b9bb] leading-relaxed mb-5">
              El servidor cuenta con modos Supervivencia, un sistema de economía avanzado con
              tiendas y subastas, arenas PvP, eventos semanales, y una comunidad activa que
              crece día a día. Ya seas constructor, comerciante, guerrero o explorador, hay un
              lugar para vos en ParaguayCraft.
            </p>
            <ServerImage alt="Captura del servidor ParaguayCraft" />
          </PanelWrapper>

          <PanelWrapper title="CÓMO CONECTARSE">
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[#8a8f92]">IP del servidor</span>
                <p className="text-[#f5f5f2] font-mono mt-0.5">{siteConfig.serverDisplayAddress}</p>
              </div>
              <div>
                <span className="text-[#8a8f92]">Versión</span>
                <p className="text-[#f5f5f2] mt-0.5">Minecraft Java 1.21+</p>
              </div>
              <div>
                <span className="text-[#8a8f92]">Plataformas</span>
                <p className="text-[#f5f5f2] mt-0.5">Java Edition (premium y no premium)</p>
              </div>
              <p className="text-[#b6b9bb] leading-relaxed pt-2">
                Abrí Minecraft, dirigite a la sección Multijugador, agregá el servidor con la
                IP de arriba y empezá a jugar. No necesitás mods ni clientes especiales.
              </p>
            </div>
          </PanelWrapper>
        </div>
      </div>
    </PageLayout>
  );
}
