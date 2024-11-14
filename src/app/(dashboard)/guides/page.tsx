import AdSection from "@/components/AdSection";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Guide() {
  const guidesByCategoryData = await api.guide.getAllGuidesByCategory();
  const adPictures = await api.banner.getAll();

  return (
    <div className="mx-auto mb-6 flex w-full flex-col gap-4 p-3 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
      <p className="text-2xl font-bold text-primary-dark lg:text-3xl">Guides</p>
      <div className="mx-auto flex flex-col gap-4 px-6 xl:gap-6">
        {guidesByCategoryData.map((category) => (
          <div key={category.id}>
            <Link href={`/guides/${category.id}`}>
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </Link>
            <div className="flex">
              <div className="my-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {category.Guide.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${category.id}/${guide.id}`}
                    className="h-full rounded-lg bg-white px-4 py-6 shadow-lg lg:py-8"
                  >
                    <h3 className="text-lg font-semibold">{guide.title}</h3>
                    {/* <p className="text-gray-500">{guide.content}</p> */}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdSection
        className="h-[300px]"
        banner={adPictures.find(
          (banner) => banner.name === "ABOVE_FOOTER_GUIDE",
        )}
      />
    </div>
  );
}
