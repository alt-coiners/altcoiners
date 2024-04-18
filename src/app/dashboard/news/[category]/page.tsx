import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import BigNewsSection from "@/components/news/BigNewsSection";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import { api } from "@/trpc/server";

export default async function CategoryNews({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const news = await api.news.getNewsByCategoryName.query({
    categoryName: category,
  });
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "News",
      url: `/dashboard/news`,
    },
    {
      name: category + " News",
      url: `/dashboard/news/${category}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-6 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
        {category} News
      </p>
      <div className="lg:flex lg:justify-between lg:gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <BigNewsSection articles={news.slice(0, 5)} />
        </div>
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="lg:hidden">
            <NewsList
              articles={news.slice(0, 4)}
              moreUrl="/dashboard/news"
              title="Crypto News"
              showTitle={false}
            />
          </div>
          <NewsList
            articles={news.slice(0, 5)}
            moreUrl="/dashboard/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[500px]"
            url={
              adPictures.find(
                (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
              )?.url ?? ""
            }
          />
        </div>
      </div>
      <NewsListWithImage title="All News" articles={news} />
      <AdSection
        className="h-56"
        url={
          adPictures.find((banner) => banner.name === "ABOVE_FOOTER")?.url ?? ""
        }
      />
    </div>
  );
}
