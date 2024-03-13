import NewsCard from "@/components/news/NewsCard";
import NewsList from "@/components/news/NewsList";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import VideoListCard from "@/components/video/VideoListCard";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const newsData = await api.news.getAllNews.query();
  const videosData = await api.video.getAllVideos.query();

  return (
    <div className="my-4 flex flex-col gap-4 px-2">
      <NewsListWithImage title="Latest News" articles={newsData} />
      <NewsList
        title="Crypto News"
        articles={newsData}
        moreUrl="/dashboard/news"
      />
      <VideoListCard videos={videosData} />
    </div>
  );
}
