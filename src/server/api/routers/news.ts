import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { NEWS_DATA } from "@/utils/constant/news";

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

  getAllNews: publicProcedure.query(() => {
    return NEWS_DATA;
  }),

  getNewsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return NEWS_DATA.find((news) => news.id === input.id);
    }),
});
