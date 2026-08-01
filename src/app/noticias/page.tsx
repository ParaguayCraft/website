import type { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
import { PanelWrapper } from "@/components/information/PanelWrapper";
import { newsItems } from "@/data/news";
import type { NewsItem } from "@/types/news";
import { parseLocalDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Noticias | ParaguayCraft",
  description: "Noticias y novedades del servidor ParaguayCraft.",
};

function NewsArticle({ item }: { item: NewsItem }) {
  return (
    <article className="border-b border-[rgba(255,255,255,0.05)] py-5 first:pt-0 last:border-0 last:pb-0">
      <div className="flex gap-4">
        <div
          className="w-16 h-16 bg-[#101417] border border-[rgba(255,255,255,0.06)] flex-shrink-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-[#1a1f23] text-[10px] font-display uppercase">
            {item.category.slice(0, 4)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-[#d62f2f] font-medium uppercase tracking-wider">
            {item.category}
          </span>
          <h3 className="text-base font-medium text-[#f5f5f2] mt-1">
            {item.title}
          </h3>
          <p className="text-sm text-[#b6b9bb] mt-2 leading-relaxed">
            {item.summary}
          </p>
          <time
            className="text-xs text-[#8a8f92] mt-3 block"
            dateTime={item.date}
          >
            {parseLocalDate(item.date).toLocaleDateString("es-PY", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}

export default function NoticiasPage() {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const hasNews = sorted.length > 0;

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-display text-2xl md:text-3xl text-[#f1f1ed] uppercase tracking-wider mb-8">
          Noticias
        </h1>

        <PanelWrapper title="TODAS LAS NOTICIAS">
          {hasNews ? (
            <div className="flex flex-col">
              {sorted.map((item) => (
                <NewsArticle key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8a8f92] text-center py-12">
              Todavía no hay noticias publicadas.
            </p>
          )}
        </PanelWrapper>
      </div>
    </PageLayout>
  );
}
