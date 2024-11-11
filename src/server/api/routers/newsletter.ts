import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

export const newsletterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.newsLetter.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.newsLetter.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  insert: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      revalidatePath("/", "layout");
      return await ctx.db.newsLetter.create({
        data: {
          email: input.email,
        },
      });
    }),
});
