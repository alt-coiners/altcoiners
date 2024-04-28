import { Skeleton } from "@/components/ui/skeleton";

export default function VideosCategoryLoading() {
  return (
    <div className="mx-auto flex flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <Skeleton className="h-4 w-1/4 rounded" /> {/* BreadcrumbComponent */}
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Title */}
      <Skeleton className="h-20 w-full rounded" /> {/* Description */}
      <div className="mx-auto my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* VideoList */}
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-36 w-full rounded" />{" "}
              {/* Video Thumbnail */}
              <Skeleton className="h-4 w-1/4 rounded" /> {/* Video Info */}
              <Skeleton className="h-6 w-1/2 rounded" /> {/* Video Title */}
            </div>
          ))}
      </div>
      <Skeleton className="h-56 w-full rounded" /> {/* AdSection */}
    </div>
  );
}
