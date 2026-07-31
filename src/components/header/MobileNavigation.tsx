"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { siteConfig } from "@/config/site";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNavigation({ open, onClose, links }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { state: copyState, copy } = useCopyToClipboard({ resetAfter: 2000 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleEnter = () => copy(siteConfig.serverIp);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.div
            ref={panelRef}
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#101417] border-l border-[rgba(255,255,255,0.08)] shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between px-6 h-[88px] border-b border-[rgba(255,255,255,0.08)]">
              <span className="font-display text-lg text-[#f1f1ed]">
                <span className="text-[#b6b9bb]">PARAGUAY</span>
                <span className="text-[#d62f2f]">CRAFT</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 text-[#b6b9bb] hover:text-[#f1f1ed]"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-8 flex flex-col gap-2" aria-label="Menú móvil">
              {links.map((link, i) => {
                const active = link.href.startsWith("http") ? false : isActive(link.href);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15, delay: 0.05 + i * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block px-4 py-3 text-lg font-medium transition-colors ${
                        active
                          ? "bg-[rgba(214,47,47,0.15)] text-[#d62f2f]"
                          : "text-[#b6b9bb] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#f1f1ed]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="px-6 py-6 border-t border-[rgba(255,255,255,0.08)]">
              <button
                type="button"
                onClick={handleEnter}
                className="block w-full text-center font-display text-sm uppercase tracking-wider px-6 py-3 bg-[#d62f2f] border-2 border-[#991f24] text-[#f1f1ed] hover:bg-[#e04040] transition-colors shadow-[inset_0_-3px_0_rgba(0,0,0,0.3)]"
              >
                👑 {copyState === "copied" ? "IP COPIADA" : "ENTRAR"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
