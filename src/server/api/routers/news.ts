import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const newsRouter = createTRPCRouter({
  getAllNews: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.article.findMany({
      include: {
        category: true,
      },
    });
  }),

  getNewsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.article.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
        },
      });
    }),

  getLatestNews: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.article.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: true,
      },
      take: 5,
    });
  }),

  getNewsByCategoryId: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.article.findMany({
        where: {
          newsCategoryId: input.categoryId,
        },
        include: {
          category: true,
        },
      });
    }),

  getNewsByCategoryName: publicProcedure
    .input(z.object({ categoryName: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.article.findMany({
        where: {
          category: {
            name: input.categoryName,
          },
        },
        include: {
          category: true,
        },
      });
    }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.newsCategory.findMany();
  }),
});
