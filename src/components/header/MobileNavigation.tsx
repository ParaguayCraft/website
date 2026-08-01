"use client";

import { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { siteConfig } from "@/config/site";
import {
  getCopyButtonLabel,
  getCopyStatusMessage,
  isActiveNavigationPath,
  isExternalNavigationLink,
} from "./navigation";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNavigation({ open, onClose, links }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const savedOverflowRef = useRef<string>("");
  const focusFrameRef = useRef<number | undefined>(undefined);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { state: copyState, copy } = useCopyToClipboard({ resetAfter: 2000 });

  const handleEnter = () => copy(siteConfig.serverIp);

  const handleClose = useCallback(() => {
    if (focusFrameRef.current !== undefined) {
      cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = undefined;
    }
    const previousFocus = previousFocusRef.current;
    previousFocusRef.current = null;
    previousFocus?.focus();
    onClose();
  }, [onClose]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (open) {
      savedOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      previousFocusRef.current = document.activeElement as HTMLElement;
      if (prefersReducedMotion) {
        closeRef.current?.focus();
      } else {
        focusFrameRef.current = requestAnimationFrame(() => {
          focusFrameRef.current = undefined;
          closeRef.current?.focus();
        });
      }
      window.addEventListener("keydown", handleKeyDown);
    } else {
      if (focusFrameRef.current !== undefined) {
        cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = undefined;
      }
      document.body.style.overflow = savedOverflowRef.current;
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (focusFrameRef.current !== undefined) {
        cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = undefined;
      }
      document.body.style.overflow = savedOverflowRef.current;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown, prefersReducedMotion]);

  // Close after route navigation
  useEffect(() => {
    if (open) onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-dialog"
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
          />
          <motion.div
            ref={panelRef}
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#101417] border-l border-[rgba(255,255,255,0.08)] shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          >
            <div className="flex items-center justify-between px-6 h-[88px] border-b border-[rgba(255,255,255,0.08)]">
              <span className="font-display text-lg text-[#f1f1ed]">
                <span className="text-[#b6b9bb]">PARAGUAY</span>
                <span className="text-[#d62f2f]">CRAFT</span>
              </span>
              <button
                ref={closeRef}
                onClick={handleClose}
                className="p-3 text-[#b6b9bb] hover:text-[#f1f1ed] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-8 flex flex-col gap-2" aria-label="Menú móvil">
              {links.map((link, i) => {
                const external = isExternalNavigationLink(link.href);
                const active = !external && isActiveNavigationPath(pathname, link.href);
                const className = `block px-4 py-3 text-lg font-medium transition-colors ${
                  active
                    ? "bg-[rgba(214,47,47,0.15)] text-[#d62f2f]"
                    : "text-[#b6b9bb] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#f1f1ed]"
                }`;
                const content = link.label;

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.15,
                      delay: prefersReducedMotion ? 0 : 0.05 + i * 0.03,
                    }}
                  >
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className={className}
                        aria-current={active ? "page" : undefined}
                      >
                        {content}
                      </Link>
                    )}
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
                👑 {getCopyButtonLabel(copyState)}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {getCopyStatusMessage(copyState, siteConfig.serverIp)}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
