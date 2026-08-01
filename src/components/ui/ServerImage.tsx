import Image from "next/image";
import type { ReactNode } from "react";

interface ServerImageProps {
  src?: string;
  alt: string;
  caption?: ReactNode;
  priority?: boolean;
  className?: string;
}

export function ServerImage({ src, alt, caption, priority = false, className = "" }: ServerImageProps) {
  return (
    <figure className={`${className}`}>
      {src ? (
        <div className="aspect-video relative overflow-hidden bg-[#101417] border border-[rgba(255,255,255,0.06)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
          />
        </div>
      ) : (
        <div
          className="aspect-video bg-[#101417] border border-[rgba(255,255,255,0.06)] flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1a1f23]">
            <rect x="4" y="4" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 38l10-10 6 6 10-10 14 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-[#8a8f92] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
