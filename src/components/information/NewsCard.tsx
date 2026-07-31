import type { NewsItem } from "@/types/news";
import { parseLocalDate } from "@/lib/dates";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="group border-b border-[rgba(255,255,255,0.05)] pb-4 last:border-0 last:pb-0">
      <div className="flex gap-3">
        <div className="w-14 h-14 bg-[#101417] border border-[rgba(255,255,255,0.06)] flex-shrink-0 flex items-center justify-center text-[#8a8f92] text-[10px]">
          IMG
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-[#d62f2f] font-medium uppercase tracking-wider">
            {item.category}
          </span>
          <h4 className="text-sm font-medium text-[#f5f5f2] truncate group-hover:text-[#3c7bd9] transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-[#8a8f92] mt-0.5 line-clamp-2">{item.summary}</p>
          <time className="text-xs text-[#8a8f92] mt-1 block" dateTime={item.date}>
            {parseLocalDate(item.date).toLocaleDateString("es-PY", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </div>
  );
}
