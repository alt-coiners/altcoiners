import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import { api } from "@/trpc/server";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateMetadata(
  props: {
    params: Promise<{ id: string; category: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const video = await api.video.getVideoById({ id: +params.id });
  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: video?.title + " - Altcoiners",
    description: video?.title,
    keywords: "cryptocurrency, news, altcoiners",
    openGraph: {
      title: video?.title + " - Altcoiners",
      description: video?.title,
      url: `https://altcoiners.com/videos/${params.category}/${params.id}`,
      images: [video?.picture ?? "", ...previousImages],
    },
    twitter: {
      title: video?.title + " - Altcoiners",
      description: video?.title,
      card: "summary_large_image",
      site: "@altcoiners",
      images: video?.picture ?? "",
    },
  };
}

export default async function VideoId(props: {
  params: Promise<{ id: string; category: string }>;
}) {
  const params = await props.params;
  const video = await api.video.getVideoById({ id: +params.id });
  const latestNews = await api.news.getLatestNews();
  const adPictures = await api.banner.getAll();

  const breadcrumbs = [
    {
      name: "Videos",
      url: "/videos",
    },
    {
      name: params.category ?? "",
      url: `/videos/${params.category}`,
    },
    {
      name: video?.title ?? "",
      url: `/videos/${video?.id}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex flex-col gap-4 p-3">
          <BreadcrumbComponent links={breadcrumbs} />
          <p className="w-[90%] text-pretty text-2xl font-bold text-primary-dark lg:text-3xl">
            {video?.title}
          </p>
          <iframe
            width="560"
            height="315"
            src={video?.url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="mx-auto my-6 aspect-video w-[90%] lg:mt-10 xl:w-full"
          ></iframe>

          <div className="mb-4 px-2 xl:hidden">
            <NewsList
              articles={latestNews.slice(0, 4)}
              moreUrl="/news"
              title="Crypto News"
            />
          </div>
          <div className="xl:hidden">
            <NewsLetter />
          </div>
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <NewsList
            articles={latestNews.slice(0, 4)}
            moreUrl="/news"
            title="Most Popular"
          />
        </div>
      </div>
      <AdSection
        className="mb-8 h-[300px] px-2"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_VIDEO_ITEM",
        )}
      />
    </div>
  );
}
