import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Guide } from "@prisma/client";

export const guideRouter = createTRPCRouter({
  getGuideCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guideCategory.findMany();
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
          Guide: true,
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
        Guide: true,
      },
    });
  }),

  getAllGuides: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.guide.findMany({
      include: {
        category: true,
      },
    });
  }),
});
