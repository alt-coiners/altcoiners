import { cn } from "@/lib/utils";
import { type Exclusive } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes } from "react";
import NewsCard from "../news/NewsCard";
import { Button } from "../ui/button";

interface NewsListWithImageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: Exclusive[];
  moreUrl?: string;
}

export default function ExclusiveList({
  title,
  articles,
  className,
  moreUrl,
}: NewsListWithImageProps) {
  return (
    <div
      className={cn(
        "mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-primary-dark">{title}</p>
        {moreUrl && (
          <Link href={moreUrl} passHref>
            <Button
              variant="ghost"
              className="ml-auto hidden items-center gap-1 text-xs text-primary lg:ml-0 lg:flex"
            >
              <p>More from {title}</p>
              <ChevronRight size={12} />
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:gap-8">
        {articles.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            picture={news.url}
            title={news.title}
            category="Exclusive"
            date={news.createdAt}
          />
        ))}
      </div>
      {moreUrl && (
        <Link href={moreUrl}>
          <Button
            variant="outline"
            className="mx-auto flex w-5/6 items-center gap-1 text-primary lg:hidden"
          >
            <p>More from {title}</p>
            <ChevronRight size={12} />
          </Button>
        </Link>
      )}
    </div>
  );
}
