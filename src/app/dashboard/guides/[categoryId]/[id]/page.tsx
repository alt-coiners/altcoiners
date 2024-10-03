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
  {
    params,
  }: {
    params: { id: string; category: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const guide = await api.guide.getGuideById.query({ id: +params.id });
  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: guide?.title + " - Altcoiners",
    description: guide?.title?.slice(0, 50) + "...",
    keywords: "cryptocurrency, news, altcoiners",
    openGraph: {
      title: guide?.title + " - Altcoiners",
      description: guide?.title?.slice(0, 50) + "...",
      url: `https://altcoiners.com/dashboard/guide/${params.category}/${params.id}`,
      images: [guide?.picture ?? "", ...previousImages],
    },
    twitter: {
      title: guide?.title + " - Altcoiners",
      description: guide?.title?.slice(0, 50) + "...",
      card: "summary_large_image",
      site: "@altcoiners",
      images: guide?.picture ?? "",
    },
  };
}

export default async function GuideId({
  params,
}: {
  params: { id: string; categoryId: string };
}) {
  const guideData = await api.guide.getGuideById.query({ id: +params.id });
  const latestNews = await api.news.getLatestNews.query();
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "News",
      url: "/dashboard/news",
    },
    {
      name: guideData?.category.name ?? "",
      url: `/dashboard/guide/${params.categoryId}`,
    },
    {
      name: guideData?.title ?? "",
      url: `/dashboard/guide/${guideData?.id}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex flex-col gap-4 p-3">
          <BreadcrumbComponent links={breadcrumbs} />
          <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
            {guideData?.title}
          </p>
          <div>
            <div className="flex gap-0.5 text-xs text-gray-400">
              <p>
                Last updated: {formatDate(guideData?.updatedAt ?? new Date())}
              </p>
              <p>|</p>
              <p>{calculateReadingTime(guideData?.content ?? "")}</p>
            </div>
          </div>
          <Image
            src={guideData?.picture ?? ""}
            alt={guideData?.title ?? "Article"}
            quality={100}
            width={400}
            height={300}
            className="mx-auto w-[90%]"
          />
          <article
            className="prose prose-sm px-2 py-6 text-justify text-gray-700 sm:prose-base xl:prose-lg"
            dangerouslySetInnerHTML={{ __html: guideData?.content ?? "" }}
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
            A
          </div>
          <div className="xl:hidden">
            <NewsLetter />
          </div>
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <NewsList
            articles={latestNews.slice(0, 4)}
            moreUrl="/dashboard/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[600px]"
            banner={adPictures.find(
              (banner) => banner.name === "GUIDE_ARTICLE_PAGE",
            )}
          />
        </div>
      </div>
      <AdSection
        className="h-[300px] px-2"
        banner={adPictures.find(
          (banner) => banner.name === "BETWEEN_NEWS_SECTION_GUIDE",
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
