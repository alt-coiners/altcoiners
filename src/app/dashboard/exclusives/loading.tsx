import { Skeleton } from "@/components/ui/skeleton";

export default function ExclusivesLoading() {
  return (
    <div className="mx-auto flex flex-col gap-6 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <Skeleton className="h-4 w-1/4 rounded" /> {/* BreadcrumbComponent */}
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Title */}
      <div className="lg:flex lg:justify-between lg:gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <Skeleton className="h-36 w-full rounded" />{" "}
          {/* ExclusiveMainSection */}
        </div>
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="lg:hidden">
            <Skeleton className="h-36 w-full rounded" /> {/* NewsList */}
          </div>
          <Skeleton className="h-36 w-full rounded" /> {/* NewsList */}
        </div>
      </div>
      <Skeleton className="h-56 w-full rounded" /> {/* AdSection */}
      <Skeleton className="h-56 w-full rounded" /> {/* AdSection */}
    </div>
  );
}
