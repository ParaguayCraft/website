"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { MobileNavigation } from "./MobileNavigation";
import {
  getCopyButtonLabel,
  getCopyStatusMessage,
  isActiveNavigationPath,
  isExternalNavigationLink,
} from "./navigation";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/informacion", label: "Información" },
  { href: "/mapa", label: "Mapa" },
  { href: siteConfig.rulesUrl, label: "Reglas" },
  { href: siteConfig.discordUrl, label: "Discord" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { state: copyState, copy } = useCopyToClipboard({ resetAfter: 2000 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const handleEnter = () => copy(siteConfig.serverIp);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080b0d] border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 h-[88px] flex items-center justify-between">
          <Link href="/" className="flex-shrink-0" aria-label="ParaguayCraft inicio">
            <span className="font-display text-xl md:text-2xl tracking-wide text-[#f1f1ed]">
              <span className="text-[#b6b9bb]">PARAGUAY</span>
              <span className="text-[#d62f2f]">CRAFT</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const external = isExternalNavigationLink(link.href);
              const active = !external && isActiveNavigationPath(pathname, link.href);
              const className = `px-3 py-2 text-sm font-medium transition-colors relative group ${
                active
                  ? "text-[#f1f1ed] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[2px] after:bg-[#d62f2f]"
                  : "text-[#b6b9bb] hover:text-[#f1f1ed]"
              }`;
              const content = (
                <>
                  {link.label}
                  {!active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d62f2f] transition-all duration-200 group-hover:w-6" />
                  )}
                </>
              );

              return external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={className}
                  aria-current={active ? "page" : undefined}
                >
                  {content}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={handleEnter}
              className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider px-5 py-2.5 bg-[#d62f2f] border-2 border-[#991f24] text-[#f1f1ed] hover:bg-[#e04040] transition-colors shadow-[inset_0_-3px_0_rgba(0,0,0,0.3)]"
            >
              <span className="text-base" aria-hidden="true">👑</span>
              {getCopyButtonLabel(copyState)}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {getCopyStatusMessage(copyState, siteConfig.serverIp)}
            </span>
          </div>

          <button
            className="lg:hidden p-3 text-[#b6b9bb] hover:text-[#f1f1ed] min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNavigation
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
