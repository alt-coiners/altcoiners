import BreadcrumbComponent from "@/components/breadcrumb";

export default function VideoCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

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
      <p className="text-sm">
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
    </div>
  );
}
