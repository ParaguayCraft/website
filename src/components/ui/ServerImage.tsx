import Image from "next/image";
import type { ReactNode } from "react";

interface ServerImageProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  priority?: boolean;
  className?: string;
}

export function ServerImage({ src, alt, caption, priority = false, className = "" }: ServerImageProps) {
  return (
    <figure className={`${className}`}>
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
      {caption && (
        <figcaption className="mt-2 text-xs text-[#8a8f92] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
