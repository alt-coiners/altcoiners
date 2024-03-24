import GuideHomeSection from "@/components/guide/GuideHomeSection";
import NewsCard from "@/components/news/NewsCard";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import ReadersChoiceSection from "@/components/news/ReadersChoiceSection";
import VideoListCard from "@/components/video/VideoListCard";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const newsData = await api.news.getAllNews.query();
  const videosData = await api.video.getAllVideos.query();
  const guideData = await api.guide.getAllGuidesByCategory.query();

  return (
    <div className="my-4 flex flex-col gap-8 px-2 lg:gap-12">
      <NewsListWithImage title="Latest News" articles={newsData} />
      <NewsList
        title="Crypto News"
        articles={newsData}
        moreUrl="/dashboard/news"
      />
      <VideoListCard videos={videosData} />
      <ReadersChoiceSection />
      <NewsLetter />
      <GuideHomeSection guides={guideData} />
    </div>
  );
}
