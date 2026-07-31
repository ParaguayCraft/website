interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`font-display text-2xl md:text-3xl text-center text-[#f1f1ed] uppercase tracking-wider ${className}`}
    >
      {children}
    </h2>
  );
}
