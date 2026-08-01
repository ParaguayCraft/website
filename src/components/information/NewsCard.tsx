import Image from "next/image";
import type { NewsItem } from "@/types/news";
import { parseLocalDate } from "@/lib/dates";

interface NewsCardProps {
  item: NewsItem;
}

function ThumbnailFallback({ category }: { category: string }) {
  return (
    <div
      className="w-14 h-14 bg-[#101417] border border-[rgba(255,255,255,0.06)] flex-shrink-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-[#1a1f23] text-[10px] font-display uppercase">
        {category.slice(0, 4)}
      </span>
    </div>
  );
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="group border-b border-[rgba(255,255,255,0.05)] pb-4 last:border-0 last:pb-0">
      <div className="flex gap-3">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={56}
            height={56}
            className="w-14 h-14 object-cover flex-shrink-0 border border-[rgba(255,255,255,0.06)]"
          />
        ) : (
          <ThumbnailFallback category={item.category} />
        )}
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
