import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const newsRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  getAllNews: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.article.findMany();
  }),

  getNewsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.article.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
