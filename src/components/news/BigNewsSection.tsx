import { getHowLongAgo } from "@/utils/helper";
import { type NewsWithCategory } from "@/utils/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface BigNewsSectionProps {
  articles: NewsWithCategory[];
}

export default function BigNewsSection({ articles }: BigNewsSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      {articles.map((article) => (
        <div key={article.id} className="flex gap-4 xl:gap-6">
          <Image
            src={article.picture}
            alt={article.title}
            className="h-full object-cover"
            width={200}
            height={100}
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 text-[10px]">
              <p>{getHowLongAgo(article.createdAt)}</p>
              <p>-</p>
              <p className="text-primary">{article.category.name}</p>
            </div>
            <h2 className="w-[90%] text-pretty text-sm font-semibold xl:text-base 2xl:text-lg">
              {article.title}
            </h2>
            <p className="text-[10px] xl:text-xs 2xl:text-sm">
              {article.description}
            </p>
            <Link
              href={`/dashboard/news/${article.category.name}/${article.id}`}
            >
              <Button
                variant={"ghost"}
                className="items-center px-0 text-[10px] xl:text-xs 2xl:text-sm"
              >
                <p>Read More</p>
                <ChevronRight size={12} />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
