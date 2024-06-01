import { Skeleton } from "@/components/ui/skeleton";

export default function GuideLoading() {
  return (
    <div className="mx-auto mb-6 flex w-full flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
      <Skeleton className="h-6 w-1/4 rounded" /> {/* Title */}
      <div className="mx-auto flex flex-col gap-4 px-6 xl:gap-6">
        {/* GuideCategory */}
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-1/4 rounded" /> {/* Category Title */}
              <div className="flex">
                <div className="my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                  {/* Guide */}
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton
                        key={j}
                        className="h-full rounded-lg bg-white px-4 py-6 shadow-lg lg:py-8"
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Skeleton className="h-[300px] w-full rounded" /> {/* AdSection */}
    </div>
  );
}
