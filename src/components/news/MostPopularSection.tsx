import { getHowLongAgo } from "@/utils/helper";
import { type NewsWithCategory } from "@/utils/types";
import Link from "next/link";

interface MostPopularSectionProps {
  articles: NewsWithCategory[];
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
            <Link
              key={article.id}
              className="flex cursor-pointer flex-col gap-2"
              href={`/dashboard/news/${article.category.name}/${article.id}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {getHowLongAgo(article.createdAt)}
                </span>
                <span className="text-xs text-gray-200">
                  {article.category.name}
                </span>
              </div>
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </Link>
            {index + 1 !== articles.length && (
              <div className="h-[0.5px] w-full bg-gray-400"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
