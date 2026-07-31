import type { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
import { PanelWrapper } from "@/components/information/PanelWrapper";

export const metadata: Metadata = {
  title: "Votar | ParaguayCraft",
  description: "Votá por ParaguayCraft y recibí recompensas.",
};

export default function VotarPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-display text-2xl md:text-3xl text-[#f1f1ed] uppercase tracking-wider mb-8">
          Votar
        </h1>
        <PanelWrapper title="VOTAR POR EL SERVIDOR">
          <p className="text-sm text-[#777e82] text-center py-12">
            Los sitios de votación se habilitarán próximamente.
          </p>
        </PanelWrapper>
      </div>
    </PageLayout>
  );
}
