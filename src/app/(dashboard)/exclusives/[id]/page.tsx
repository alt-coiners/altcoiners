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
  props: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const news = await api.exclusive.getById({ id: +params.id });
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: news?.title + " - Altcoiners",
    description: news?.title.slice(0, 100) + "...",
    keywords: "cryptocurrency, news, altcoiners",
    openGraph: {
      title: news?.title + " - Altcoiners",
      description: news?.title.slice(0, 100) + "...",
      url: `https://altcoiners.com/exclusives/${params.id}`,
      images: [news?.url ?? "", ...previousImages],
    },
    twitter: {
      title: news?.title + " - Altcoiners",
      description: news?.title.slice(0, 100) + "...",
      card: "summary_large_image",
      site: "@altcoiners",
      images: news?.url ?? "",
    },
  };
}

export default async function ExclusivesId(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const newsArticle = await api.exclusive.getById({ id: +params.id });
  const latestNews = await api.news.getLatestNews();
  const adPictures = await api.banner.getAll();

  const breadcrumbs = [
    {
      name: "News",
      url: "/news",
    },
    {
      name: "Exclusives",
      url: `/exclusives`,
    },
    {
      name: newsArticle?.title ?? "",
      url: `/ex/${newsArticle?.id}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex flex-col gap-4 p-3">
          <BreadcrumbComponent links={breadcrumbs} />
          <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
            {newsArticle?.title}
          </p>
          <div>
            <div className="flex gap-0.5 text-xs text-gray-400">
              <p>
                Last updated: {formatDate(newsArticle?.updatedAt ?? new Date())}
              </p>
              <p>|</p>
              <p>{calculateReadingTime(newsArticle?.content ?? "")}</p>
            </div>
          </div>
          <Image
            src={newsArticle?.url ?? ""}
            alt={newsArticle?.title ?? "Article"}
            quality={100}
            width={400}
            height={300}
            className="mx-auto w-[90%]"
          />
          <article
            className="prose prose-sm px-2 py-6 text-justify text-gray-700 sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl"
            dangerouslySetInnerHTML={{ __html: newsArticle?.content ?? "" }}
          ></article>
          <AdSection
            className="h-[300px] lg:hidden"
            banner={adPictures.find(
              (banner) =>
                banner.name === "BETWEEN_NEWS_SECTION_EXCLUSIVE_ARTICLE_FIRST",
            )}
          />
          <div className="mb-4 px-2 xl:hidden">
            <NewsList
              articles={latestNews.slice(0, 4)}
              moreUrl="/news"
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
            articles={latestNews.slice(0, 4)}
            moreUrl="/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[600px]"
            banner={adPictures.find(
              (banner) =>
                banner.name === "BETWEEN_NEWS_SECTION_EXCLUSIVE_ARTICLE_SECOND",
            )}
          />
        </div>
      </div>
      <AdSection
        className="h-[300px] px-2"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_EXCLUSIVE_ARTICLE",
        )}
      />
      <NewsListWithImage
        articles={latestNews.slice(0, 4)}
        title="Similar News"
        className="my-6 px-2"
        moreUrl="/news"
      />
    </div>
  );
}
