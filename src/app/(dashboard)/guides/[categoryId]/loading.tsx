import { Skeleton } from "@/components/ui/skeleton";

export default function GuideCategoryLoading() {
  return (
    <div className="lg mx-auto mb-6 flex flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <Skeleton className="h-4 w-1/4 rounded" /> {/* BreadcrumbComponent */}
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Category Title */}
      <div className="flex justify-center lg:mx-auto lg:w-3/4">
        <div className="my-6 grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 lg:w-[90%] lg:grid-cols-3 xl:grid-cols-4">
          {/* GuideCard */}
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="shadow-xl drop-shadow-xl">
                <Skeleton className="h-6 w-3/4 rounded" /> {/* CardHeader */}
                <Skeleton className="h-20 w-full rounded" /> {/* CardContent */}
              </div>
            ))}
        </div>
      </div>
      <Skeleton className="h-[300px] w-full rounded" /> {/* AdSection */}
    </div>
  );
}
