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
      <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
        Exchanges to Earn
      </p>
      <div className="grid grid-cols-1 gap-4 px-3 py-4 md:grid-cols-2 lg:pb-10 xl:grid-cols-3 xl:gap-6">
        {exchanges.map((exchange, index) => (
          <ExchangeCard key={index} exchange={exchange} />
        ))}
      </div>
      <AdSection
        className="h-56"
        banner={adPictures.find((banner) => banner.name === "ABOVE_FOOTER")}
      />
    </div>
  );
}
