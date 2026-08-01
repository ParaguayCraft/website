import type { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
import { PanelWrapper } from "@/components/information/PanelWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto | ParaguayCraft",
  description:
    "Contactanos por Discord o seguinos en nuestras redes sociales.",
};

export default function ContactoPage() {
  const { socialLinks } = siteConfig;

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-display text-2xl md:text-3xl text-[#f1f1ed] uppercase tracking-wider mb-8">
          Contacto
        </h1>

        <div className="max-w-2xl">
          <PanelWrapper title="CONTACTANOS">
            <div className="space-y-4 text-sm">
              <p className="text-[#b6b9bb] leading-relaxed">
                La mejor forma de contactarnos es a través de nuestro servidor de Discord.
                Ahí encontrás anuncios, soporte, y a toda la comunidad.
              </p>
              <div>
                <span className="text-[#8a8f92]">Discord</span>
                <p className="text-[#f5f5f2] mt-0.5">
                  <a
                    href={siteConfig.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3c7bd9] hover:underline"
                  >
                    {siteConfig.discordUrl}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-[#8a8f92]">IP del servidor</span>
                <p className="text-[#f5f5f2] font-mono mt-0.5">{siteConfig.serverDisplayAddress}</p>
              </div>
              {(socialLinks.youtube || socialLinks.tiktok) && (
                <div>
                  <span className="text-[#8a8f92]">Redes sociales</span>
                  <ul className="text-[#f5f5f2] mt-0.5 space-y-1">
                    {socialLinks.youtube && (
                      <li>
                        YouTube:{" "}
                        <a href={socialLinks.youtube} className="text-[#3c7bd9] hover:underline">
                          {socialLinks.youtube}
                        </a>
                      </li>
                    )}
                    {socialLinks.tiktok && (
                      <li>
                        TikTok:{" "}
                        <a href={socialLinks.tiktok} className="text-[#3c7bd9] hover:underline">
                          {socialLinks.tiktok}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </PanelWrapper>
        </div>
      </div>
    </PageLayout>
  );
}
