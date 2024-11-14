import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import ExclusiveList from "@/components/exclusive/ExclusiveList";
import ExclusiveMainSection from "@/components/exclusive/ExclusiveMainSection";
import NewsList from "@/components/news/NewsList";
import { api } from "@/trpc/server";

export default async function Exclusives() {
  const news = await api.news.getAllNews();
  const exclusives = await api.exclusive.getAll();
  const adPictures = await api.banner.getAll();

  const breadcrumbs = [
    {
      name: "Exclusives",
      url: `/exclusives`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-6 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
        Exclusives
      </p>
      <div className="lg:flex lg:justify-between lg:gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <ExclusiveMainSection articles={exclusives.slice(0, 5)} />
        </div>
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="lg:hidden">
            <NewsList
              articles={news.slice(0, 4)}
              moreUrl="/news"
              title="Crypto News"
              showTitle={false}
            />
          </div>
          <NewsList
            articles={news.slice(0, 5)}
            moreUrl="/news"
            title="Most Popular"
          />
          <AdSection
            className="h-[500px]"
            banner={adPictures.find(
              (banner) => banner.name === "EXCLUSIVE_ARTICLE_PAGE",
            )}
          />
        </div>
      </div>
      <ExclusiveList title="All News" articles={exclusives} />
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_EXCLUSIVE",
        )}
      />
    </div>
  );
}
