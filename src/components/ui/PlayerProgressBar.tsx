interface PlayerProgressBarProps {
  current: number;
  /** Maximum players. When null or 0, the bar is hidden. */
  max: number | null;
  className?: string;
}

export function PlayerProgressBar({ current, max, className = "" }: PlayerProgressBarProps) {
  const showBar = max !== null && max > 0;

  const pct = showBar
    ? Math.min(Math.max((current / max!) * 100, 0), 100)
    : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-[#b6b9bb] mb-1">
        <span>
          {current}{showBar ? ` / ${max}` : ""}
        </span>
      </div>
      {showBar && (
        <div className="w-full h-3 bg-[#101417] border border-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="h-full bg-[#54d255] transition-all duration-700"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={max ?? undefined}
          />
        </div>
      )}
    </div>
  );
}
