import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const guideRouter = createTRPCRouter({
  getGuideCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guideCategory.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getGuideCategoryById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.guideCategory.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Guide: true,
        },
      });
    }),

  getGuideById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.guide.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
        },
      });
    }),

  getGuidesByCategory: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const data = await ctx.db.guideCategory.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Guide: {
            orderBy: {
              updatedAt: "desc",
            },
          },
        },
      });
      if (!data) {
        throw new Error("Category not found");
      }
      return data;
    }),

  getAllGuidesByCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guideCategory.findMany({
      include: {
        Guide: {
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });
  }),

  getAllGuides: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guide.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  upsertGuideCategory: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.guideCategory.upsert({
        where: {
          id: input.id,
        },
        create: {
          name: input.name,
        },
        update: {
          name: input.name,
        },
      });
    }),

  upsertGuide: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        picture: z.string(),
        content: z.string(),
        categoryId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.guide.upsert({
        where: {
          id: input.id,
        },
        create: {
          title: input.title,
          picture: input.picture,
          content: input.content,
          categoryId: input.categoryId,
        },
        update: {
          title: input.title,
          picture: input.picture,
          content: input.content,
          categoryId: input.categoryId,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.guide.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllGuidesAdmin: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guide.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.guideCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      title: "Guides",
      href: "/guides",
      subMenus: categories.map((category) => {
        return {
          title: category.name,
          url: `/guides/${category.id}`,
        };
      }),
    };
  }),
});
