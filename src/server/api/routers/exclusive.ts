import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";

export const exclusiveRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.exclusive.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.exclusive.findUnique({
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
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      revalidatePath("/", "layout");
      if (input.id) {
        return await ctx.db.exclusive.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            description: input.description,
            content: input.content,
            url: input.url,
          },
        });
      }
      return await ctx.db.exclusive.create({
        data: {
          title: input.title,
          description: input.description,
          content: input.content,
          url: input.url,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.exclusive.findMany({
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
      return await ctx.db.exclusive.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllAdmin: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.exclusive.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),
});
