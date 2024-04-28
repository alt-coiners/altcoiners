import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="my-4 flex flex-col gap-8 px-2 lg:gap-12">
      <Skeleton className="h-16 w-full rounded" /> {/* CoinPricesCarousel */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 xl:max-w-5xl 2xl:max-w-7xl">
        <Skeleton className="h-4 w-1/4 rounded" /> {/* Title */}
        <Skeleton className="h-52 w-full rounded" /> {/* Carousel */}
      </div>
      <Skeleton className="h-52 w-full rounded" /> {/* DashboardMainSection */}
      <div className="mx-auto hidden max-w-3xl gap-1 lg:flex xl:max-w-5xl xl:gap-4 xl:py-6 2xl:max-w-7xl 2xl:gap-8">
        <div className="flex w-1/4 flex-col gap-4">
          <Skeleton className="h-4 w-1/4 rounded" /> {/* Title */}
          <Skeleton className="h-52 w-full rounded" /> {/* NewsList */}
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <Skeleton className="h-4 w-1/4 rounded" /> {/* Link */}
          <Skeleton className="h-52 w-full rounded" /> {/* MainNews */}
        </div>
        <div className="w-1/4">
          <Skeleton className="h-52 w-full rounded" />{" "}
          {/* MostPopularSection */}
        </div>
      </div>
      <Skeleton className="h-16 w-full rounded" /> {/* AdSlider */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "Crypto News" */}
      <div className="lg:hidden">
        <Skeleton className="h-52 w-full rounded" />{" "}
        {/* NewsListWithImage "Latest News" */}
      </div>
      <div className="lg:hidden">
        <Skeleton className="h-52 w-full rounded" /> {/* MostPopularSection */}
      </div>
      <Skeleton className="h-64 w-full rounded lg:hidden" /> {/* AdSection */}
      <Skeleton className="h-52 w-full rounded" /> {/* VideoListCard */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "Altcoin News" */}
      <Skeleton className="h-36 w-full rounded" /> {/* AdSection */}
      <Skeleton className="h-52 w-full rounded" /> {/* ReadersChoiceSection */}
      <Skeleton className="h-52 w-full rounded" /> {/* NewsLetter */}
      <Skeleton className="h-64 w-full rounded" /> {/* GuideHomeSection */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "Bitcoin News" */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "Ethereum News" */}
      <Skeleton className="h-64 w-full rounded" /> {/* AdSection */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "NFT News" */}
      <Skeleton className="h-52 w-full rounded" />{" "}
      {/* NewsListWithImage "All News" */}
      <Skeleton className="h-400px w-full rounded lg:h-56" /> {/* AdSection */}
    </div>
  );
}
