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
    <div className="lg mb-6 flex flex-col gap-4 p-3">
      <BreadcrumbComponent links={breadcrumbs} />
      <h1 className="text-2xl font-semibold lg:mx-auto lg:w-3/4">
        {categoryData.name}
      </h1>
      <div className="flex justify-center lg:mx-auto lg:w-3/4">
        <div className="my-6 grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryData.Guide.map((guide) => (
            <GuideCard
              key={guide.id}
              category={categoryData.name}
              title={guide.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}