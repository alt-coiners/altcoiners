import { Skeleton } from "@/components/ui/skeleton";

export default function PodcastsLoading() {
  return (
    <div className="mx-auto flex flex-col gap-6 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <Skeleton className="h-4 w-1/4 rounded" /> {/* BreadcrumbComponent */}
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Title */}
      <div className="lg:flex lg:justify-between lg:gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <div className="flex flex-col gap-8">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-36 w-[80%] rounded" />{" "}
                  {/* Podcast iframe */}
                  <div className="flex w-[80%] flex-col gap-1">
                    <Skeleton className="h-4 w-1/4 rounded" />{" "}
                    {/* Podcast Info */}
                    <Skeleton className="h-6 w-1/2 rounded" />{" "}
                    {/* Podcast Title */}
                    <Skeleton className="h-4 w-3/4 rounded" />{" "}
                    {/* Podcast Description */}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="lg:hidden">
            <Skeleton className="h-36 w-full rounded" /> {/* NewsList */}
          </div>
          <Skeleton className="h-36 w-full rounded" /> {/* NewsList */}
          <Skeleton className="h-[300px] w-full rounded" /> {/* AdSection */}
        </div>
      </div>
      <Skeleton className="h-[300px] w-full rounded" />{" "}
      {/* NewsListWithImage */}
      <Skeleton className="h-[300px] w-full rounded" /> {/* AdSection */}
    </div>
  );
}
