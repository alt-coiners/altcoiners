import NewsCard from "@/components/news/NewsCard";
import NewsList from "@/components/news/NewsList";
import VideoList from "@/components/news/VideoList";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const newsData = await api.news.getAllNews.query();
  const videosData = await api.video.getAllVideos.query();

  return (
    <div className="my-4 flex flex-col gap-4 px-2">
      <div>
        <p className="mb-4 text-xl font-semibold">All News</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              picture={news.picture}
              title={news.title}
              category={news.category}
              date={news.createdAt}
            />
          ))}
        </div>
      </div>
      <NewsList
        title="Crypto News"
        articles={newsData}
        moreUrl="/dashboard/news"
      />
      <VideoList videos={videosData} />
    </div>
  );
}
