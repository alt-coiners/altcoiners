import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import NewsLetter from "@/components/news/NewsLetter";
import NewsList from "@/components/news/NewsList";
import { api } from "@/trpc/server";

export default async function VideoId({
  params,
}: {
  params: { id: string; category: string };
}) {
  const video = await api.video.getVideoById.query({ id: +params.id });
  const latestNews = await api.news.getLatestNews.query();

  const breadcrumbs = [
    {
      name: "Videos",
      url: "/dashboard/videos",
    },
    {
      name: params.category ?? "",
      url: `/dashboard/videos/${params.category}`,
    },
    {
      name: video?.title ?? "",
      url: `/dashboard/videos/${video?.id}`,
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <div className="xl:flex xl:justify-between xl:gap-12">
        <div className="flex flex-col gap-4 p-3">
          <BreadcrumbComponent links={breadcrumbs} />
          <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
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
            className="mx-auto my-6 aspect-video w-[90%] object-cover lg:mt-10 xl:w-full"
          ></iframe>

          <div className="mb-4 px-2 xl:hidden">
            <NewsList
              articles={latestNews}
              moreUrl="/dashboard/news"
              title="Crypto News"
            />
          </div>
          <div className="xl:hidden">
            <NewsLetter />
          </div>
        </div>
        <div className="mt-36 hidden flex-col gap-8 xl:flex xl:w-1/3">
          <NewsList
            articles={latestNews}
            moreUrl="/dashboard/news"
            title="Most Popular"
          />
        </div>
      </div>
      <AdSection className="mb-8 h-56 px-2" />
    </div>
  );
}
