import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const searchRouter = createTRPCRouter({
  fuzzySearch: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.query) {
        return [];
      }
      const [news, videos, exchanges, guide] = await Promise.all([
        ctx.db.article.findMany({
          where: {
            title: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          include: {
            category: true,
          },
          take: 5,
        }),
        ctx.db.video.findMany({
          where: {
            title: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          include: {
            VideoCategory: true,
          },
          take: 5,
        }),
        ctx.db.exchange.findMany({
          where: {
            name: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          take: 5,
        }),
        ctx.db.guide.findMany({
          where: {
            title: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          include: {
            category: true,
          },
          take: 5,
        }),
      ]);

      // process all search results and combine them into a single array
      const results = [
        ...news.map((article) => ({
          type: "news",
          id: article.id,
          title: article.title,
          category: article.category.name,
          url: `/dashboard/news/${article.category.name}/${article.id}`,
        })),
        ...videos.map((video) => ({
          type: "video",
          id: video.id,
          title: video.title,
          category: video.VideoCategory.name,
          url: `/dashboard/videos/${video.VideoCategory.name}/${video.id}`,
        })),
        ...exchanges.map((exchange) => ({
          type: "exchange",
          id: exchange.id,
          title: exchange.name,
          url: `/dashboard/reviews`,
        })),
        ...guide.map((guide) => ({
          type: "guide",
          id: guide.id,
          title: guide.title,
          category: guide.category.name,
          url: `/dashboard/guides/${guide.category.id}/${guide.id}`,
        })),
      ];

      return results;
    }),
});
