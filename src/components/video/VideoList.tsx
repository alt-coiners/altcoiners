import { getHowLongAgo } from "@/utils/helper";
import type { Video } from "@prisma/client";
import { ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="mx-auto my-6 flex flex-col gap-8">
      {videos.map((video, index) => (
        <div key={video.id} className="flex flex-col gap-2">
          <div className="relative">
            <Image
              src={video.picture}
              width={350}
              height={180}
              alt={video.category}
              className="w-full object-cover"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white">
              <PlayCircle size={32} className="" />
            </div>
          </div>
          <div className="flex gap-1 text-[10px]">
            <p>{getHowLongAgo(video.createdAt)}</p>
            <p>-</p>
            <p className="text-primary">{video.category}</p>
          </div>
          <h2 className="text-sm font-semibold text-primary-dark">
            {video.title}
          </h2>
        </div>
      ))}
      {/* TODO: Add pagination */}
      {/* <Link href={"/dashboard/news/category/videos"}>
        <Button
          variant="outline"
          className="mx-auto mt-5 flex w-5/6 items-center gap-1 bg-transparent"
        >
          <p>Add Pagination</p>
          <ChevronRight size={12} />
        </Button>
      </Link> */}
    </div>
  );
}
