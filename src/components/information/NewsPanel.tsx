import { PanelWrapper } from "./PanelWrapper";
import { NewsCard } from "./NewsCard";
import { newsItems } from "@/data/news";
import { MinecraftButton } from "@/components/ui/MinecraftButton";

export function NewsPanel() {
  const hasNews = newsItems.length > 0;

  return (
    <PanelWrapper title="NOTICIAS RECIENTES">
      {hasNews ? (
        <>
          <div className="flex flex-col gap-4 mb-5">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center">
            <MinecraftButton variant="outline" href="/noticias" className="text-xs">
              VER TODAS LAS NOTICIAS
            </MinecraftButton>
          </div>
        </>
      ) : (
        <p className="text-sm text-[#777e82] text-center py-8">
          Todavía no hay noticias publicadas.
        </p>
      )}
    </PanelWrapper>
  );
}
