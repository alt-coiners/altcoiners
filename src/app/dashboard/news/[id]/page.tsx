import { api } from "@/trpc/server";

export default async function NewsId({ params }: { params: { id: string } }) {
  const newsArticle = await api.news.getNewsById.query({ id: +params.id });

  return (
    <div className="px-2 py-10">
      <p>{newsArticle?.title}</p>
    </div>
  );
}
