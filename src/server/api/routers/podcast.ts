import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const podcastRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.podcast.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.podcast.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  upsert: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        description: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        return await ctx.db.podcast.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            description: input.description,
            url: input.url,
          },
        });
      }
      return await ctx.db.podcast.create({
        data: {
          title: input.title,
          description: input.description,
          url: input.url,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.podcast.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.podcast.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllAdmin: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.podcast.findMany({});
  }),
});
