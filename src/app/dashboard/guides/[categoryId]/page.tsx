import AdSection from "@/components/AdSection";
import BreadcrumbComponent from "@/components/breadcrumb";
import GuideCard from "@/components/guide/GuideCard";
import { api } from "@/trpc/server";

export default async function GuideCategory({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const categoryData = await api.guide.getGuidesByCategory.query({
    id: Number(categoryId),
  });
  const adPictures = await api.banner.getAll.query();

  const breadcrumbs = [
    {
      name: "Guides",
      url: "/dashboard/guides",
    },
    {
      name: categoryData.name,
      url: `/dashboard/news/category/videos`,
    },
  ];

  return (
    <div className="lg mx-auto mb-6 flex flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl xl:py-6 2xl:max-w-7xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <h1 className="text-3xl font-semibold lg:mx-auto lg:w-3/4">
        {categoryData.name}
      </h1>
      <div className="flex justify-center lg:mx-auto lg:w-3/4">
        <div className="my-6 grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 lg:w-[90%] lg:grid-cols-3 xl:grid-cols-4">
          {categoryData.Guide.map((guide) => (
            <GuideCard
              key={guide.id}
              category={categoryData.name}
              id={guide.id}
              category_id={guide.categoryId}
              title={guide.title}
            />
          ))}
        </div>
      </div>
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_GUIDE_CATEGORY",
        )}
      />
    </div>
  );
}
