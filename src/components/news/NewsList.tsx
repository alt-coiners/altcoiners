import { getHowLongAgo } from "@/utils/helper";
import type { Article } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface NewsListProps {
  title?: string;
  articles: Article[];
  moreUrl?: string;
  showTitle?: boolean;
}

export default function NewsList({
  title,
  articles,
  moreUrl,
  showTitle = true,
}: NewsListProps) {
  return (
    <section className="flex flex-col gap-4">
      {!!title?.length && showTitle && (
        <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
      )}
      <div className="flex flex-col gap-3">
        {articles.map((article, index) => (
          <>
            <div key={article.id} className="flex flex-col gap-1">
              <div className="flex gap-1 text-[10px]">
                <p>{getHowLongAgo(article.createdAt)}</p>
                <p>-</p>
                <p className="text-primary">{article.category}</p>
              </div>
              <h2 className="w-[90%] text-pretty text-sm font-semibold">
                {article.title}
              </h2>
            </div>
            {index + 1 !== articles.length && (
              <div className="h-[0.5px] w-full bg-gray-300"></div>
            )}
          </>
        ))}
      </div>
      {moreUrl && (
        <Link href={moreUrl}>
          <Button
            variant="outline"
            className="mx-auto flex w-5/6 items-center gap-1 text-primary"
          >
            <p>More from {title}</p>
            <ChevronRight size={12} />
          </Button>
        </Link>
      )}
    </section>
  );
}
