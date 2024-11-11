import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

export const bannerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.banner.findMany({
      orderBy: {
        updatedAt: "desc",
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
        redirectUrl: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      revalidatePath("/", "layout");
      if (input.id) {
        return await ctx.db.banner.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            url: input.url,
            redirectUrl: input.redirectUrl,
          },
        });
      }
      return await ctx.db.banner.create({
        data: {
          name: input.name,
          url: input.url,
          redirectUrl: input.redirectUrl,
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
      revalidatePath("/", "layout");
      return await ctx.db.banner.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
