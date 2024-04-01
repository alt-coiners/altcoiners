import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import ExchangeCard from "@/components/review/ExchangeCard";

const exchangesInfo = [
  {
    name: "Prime XBT",
    url: "https://primexbt.com",
    info: [
      "Multi-asset crypto-based platform particular trading account",
      "Highly customizable user interface",
      "Excellent cryptocurrency and crypto futures trading platform",
    ],
  },
  {
    name: "KuCoin",
    url: "https://kucoin.com",
    info: [
      "Multi-asset crypto-based platform particular trading account",
      "Highly customizable user interface",
      "Excellent cryptocurrency and crypto futures trading platform",
    ],
  },
];

export default function Reviews() {
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
      <div className="grid grid-cols-1 gap-4 px-3 py-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {exchangesInfo.map((exchange, index) => (
          <ExchangeCard key={index} {...exchange} />
        ))}
      </div>
      <AdSection className="h-56" />
    </div>
  );
}
