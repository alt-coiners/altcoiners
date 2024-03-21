import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Guide() {
  const guidesByCategoryData = await api.guide.getAllGuidesByCategory.query();

  return (
    <div className="mb-6 flex flex-col gap-4 p-3">
      <h1 className="text-2xl font-semibold">Guides</h1>
      <div className="flex flex-col gap-4 px-6 lg:mx-auto lg:w-3/4 xl:gap-6 2xl:w-2/3">
        {guidesByCategoryData.map((category) => (
          <div key={category.id}>
            <Link href={`/dashboard/guides/${category.id}`}>
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </Link>
            <div className="flex">
              <div className="my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {category.Guide.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/dashboard/guides/${category.id}/${guide.id}`}
                    className="h-full rounded-lg bg-white px-4 py-6 shadow-lg lg:py-8"
                  >
                    <h3 className="text-lg font-semibold">{guide.title}</h3>
                    <p className="text-gray-500">{guide.content}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
