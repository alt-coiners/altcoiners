import { getHowLongAgo } from "@/utils/helper";
import type { Video, VideoCategory } from "@prisma/client";
import { ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface VideoListProps {
  videos: (Video & { VideoCategory: VideoCategory })[];
}

export default function VideoListCard({ videos }: VideoListProps) {
  return (
    <div className="mx-auto flex flex-col gap-5 bg-primary-dark px-4 py-6 text-white sm:max-w-lg md:max-w-xl lg:max-w-full lg:px-20 xl:px-36 xl:py-6 2xl:px-48">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Videos</h3>
        <Link href={"/dashboard/videos"}>
          <Button variant="ghost" className="hidden items-center gap-1 lg:flex">
            <p className="text-xs">More Videos</p>
            <ChevronRight size={12} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {videos.map((video, index) => (
          <Link
            key={video.id}
            className="duration-30 flex transform flex-col gap-2 transition-transform hover:scale-[1.01]"
            href={`/dashboard/videos/${video.VideoCategory.name}/${video.id}`}
          >
            <div className="relative">
              <Image
                src={video.picture}
                width={350}
                height={200}
                alt={video.VideoCategory.name}
                className="h-[200px] w-full object-cover lg:h-40 xl:h-48"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <PlayCircle size={32} />
              </div>
            </div>
            <div className="flex gap-1 text-[10px] sm:text-xs">
              <p>{getHowLongAgo(video.createdAt)}</p>
              <p>-</p>
              <p className="text-gray-300">{video.VideoCategory.name}</p>
            </div>
            <h2 className="text-sm font-semibold sm:text-base">
              {video.title}
            </h2>
          </Link>
        ))}
      </div>
      <Link href={"/dashboard/news/category/videos"}>
        <Button
          variant="outline"
          className="mx-auto mt-5 flex w-5/6 items-center gap-1 bg-transparent lg:hidden"
        >
          <p>More Videos</p>
          <ChevronRight size={12} />
        </Button>
      </Link>
    </div>
  );
}
