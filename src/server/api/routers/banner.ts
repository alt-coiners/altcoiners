import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const bannerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.banner.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.banner.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.banner.findUnique({
        where: {
          name: input.name,
        },
      });
    }),

  upsert: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        return await ctx.db.banner.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            url: input.url,
          },
        });
      }
      return await ctx.db.banner.create({
        data: {
          name: input.name,
          url: input.url,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.banner.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.banner.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
