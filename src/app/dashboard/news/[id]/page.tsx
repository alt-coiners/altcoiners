import BreadcrumbComponent from "@/components/breadcrumb";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import { api } from "@/trpc/server";
import { calculateReadingTime, formatDate } from "@/utils/helper";
import Image from "next/image";

export default async function NewsId({ params }: { params: { id: string } }) {
  const newsArticle = await api.news.getNewsById.query({ id: +params.id });
  const latestNews = await api.news.getLatestNews.query();

  const breadcrumbs = [
    {
      name: "News",
      url: "/dashboard/news",
    },
    {
      name: newsArticle?.title ?? "",
      url: `/dashboard/news/${newsArticle?.id}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-3">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-semibold text-primary-dark">
        {newsArticle?.title}
      </p>
      <div>
        <p className="text-xs text-gray-500">{newsArticle?.author}</p>
        <div className="flex gap-0.5 text-[10px] text-gray-300">
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
        className="mx-auto h-52 w-[90%] object-cover"
      />
      <article
        className="prose px-2 py-6 text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: newsArticle?.content ?? "" }}
      ></article>
      <div className="mb-4 px-2">
        <NewsList
          articles={latestNews}
          moreUrl="/dashboard/news"
          title="Crypto News"
        />
      </div>
      <NewsLetter />
      <NewsListWithImage
        articles={latestNews.slice(0, 2)}
        title="Similar News"
        className="my-6 px-2"
      />
    </div>
  );
}
