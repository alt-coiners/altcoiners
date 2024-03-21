import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Guide() {
  const guidesByCategoryData = await api.guide.getAllGuidesByCategory.query();

  return (
    <div className="mb-6 flex flex-col gap-4 p-3">
      <h1 className="text-2xl font-semibold">Guides</h1>
      <div className="flex flex-col gap-4 px-6">
        {guidesByCategoryData.map((category) => (
          <div key={category.id}>
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <div className="flex justify-center">
              <div className="my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.Guide.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/dashboard/guides/${category.name}/${guide.id}`}
                    className="rounded-lg bg-white px-4 py-6 shadow-lg"
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
