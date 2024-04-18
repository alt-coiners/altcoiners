import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import ExchangeCard from "@/components/review/ExchangeCard";
import { api } from "@/trpc/server";

export default async function Reviews() {
  const exchanges = await api.exchange.getAllExchanges.query();
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "Reviews",
      url: "/dashboard/reviews",
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 pb-10 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
        Reviews
      </p>
      <div className="grid grid-cols-1 gap-4 px-3 py-4 md:grid-cols-2 lg:pb-10 xl:grid-cols-3 xl:gap-6">
        {exchanges.map((exchange, index) => (
          <ExchangeCard key={index} exchange={exchange} />
        ))}
      </div>
      <AdSection
        className="h-56"
        url={
          adPictures.find((banner) => banner.name === "ABOVE_FOOTER")?.url ?? ""
        }
      />
    </div>
  );
}
