import { api } from "@/trpc/server";
import { getHowLongAgo } from "@/utils/helper";
import Image from "next/image";
import NewsList from "./NewsList";

export default async function ReadersChoiceSection() {
  const readersNews = await api.news.getAllNews.query();
  const mainNews = readersNews[0];

  return (
    <section className="flex flex-col gap-4 px-4">
      <h1 className="text-xl font-bold text-primary-dark">
        Reader&apos;s choice
      </h1>
      <div>
        {/* Main news section */}
        <div className="flex flex-col gap-3">
          <Image
            src={mainNews?.picture ?? ""}
            alt={mainNews?.title ?? "Picture"}
            width={400}
            height={200}
          />
          <div className="flex w-5/6 flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <p>{getHowLongAgo(mainNews?.createdAt ?? new Date())}</p>
                <p className="text-primary">{mainNews?.category}</p>
              </div>
              <p>{mainNews?.author}</p>
            </div>
            <p className="font-semibold">{mainNews?.title}</p>
            <p>
              News Summary Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Pariatur obcaecati vitae sequi eveniet excepturi quia
              accusantium, totam dolores dicta architecto autem nobis voluptatum
              dolore? Eaque doloribus enim iusto voluptatum quidem.
            </p>
          </div>
          <div className="my-2">
            <NewsList
              articles={readersNews.slice(1)}
              moreUrl="/dashboard/news"
              title="Readers' choice"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
