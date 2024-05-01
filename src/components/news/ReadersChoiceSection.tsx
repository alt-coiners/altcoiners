import { api } from "@/trpc/server";
import { getHowLongAgo } from "@/utils/helper";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AdSection from "../AdSection";
import NewsList from "./NewsList";

export default async function ReadersChoiceSection() {
  const readersNews = await api.news.getAllNews.query();
  const mainNews = readersNews[0];
  const adPictures = await api.banner.getAll.query();

  return (
    <section className="mx-auto flex flex-col gap-4 px-4 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">
          Reader&apos;s choice
        </h1>
        <div className="flex items-center gap-1 text-sm text-primary">
          <p>More from Crypto News</p>
          <ChevronRight size={12} />
        </div>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
        <Link
          className="flex flex-col lg:w-1/2"
          href={`/dashboard/news/${mainNews?.category.name}/${mainNews?.id}`}
        >
          <div className="relative">
            <Image
              src={mainNews?.picture ?? ""}
              alt={mainNews?.title ?? "Picture"}
              width={400}
              height={200}
              quality={100}
              className="h-48 w-full object-cover lg:h-52 2xl:h-56"
            />
            <div className="absolute bottom-0 h-8 w-full bg-primary-dark"></div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2 pt-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <p>{getHowLongAgo(mainNews?.createdAt ?? new Date())}</p>
                  <p className="text-primary">{mainNews?.category?.name}</p>
                </div>
                <p>{mainNews?.author}</p>
              </div>
              <p className="font-semibold">{mainNews?.title}</p>
              <p className="">{mainNews?.description}</p>
            </div>
            <div className="min-h-full w-10 bg-primary"></div>
          </div>
        </Link>
        <div className="my-2 sm:w-3/4 lg:hidden">
          <NewsList
            articles={readersNews.slice(1, 5)}
            moreUrl="/dashboard/news"
            title="Readers' choice"
            showTitle={false}
          />
        </div>
        <div className="my-2 hidden gap-6 sm:w-3/4 lg:flex lg:w-1/2">
          <NewsList
            articles={readersNews.slice(1, 5)}
            moreUrl="/dashboard/news"
            title="Readers' choice"
            showTitle={false}
          />
          <AdSection
            className="h-full"
            banner={adPictures.find(
              (banner) => banner.name === "READERS_CHOICE",
            )}
          />
        </div>
      </div>
    </section>
  );
}
