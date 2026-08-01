interface PlayerProgressBarProps {
  current: number;
  /** Maximum players. When null or 0, the bar is hidden. */
  max: number | null;
  className?: string;
}

export function PlayerProgressBar({ current, max, className = "" }: PlayerProgressBarProps) {
  const safeCurrent = Number.isFinite(current) ? Math.max(current, 0) : 0;
  const safeMax =
    max !== null && Number.isFinite(max) && max > 0 ? max : null;
  const ariaCurrent =
    safeMax !== null ? Math.min(safeCurrent, safeMax) : safeCurrent;
  const showBar = safeMax !== null;
  const pct = safeMax === null ? 0 : (ariaCurrent / safeMax) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-[#b6b9bb] mb-1">
        <span>
          {ariaCurrent}{showBar ? ` / ${safeMax}` : ""}
        </span>
      </div>
      {showBar && (
        <div className="w-full h-3 bg-[#101417] border border-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="h-full bg-[#54d255] transition-all duration-700"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={ariaCurrent}
            aria-valuemin={0}
            aria-valuemax={safeMax ?? undefined}
          />
        </div>
      )}
    </div>
  );
}
