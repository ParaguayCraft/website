import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { FeatureSection } from "@/components/features/FeatureSection";
import { InformationGrid } from "@/components/information/InformationGrid";
import { DiscordCallToAction } from "@/components/community/DiscordCallToAction";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <InformationGrid />
        <DiscordCallToAction />
      </main>
      <Footer />
    </>
  );
}
