import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const exchangeRouter = createTRPCRouter({
  getAllExchanges: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.exchange.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getExchangeById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.exchange.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  upsertExchange: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        url: z.string(),
        info: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.exchange.upsert({
        where: {
          id: input.id,
        },
        update: {
          name: input.name,
          url: input.url,
          info: input.info,
        },
        create: {
          name: input.name,
          url: input.url,
          info: input.info,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.exchange.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
