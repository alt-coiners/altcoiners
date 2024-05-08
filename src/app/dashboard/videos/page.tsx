import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import VideoList from "@/components/video/VideoList";
import { api } from "@/trpc/server";

export default async function Videos() {
  const videos = await api.video.getAllVideos.query();
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "Videos",
      url: `/dashboard/news/category/videos`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
        Videos
      </p>
      <p className="">
        Cryptocurrency has clearly been a booming topic for several years now.
        Even though discussions around cryptocurrencies are very common, not
        everyone understands their underlying concept. This is why we curate the
        below list of Cryptocurrency Videos, aimed at helping people find
        answers and learn more about the industry. There is lots of Videos for
        Cryptocurrency related subjects out there, and generally they vary in
        clarity, quality and technical depth. It is our recommendation to watch
        Cryptocurrency Videos in order to broaden your field of knowledge. With
        the below library, our aim is to curated the best Cryptocurrency
        Tutorial Videos to keep you up informed about the industry, up to date
        on all the new cryptocurrencies and vary of all security and set up
        measures. The below library is a selection of videos for Crypto
        enthusiasts, retail investors and pros. But one step at a time â€“ watch
        Crypto Videos and check out the basic information first. This will help
        you better shape your foundational understanding of blockchain
        technology and all things crypto. Making sure not to miss the best
        Crypto Tutorial Videos curated in our video library, is definitely one
        of the best ways to stay on top of the game.
      </p>
      <VideoList videos={videos} />
      <AdSection
        className="h-56"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_VIDEO",
        )}
      />
    </div>
  );
}
