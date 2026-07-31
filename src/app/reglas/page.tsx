import type { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
import { PanelWrapper } from "@/components/information/PanelWrapper";

export const metadata: Metadata = {
  title: "Reglas | ParaguayCraft",
  description: "Reglas del servidor ParaguayCraft.",
};

export default function ReglasPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-display text-2xl md:text-3xl text-[#f1f1ed] uppercase tracking-wider mb-8">
          Reglas
        </h1>
        <PanelWrapper title="NORMAS DEL SERVIDOR">
          <p className="text-sm text-[#8a8f92] text-center py-12">
            Las reglas del servidor se publicarán próximamente.
          </p>
        </PanelWrapper>
      </div>
    </PageLayout>
  );
}
