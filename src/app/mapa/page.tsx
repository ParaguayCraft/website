import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mapa | ParaguayCraft",
  description: "Explorá el mapa interactivo del servidor ParaguayCraft en tiempo real.",
};

export default function MapaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-[88px]">
        <div className="flex-1 relative">
          <iframe
            src={siteConfig.blueMapUrl}
            title="Mapa interactivo de ParaguayCraft"
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
