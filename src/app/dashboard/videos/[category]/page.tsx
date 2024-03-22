import BreadcrumbComponent from "@/components/breadcrumb";
import { api } from "@/trpc/server";

export default async function VideoCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const videoCategoryData = await api.video.getVideosForCategory.query({
    category,
  });

  const breadcrumbs = [
    {
      name: "News",
      url: "/dashboard/news",
    },
    {
      name: "Videos",
      url: `/dashboard/news/category/videos`,
    },
    {
      name: category,
      url: `/dashboard/news/category/videos/${category}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-3">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-semibold text-primary-dark">
        {category} Videos
      </p>
      <p className="text-sm">{videoCategoryData?.description}</p>
    </div>
  );
}
