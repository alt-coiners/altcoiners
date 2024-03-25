import BreadcrumbComponent from "@/components/breadcrumb";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import { api } from "@/trpc/server";

export default async function News() {
  const news = await api.news.getAllNews.query();

  const breadcrumbs = [
    {
      name: "News",
      url: `/dashboard/news`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
        News
      </p>
      <div className="flex flex-col gap-6">
        <NewsList
          articles={news.slice(0, 4)}
          moreUrl="/dashboard/news"
          title="Crypto News"
          showTitle={false}
        />
        <NewsList
          articles={news.slice(0, 8)}
          moreUrl="/dashboard/news"
          title="Most Popular"
        />
        <NewsListWithImage title="All News" articles={news.slice(0, 6)} />
      </div>
    </div>
  );
}
