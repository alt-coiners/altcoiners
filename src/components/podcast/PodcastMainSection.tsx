import { getHowLongAgo } from "@/utils/helper";
import type { Podcast } from "@prisma/client";

interface PodcastMainSectionProps {
  podcasts: Podcast[];
}

export default function PodcastMainSection({
  podcasts,
}: PodcastMainSectionProps) {
  return (
    <section className="flex flex-col gap-8">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="flex flex-col gap-4">
          <iframe
            width="560"
            height="315"
            src={podcast.url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-[80%]"
          ></iframe>
          <div className="flex w-[80%] flex-col gap-1">
            <div className="flex gap-1 text-[10px]">
              <p>{getHowLongAgo(podcast.createdAt)}</p>
              <p>-</p>
              <p className="text-primary">Podcast</p>
            </div>
            <h2 className="w-[90%] text-pretty text-sm font-semibold xl:text-base 2xl:text-lg">
              {podcast.title}
            </h2>
            <p className="text-[10px] xl:text-xs 2xl:text-sm">
              {podcast.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
