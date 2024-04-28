import AdSection from "@/components/AdSection";
import DashboardMainSection from "@/components/DashboardMainSection";
import AdSlider from "@/components/advertisement/AdSlider";
import CoinPricesCarousel from "@/components/crypto/CoinPricesCarousel";
import GuideHomeSection from "@/components/guide/GuideHomeSection";
import MostPopularSection from "@/components/news/MostPopularSection";
import NewsLetter from "@/components/news/NewsLetter";
import NewsListWithImage from "@/components/news/NewsListWithImage";
import ReadersChoiceSection from "@/components/news/ReadersChoiceSection";
import VideoListCard from "@/components/video/VideoListCard";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const [newsData, videosData, guideData, cryptoCoinData, adPictures] =
    await Promise.all([
      api.news.getAllNews.query(),
      api.video.getAllVideos.query(),
      api.guide.getAllGuidesByCategory.query(),
      api.crypto.getAllCoins.query(),
      api.banner.getAll.query(),
    ]);

  return (
    <div className="my-4 flex flex-col gap-8 px-2 lg:gap-12 lg:px-0">
      <CoinPricesCarousel coinsData={cryptoCoinData} />
      <DashboardMainSection newsData={newsData} />
      {/* only take the banners which start with	CAROUSEL */}
      <AdSlider
        adPictures={adPictures
          .filter((banner) => banner.name.startsWith("CAROUSEL"))
          .map((banner) => banner.url)}
      />
      <NewsListWithImage
        title="Crypto News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/Crypto"
      />
      <div className="lg:hidden">
        <NewsListWithImage
          title="Latest News"
          articles={newsData.slice(0, 8)}
          moreUrl="/dashboard/news/Latest"
        />
      </div>
      <div className="lg:hidden">
        <MostPopularSection articles={newsData.slice(0, 8)} />
      </div>
      <AdSection
        className="h-64 lg:hidden"
        url={
          adPictures.find(
            (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
          )?.url ?? ""
        }
      />
      <VideoListCard videos={videosData.slice(0, 4)} />
      <NewsListWithImage
        title="Altcoin News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/Altcoin"
      />
      <AdSection
        className="h-36"
        url={
          adPictures.find(
            (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
          )?.url ?? ""
        }
      />
      <ReadersChoiceSection />
      <NewsLetter />
      <GuideHomeSection guides={guideData} />
      <NewsListWithImage
        title="Bitcoin News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/Bitcoin"
      />
      <NewsListWithImage
        title="Ethereum News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/Ethereum"
      />
      <AdSection
        className="h-64"
        url={
          adPictures.find(
            (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
          )?.url ?? ""
        }
      />
      <NewsListWithImage
        title="NFT News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/NFT"
      />
      <NewsListWithImage
        title="All News"
        articles={newsData.slice(0, 16)}
        moreUrl="/dashboard/news/All"
      />
      <AdSection
        className="h-[400px] lg:h-56"
        url={
          adPictures.find((banner) => banner.name === "ABOVE_FOOTER")?.url ?? ""
        }
      />
    </div>
  );
}
