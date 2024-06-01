import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsLoading() {
  return (
    <div className="mx-auto flex flex-col gap-4 pb-10 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <Skeleton className="h-4 w-1/4 rounded" /> {/* BreadcrumbComponent */}
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Title */}
      <div className="grid grid-cols-1 gap-4 px-3 py-4 md:grid-cols-2 lg:pb-10 xl:grid-cols-3 xl:gap-6">
        {/* ExchangeCard */}
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="shadow-xl">
              <Skeleton className="h-6 w-3/4 rounded" /> {/* CardHeader */}
              <Skeleton className="h-20 w-full rounded" /> {/* CardContent */}
              <Skeleton className="h-8 w-full rounded" /> {/* CardFooter */}
            </div>
          ))}
      </div>
      <Skeleton className="h-[300px] w-full rounded" /> {/* AdSection */}
    </div>
  );
}
