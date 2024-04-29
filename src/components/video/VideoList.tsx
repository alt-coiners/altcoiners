import { getHowLongAgo } from "@/utils/helper";
import type { Video, VideoCategory } from "@prisma/client";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoListProps {
  videos: (Video & { VideoCategory: VideoCategory })[];
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="mx-auto my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          className="flex flex-col gap-2"
          href={`/dashboard/videos/${video.VideoCategory.name}/${video.id}`}
        >
          <div className="relative">
            <Image
              src={video.picture}
              width={350}
              height={180}
              quality={100}
              alt={video.VideoCategory.name}
              className="w-full object-cover"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white">
              <PlayCircle size={32} className="" />
            </div>
          </div>
          <div className="flex gap-1 text-[10px]">
            <p>{getHowLongAgo(video.createdAt)}</p>
            <p>-</p>
            <p className="text-primary">{video.VideoCategory.name}</p>
          </div>
          <h2 className="text-sm font-semibold text-primary-dark">
            {video.title}
          </h2>
        </Link>
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
