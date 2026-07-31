import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { siteConfig } from "@/config/site";
import { MapaViewer } from "./MapaViewer";

export const metadata: Metadata = {
  title: "Mapa | ParaguayCraft",
  description: "Explorá el mapa interactivo del servidor ParaguayCraft en tiempo real.",
};

export default function MapaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-[88px] h-[calc(100vh-88px)]">
        <MapaViewer />
      </main>
      <Footer />
    </>
  );
}
