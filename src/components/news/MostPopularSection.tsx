import { getHowLongAgo } from "@/utils/helper";
import type { Article } from "@prisma/client";

interface MostPopularSectionProps {
  articles: Article[];
}

export default function MostPopularSection({
  articles,
}: MostPopularSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-primary-dark">Most Popular</h2>
      <div className="flex flex-col gap-5 bg-primary-dark px-3 py-4 text-white">
        {articles.map((article, index) => (
          <>
            <div key={article.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {getHowLongAgo(article.createdAt)}
                </span>
                <span className="text-xs text-gray-200">
                  {article.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </div>
            {index + 1 !== articles.length && (
              <div className="h-[0.5px] w-full bg-gray-400"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
