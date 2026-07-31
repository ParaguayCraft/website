import Link from "next/link";
import { MessageCircle, SquarePlay, Music2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { href: "/informacion", label: "Información" },
  { href: "/mapa", label: "Mapa" },
  { href: siteConfig.rulesUrl, label: "Reglas" },
  { href: siteConfig.discordUrl, label: "Discord" },
  { href: "/contacto", label: "Contacto" },
];

const socialIcons = [
  siteConfig.socialLinks.discord && { href: siteConfig.socialLinks.discord, label: "Discord", icon: MessageCircle },
  siteConfig.socialLinks.youtube && { href: siteConfig.socialLinks.youtube, label: "YouTube", icon: SquarePlay },
  siteConfig.socialLinks.tiktok && { href: siteConfig.socialLinks.tiktok, label: "TikTok", icon: Music2 },
].filter(Boolean) as { href: string; label: string; icon: React.ComponentType<{ size: number }> }[];

export function Footer() {
  return (
    <footer className="bg-[#101417] border-t border-[rgba(255,255,255,0.06)]">
      {/* Minecraft terrain border */}
      <div className="h-4 bg-[#12171a] border-b border-[rgba(255,255,255,0.04)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, #54d255 3px, #54d255 4px), repeating-linear-gradient(-45deg, transparent, transparent 3px, #3c7bd9 3px, #3c7bd9 4px)",
        }} />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <span className="font-display text-lg tracking-wide">
              <span className="text-[#b6b9bb]">PARAGUAY</span>
              <span className="text-[#d62f2f]">CRAFT</span>
            </span>
            <p className="text-sm text-[#8a8f92] mt-3 leading-relaxed">
              Comunidad, diversión y aventuras sin límites.
            </p>
            <p className="text-xs text-[#8a8f92] mt-4">
              © 2026 ParaguayCraft. Todos los derechos reservados.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-wider text-[#f1f1ed] mb-4">
              Enlaces rápidos
            </h4>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#b6b9bb] hover:text-[#f1f1ed] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-wider text-[#f1f1ed] mb-4">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-6">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#b6b9bb] hover:text-[#f1f1ed] hover:border-[#3c7bd9] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-[#8a8f92] mt-4 leading-relaxed">
              ParaguayCraft no está afiliado con Mojang Studios ni Microsoft.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
