import BreadcrumbComponent from "@/components/breadcrumb";
import GuideCard from "@/components/guide/GuideCard";
import { api } from "@/trpc/server";

export default async function GuideCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const categoryData = await api.guide.getGuidesByCategory.query({ category });

  const breadcrumbs = [
    {
      name: "Guides",
      url: "/dashboard/guides",
    },
    {
      name: category,
      url: `/dashboard/news/category/videos`,
    },
  ];

  return (
    <div className="mb-6 flex flex-col gap-4 p-3">
      <BreadcrumbComponent links={breadcrumbs} />
      <h1 className="text-2xl font-semibold">{category}</h1>
      <div className="flex justify-center">
        <div className="my-6 grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryData.map((guide) => (
            <GuideCard key={guide.id} category={category} title={guide.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
