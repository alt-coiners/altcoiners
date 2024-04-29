import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import { api } from "@/trpc/server";
import { calculateReadingTime, formatDate } from "@/utils/helper";
import Image from "next/image";

export default async function NewsId({
  params,
}: {
  params: { id: string; category: string };
}) {
  const newsArticle = await api.news.getNewsById.query({ id: +params.id });
  const latestNews = await api.news.getLatestNews.query();
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "News",
      url: "/dashboard/news",
    },
    {
      name: params.category ?? "",
      url: `/dashboard/news/${params.category}`,
    },
    {
      name: newsArticle?.title ?? "",
      url: `/dashboard/news/${newsArticle?.id}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex flex-col gap-4 p-3">
          <BreadcrumbComponent links={breadcrumbs} />
          <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
            {newsArticle?.title}
          </p>
          <div>
            <p className="text-xs text-gray-600">{newsArticle?.author}</p>
            <div className="flex gap-0.5 text-[10px] text-gray-400">
              <p>
                Last updated: {formatDate(newsArticle?.updatedAt ?? new Date())}
              </p>
              <p>|</p>
              <p>{calculateReadingTime(newsArticle?.content ?? "")}</p>
            </div>
          </div>
          <Image
            src={newsArticle?.picture ?? ""}
            alt={newsArticle?.title ?? "Article"}
            width={400}
            height={300}
            className="mx-auto h-52 w-[90%] object-cover sm:h-60 xl:w-full"
          />
          <article
            className="prose prose-sm px-2 py-6 text-justify text-gray-700 sm:prose-base lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: newsArticle?.content ?? "" }}
          ></article>
          <AdSection
            className="h-56 lg:hidden"
            url={
              adPictures.find((banner) => banner.name === "ARTICLE_PAGE")
                ?.url ?? ""
            }
          />
          <div className="mb-4 px-2 xl:hidden">
            <NewsList
              articles={latestNews}
              moreUrl="/dashboard/news"
              title="Crypto News"
            />
            A
          </div>
          <div className="xl:hidden">
            <NewsLetter />
          </div>
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <NewsList
            articles={latestNews}
            moreUrl="/dashboard/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[600px]"
            url={
              adPictures.find(
                (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
              )?.url ?? ""
            }
          />
          <NewsList
            articles={latestNews}
            moreUrl="/dashboard/news"
            title="Similar News"
          />
        </div>
      </div>
      <AdSection
        className="h-56 px-2"
        url={
          adPictures.find(
            (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
          )?.url ?? ""
        }
      />
      <NewsListWithImage
        articles={latestNews.slice(0, 4)}
        title="Similar News"
        className="my-6 px-2"
        moreUrl="/dashboard/news"
      />
    </div>
  );
}
