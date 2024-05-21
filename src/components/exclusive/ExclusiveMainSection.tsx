import { getHowLongAgo } from "@/utils/helper";
import type { Exclusive } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ExclusiveMainSectionProps {
  articles: Exclusive[];
}

export default function ExclusiveMainSection({
  articles,
}: ExclusiveMainSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          className="flex gap-4 xl:gap-6"
          href={`/dashboard/exclusives/${article.id}`}
        >
          <Image
            src={article.url}
            alt={article.title}
            className="h-full "
            width={200}
            height={100}
            quality={100}
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 text-xs">
              <p>{getHowLongAgo(article.createdAt)}</p>
              <p>-</p>
              <p className="text-primary">Exclusives</p>
            </div>
            <h2 className="w-[90%] text-pretty  font-semibold xl:text-xl 2xl:text-lg">
              {article.title}
            </h2>
            <p className="2xl: text-xs xl:text-sm">{article.description}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
