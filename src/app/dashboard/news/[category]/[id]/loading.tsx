import { Skeleton } from "@/components/ui/skeleton";

export default function NewsIdLoading() {
  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex w-full flex-col gap-4 p-3">
          <Skeleton className="h-[20px] w-[100px] rounded-full" />
          <Skeleton className="h-6 w-[90%] rounded" />
          <Skeleton className="h-4 w-[90%] rounded" />
          <Skeleton className="h-4 w-[90%] rounded" />
          <Skeleton className="mx-auto h-52 w-[90%] rounded sm:h-60 xl:w-full" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-[300px] lg:hidden" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-full rounded" />
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-[600px]" />
          <Skeleton className="h-6 w-full rounded" />
        </div>
      </div>
      <Skeleton className="h-[300px] px-2" />
      <Skeleton className="h-6 w-full rounded" />
    </div>
  );
}
