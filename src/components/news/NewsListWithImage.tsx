import { cn } from "@/lib/utils";
import { type Article } from "@prisma/client";
import { type HTMLAttributes } from "react";
import NewsCard from "./NewsCard";

interface NewsListWithImageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: Article[];
}

export default function NewsListWithImage({
  title,
  articles,
  className,
}: NewsListWithImageProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-xl font-semibold">{title}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            picture={news.picture}
            title={news.title}
            category={news.category}
            date={news.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
