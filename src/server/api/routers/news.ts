import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

export const newsRouter = createTRPCRouter({
  getAllNews: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.article.findMany({
        include: {
          category: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
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

  upsertNews: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        description: z.string(),
        picture: z.string(),
        content: z.string(),
        author: z.string(),
        newsCategoryId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        return await ctx.db.article.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            description: input.description,
            picture: input.picture,
            content: input.content,
            author: input.author,
            newsCategoryId: input.newsCategoryId,
          },
        });
      }
      return await ctx.db.article.create({
        data: {
          title: input.title,
          description: input.description,
          picture: input.picture,
          content: input.content,
          author: input.author,
          newsCategoryId: input.newsCategoryId,
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
    .input(z.object({ categoryName: z.string(), limit: z.number().optional() }))
    .query(async ({ input, ctx }) => {
      if (input.categoryName.toLowerCase() === "all") {
        return await ctx.db.article.findMany({
          include: {
            category: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: input.limit,
        });
      }
      return await ctx.db.article.findMany({
        where: {
          category: {
            name: input.categoryName,
          },
        },
        include: {
          category: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.newsCategory.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getCategoryById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.newsCategory.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  upsertCategory: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      revalidatePath("/", "layout");
      if (input.id) {
        return await ctx.db.newsCategory.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        });
      }
      return await ctx.db.newsCategory.create({
        data: {
          name: input.name,
        },
      });
    }),

  deleteNews: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      revalidatePath("/", "layout");
      return await ctx.db.article.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllNewsAdmin: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.article.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.newsCategory.findMany({
      select: {
        name: true,
      },
    });

    return {
      title: "News",
      href: "/news",
      subMenus: categories.map((category) => {
        return {
          title: category.name,
          url: `/news/${category.name}`,
        };
      }),
    };
  }),
});
