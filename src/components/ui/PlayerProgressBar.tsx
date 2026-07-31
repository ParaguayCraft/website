interface PlayerProgressBarProps {
  current: number;
  max: number;
  className?: string;
}

export function PlayerProgressBar({ current, max, className = "" }: PlayerProgressBarProps) {
  const pct = Math.min((current / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-[#b6b9bb] mb-1">
        <span>{current} / {max}</span>
      </div>
      <div className="w-full h-3 bg-[#101417] border border-[rgba(255,255,255,0.08)] overflow-hidden">
        <div
          className="h-full bg-[#54d255] transition-all duration-700"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
