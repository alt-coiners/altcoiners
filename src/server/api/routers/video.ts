import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  getAllVideos: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.video.findMany();
  }),

  getVideoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.video.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
