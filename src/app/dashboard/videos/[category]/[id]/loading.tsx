import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function VideoIdLoading() {
  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex w-full flex-col gap-4 p-3">
          <Skeleton className="h-[20px] w-[100px] rounded-full" />
          <Skeleton className="h-6 w-[90%] rounded" />
          <Skeleton className="mx-auto my-6 aspect-video w-[90%] rounded lg:mt-10 xl:w-full" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-56 lg:hidden" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-full rounded" />
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <Skeleton className="h-6 w-full rounded" />
        </div>
      </div>
      <Skeleton className="mb-8 h-40 px-2" />
    </div>
  );
}
