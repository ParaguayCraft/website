import type { ReactNode } from "react";

interface PanelWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PanelWrapper({ title, children, className = "" }: PanelWrapperProps) {
  return (
    <article className={`bg-[#12171a] border border-[rgba(255,255,255,0.08)] ${className}`}>
      <h3 className="font-display text-sm uppercase tracking-wider px-6 py-4 border-b border-[rgba(255,255,255,0.06)] text-[#f1f1ed]">
        {title}
      </h3>
      <div className="px-6 py-5">{children}</div>
    </article>
  );
}
