"use client";

import { getHowLongAgo } from "@/utils/helper";
import { type NewsWithCategory } from "@/utils/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MostPopularSection from "./news/MostPopularSection";
import NewsList from "./news/NewsList";

interface DashboardMainSectionProps {
  newsData: NewsWithCategory[];
}

export default function DashboardMainSection({
  newsData,
}: DashboardMainSectionProps) {
  const [mainNews, setMainNews] = useState<NewsWithCategory | undefined>(
    newsData[0],
  );

  return (
    <div className="mx-auto hidden max-w-3xl gap-1 lg:flex xl:max-w-5xl xl:gap-4 xl:py-6 2xl:max-w-7xl 2xl:gap-8">
      <div className="flex w-1/4 flex-col gap-4">
        <h2 className="text-xl font-bold text-primary-dark">
          Latest Crypto News
        </h2>
        <NewsList articles={newsData.slice(0, 5)} setMainNews={setMainNews} />
      </div>
      <div className="flex w-1/2 flex-col gap-4">
        <Link
          className="flex items-center justify-end gap-1 py-2 text-xs text-primary"
          href="/dashboard/news"
        >
          <p>More from Crypto News</p>
          <ChevronRight size={12} />
        </Link>
        <Link
          className="flex flex-col"
          href={`/dashboard/news/${mainNews?.category.name}/${mainNews?.id}`}
        >
          <div className="relative">
            <Image
              src={mainNews?.picture ?? "/images/placeholder.png"}
              alt={mainNews?.title ?? "Placeholder"}
              quality={100}
              width={500}
              height={300}
              className="aspect-video w-full"
            />
            <div className="absolute bottom-0 h-8 w-full bg-primary-dark"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-full w-8 bg-primary"></div>
            <div className="flex flex-col gap-1 pt-2 xl:w-5/6">
              <div className="flex w-full items-center justify-between text-[10px] text-gray-400 lg:text-xs">
                <div className="flex items-center gap-1">
                  <p>{getHowLongAgo(mainNews?.createdAt ?? new Date())}</p>
                  <p className="text-primary">{mainNews?.category.name}</p>
                </div>
                <p>{mainNews?.author}</p>
              </div>
              <h3 className="font-semibold">{mainNews?.title}</h3>
              <p className="text-sm">{mainNews?.description}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-1/4">
        <MostPopularSection articles={newsData.slice(0, 5)} />
      </div>
    </div>
  );
}
