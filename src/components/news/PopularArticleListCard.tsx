import { getHowLongAgo } from "@/utils/helper";
import type { Article } from "@prisma/client";

interface ArticleListCardProps {
  articles: Article[];
}

export default function PopularArticleListCard({
  articles,
}: ArticleListCardProps) {
  return (
    <div
      className="mx-auto flex max-w-[350px] flex-col gap-4 bg-primary-dark px-4 pb-6 pt-12 text-white"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 90%)",
      }}
    >
      {articles.map((article, index) => (
        <div key={article.id} className="flex flex-col gap-2">
          <div className="flex gap-1 text-[10px]">
            <p>{getHowLongAgo(article.createdAt)}</p>
            <p>-</p>
            <p className="text-gray-300">{article.category}</p>
          </div>
          <h2 className="font-semibold">{article.title}</h2>
          {index + 1 !== articles.length && (
            <div className="mb-2 h-[1px] w-full bg-gray-500"></div>
          )}
        </div>
      ))}
    </div>
  );
}
