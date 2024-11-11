import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import { api } from "@/trpc/server";
import { calculateReadingTime, formatDate } from "@/utils/helper";
import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";

export async function generateMetadata(
  props: {
    params: Promise<{ id: string; category: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const news = await api.news.getNewsById({ id: +params.id });
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: news?.title + " - Altcoiners",
    description: news?.title?.slice(0, 50) + "...",
    keywords: "cryptocurrency, news, altcoiners",
    openGraph: {
      title: news?.title + " - Altcoiners",
      description: news?.title?.slice(0, 50) + "...",
      url: `https://altcoiners.com/dashboard/news/${params.category}/${params.id}`,
      images: [news?.picture ?? "", ...previousImages],
    },
    twitter: {
      title: news?.title + " - Altcoiners",
      description: news?.title?.slice(0, 50) + "...",
      card: "summary_large_image",
      site: "@altcoiners",
      images: news?.picture ?? "",
    },
  };
}

export default async function NewsId(props: {
  params: Promise<{ id: string; category: string }>;
}) {
  const params = await props.params;
  const newsArticle = await api.news.getNewsById({ id: +params.id });
  const latestNews = await api.news.getLatestNews();
  const adPictures = await api.banner.getAll();

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
          {/* <BreadcrumbComponent links={breadcrumbs} /> */}
          <p className="text-primary-dark w-[90%] text-pretty text-2xl font-bold lg:text-3xl">
            {newsArticle?.title}
          </p>
          <div>
            <p className="text-sm text-gray-600">{newsArticle?.author}</p>
            <div className="flex gap-0.5 text-xs text-gray-400">
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
            quality={100}
            width={400}
            height={300}
            className="mx-auto w-[90%]"
          />
          <article
            className="prose prose-sm sm:prose-base xl:prose-lg px-2 py-6 text-justify text-gray-700"
            dangerouslySetInnerHTML={{ __html: newsArticle?.content ?? "" }}
          ></article>
          <AdSection
            className="h-[300px] lg:hidden"
            banner={adPictures.find((banner) => banner.name === "ARTICLE_PAGE")}
          />
          <div className="mb-4 px-2 xl:hidden">
            <NewsList
              articles={latestNews.slice(0, 4)}
              moreUrl="/dashboard/news"
              title="Crypto News"
            />
          </div>
          <div className="xl:hidden">
            <NewsLetter />
          </div>
        </div>
        <div className="sticky top-20 mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <NewsList
            articles={latestNews.slice(0, 4)}
            moreUrl="/dashboard/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[600px]"
            banner={adPictures.find(
              (banner) =>
                banner.name === "BETWEEN_NEWS_SECTION_NEWS_ARTICLE_FIRST",
            )}
          />
        </div>
      </div>
      <AdSection
        className="h-[300px] px-2"
        banner={adPictures.find(
          (banner) =>
            banner.name === "BETWEEN_NEWS_SECTION_NEWS_ARTICLE_SECOND",
        )}
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
