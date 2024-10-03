import { getHowLongAgo } from "@/utils/helper";
import { type NewsWithCategory } from "@/utils/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface NewsListProps {
  title?: string;
  articles: NewsWithCategory[];
  moreUrl?: string;
  showTitle?: boolean;
  setMainNews?: (news: NewsWithCategory) => void;
}

export default function NewsList({
  title,
  articles,
  moreUrl,
  showTitle = true,
  setMainNews,
}: NewsListProps) {
  return (
    <section className="flex flex-col gap-4" key={title}>
      {!!title?.length && showTitle && (
        <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
      )}
      <div className="flex flex-col gap-4">
        {articles.map((article, index) => (
          <div key={index}>
            <Link
              href={`/dashboard/news/${article.category.name}/${article.id}`}
              className="flex cursor-pointer flex-col gap-1 hover:bg-slate-100"
              // onMouseEnter={() => {
              //   if (setMainNews) setMainNews(article);
              // }}
            >
              <div className="flex gap-1 text-xs">
                <p>{getHowLongAgo(article.updatedAt)}</p>
                <p>-</p>
                <Link href={`/dashboard/news/${article.category.name}`}>
                  <p className="text-primary">{article.category.name}</p>
                </Link>
              </div>
              <h2 className="w-[90%] text-pretty font-semibold">
                {article.title}
              </h2>
            </Link>
            {index + 1 !== articles.length && (
              <div
                className="h-[0.5px] w-full bg-gray-300"
                key={article.title}
              ></div>
            )}
          </div>
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
    </section>
  );
}
