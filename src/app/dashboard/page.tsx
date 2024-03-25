import GuideHomeSection from "@/components/guide/GuideHomeSection";
import MostPopularSection from "@/components/news/MostPopularSection";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import ReadersChoiceSection from "@/components/news/ReadersChoiceSection";
import { Button } from "@/components/ui/button";
import VideoListCard from "@/components/video/VideoListCard";
import { api } from "@/trpc/server";
import { getHowLongAgo } from "@/utils/helper";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default async function Dashboard() {
  const newsData = await api.news.getAllNews.query();
  const videosData = await api.video.getAllVideos.query();
  const guideData = await api.guide.getAllGuidesByCategory.query();
  const mainNews = newsData[0];

  return (
    <div className="my-4 flex flex-col gap-8 px-2 lg:gap-12 lg:px-0">
      <div className="mx-auto hidden max-w-3xl gap-1 lg:flex xl:max-w-5xl xl:gap-4 xl:py-6 2xl:max-w-7xl 2xl:gap-8">
        <div className="flex w-1/4 flex-col gap-4">
          <h2 className="text-xl font-bold text-primary-dark">
            Latest Crypto News
          </h2>
          <NewsList articles={newsData.slice(0, 5)} />
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <div className="flex items-center justify-end gap-1 py-2 text-xs text-primary">
            <p>More from Crypto News</p>
            <ChevronRight size={12} />
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <Image
                src={mainNews?.picture ?? "/images/placeholder.png"}
                alt={mainNews?.title ?? "Placeholder"}
                width={500}
                height={300}
                className="h-48 w-full object-cover xl:h-52 2xl:h-56"
              />
              <div className="absolute bottom-0 h-8 w-full bg-primary-dark"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-full w-8 bg-primary"></div>
              <div className="flex flex-col gap-1 pt-2 xl:w-5/6">
                <div className="flex w-full items-center justify-between text-[10px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <p>{getHowLongAgo(mainNews?.createdAt ?? new Date())}</p>
                    <p className="text-primary">{mainNews?.category}</p>
                  </div>
                  <p>{mainNews?.author}</p>
                </div>
                <h3 className="font-semibold">{mainNews?.title}</h3>
                <p className="text-sm">{mainNews?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <MostPopularSection articles={newsData.slice(0, 5)} />
        </div>
      </div>
      <NewsListWithImage
        title="Crypto News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news"
      />
      <div className="lg:hidden">
        <NewsListWithImage
          title="Latest News"
          articles={newsData.slice(0, 8)}
          moreUrl="/dashboard/news"
        />
      </div>
      <div className="lg:hidden">
        <MostPopularSection articles={newsData.slice(0, 8)} />
      </div>
      <VideoListCard videos={videosData.slice(0, 4)} />
      <NewsListWithImage
        title="Altcoin News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news"
      />
      <ReadersChoiceSection />
      <NewsLetter />
      <GuideHomeSection guides={guideData} />
    </div>
  );
}
