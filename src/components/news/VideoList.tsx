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
    <div className="mx-auto flex max-w-[350px] flex-col gap-4 bg-primary-dark px-4 py-6 text-white">
      <h3 className="text-xl font-semibold">Videos</h3>
      {videos.map((video, index) => (
        <div key={video.id} className="flex flex-col gap-2">
          <div className="relative">
            <Image
              src={video.picture}
              width={350}
              height={200}
              alt={video.category}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <PlayCircle size={32} />
            </div>
          </div>
          <div className="flex gap-1 text-[10px]">
            <p>{getHowLongAgo(video.createdAt)}</p>
            <p>-</p>
            <p className="text-gray-300">{video.category}</p>
          </div>
          <h2 className="text-sm font-semibold">{video.title}</h2>
        </div>
      ))}
      <Link href={"/dashboard/videos"}>
        <Button
          variant="outline"
          className="mx-auto mt-5 flex w-5/6 items-center gap-1 bg-transparent"
        >
          <p>More Videos</p>
          <ChevronRight size={12} />
        </Button>
      </Link>
    </div>
  );
}
