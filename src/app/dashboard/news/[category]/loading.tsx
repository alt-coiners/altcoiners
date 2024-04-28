import { Skeleton } from "@/components/ui/skeleton";

export default function NewsLoading() {
  return (
    <div className="mx-auto flex flex-col gap-6 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <Skeleton className="h-6 w-full rounded" />
      <Skeleton className="h-6 w-full rounded" />
      <div className="lg:flex lg:justify-between lg:gap-10 xl:gap-16">
        <div className="hidden lg:block">
          <section className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4 xl:gap-6">
                <Skeleton className="h-24 w-48 rounded" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="lg:hidden">
            <Skeleton className="h-52 w-full rounded" />
          </div>
          <Skeleton className="h-52 w-full rounded" />
          <Skeleton className="h-[500px]" />
        </div>
      </div>
      <Skeleton className="h-52 w-full rounded" />
      <Skeleton className="h-56" />
    </div>
  );
}
