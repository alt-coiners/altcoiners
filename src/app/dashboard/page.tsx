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
  const [
    newsData,
    bitcoinNewsData,
    financeNewsData,
    ethereumNewsData,
    altcoinNewsData,
    nftNewsData,
    videosData,
    guideData,
    cryptoCoinData,
    adPictures,
  ] = await Promise.all([
    api.news.getAllNews.query(),
    api.news.getNewsByCategoryName.query({ categoryName: "Bitcoin" }),
    api.news.getNewsByCategoryName.query({ categoryName: "Finance" }),
    api.news.getNewsByCategoryName.query({ categoryName: "Ethereum" }),
    api.news.getNewsByCategoryName.query({ categoryName: "Altcoin" }),
    api.news.getNewsByCategoryName.query({ categoryName: "NFT" }),
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
        ads={adPictures.filter((banner) => banner.name.startsWith("CAROUSEL"))}
      />
      <NewsListWithImage
        title="Crypto News"
        articles={newsData.slice(0, 8)}
        moreUrl="/dashboard/news/Crypto"
      />
      <div className="lg:hidden">
        <NewsListWithImage
          title="Finance News"
          articles={
            financeNewsData.length > 0
              ? financeNewsData.slice(0, 8)
              : newsData.slice(0, 8)
          }
          moreUrl="/dashboard/news/Finance"
        />
      </div>
      <div className="lg:hidden">
        <MostPopularSection articles={newsData.slice(0, 8)} />
      </div>
      <AdSection
        className="h-64 lg:hidden"
        banner={adPictures.find(
          (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
        )}
      />
      <VideoListCard videos={videosData.slice(0, 4)} />
      <NewsListWithImage
        title="Altcoin News"
        articles={
          altcoinNewsData.length > 0
            ? altcoinNewsData.slice(0, 8)
            : newsData.slice(0, 8)
        }
        moreUrl="/dashboard/news/Altcoin"
      />
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
        )}
      />
      <ReadersChoiceSection />
      <NewsLetter />
      <GuideHomeSection guides={guideData} />
      <NewsListWithImage
        title="Bitcoin News"
        articles={
          bitcoinNewsData.length > 0
            ? bitcoinNewsData.slice(0, 8)
            : newsData.slice(0, 8)
        }
        moreUrl="/dashboard/news/Bitcoin"
      />
      <NewsListWithImage
        title="Ethereum News"
        articles={
          ethereumNewsData.length > 0
            ? ethereumNewsData.slice(0, 8)
            : newsData.slice(0, 8)
        }
        moreUrl="/dashboard/news/Ethereum"
      />
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "BETWEEN_NEWS_SECTION_HOME",
        )}
      />
      <NewsListWithImage
        title="NFT News"
        articles={
          nftNewsData.length > 0
            ? nftNewsData.slice(0, 8)
            : newsData.slice(0, 8)
        }
        moreUrl="/dashboard/news/NFT"
      />
      <NewsListWithImage
        title="All News"
        articles={newsData.slice(0, 16)}
        moreUrl="/dashboard/news/All"
      />
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_HOME",
        )}
      />
    </div>
  );
}
