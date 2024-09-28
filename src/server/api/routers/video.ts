import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  getAllVideos: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.video.findMany({
      include: {
        VideoCategory: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getVideoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.video.findUnique({
        where: {
          id: input.id,
        },
        include: {
          VideoCategory: true,
        },
      });
    }),

  getVideosForCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.videoCategory.findUnique({
        where: {
          name: input.category,
        },
        include: {
          Videos: {
            orderBy: {
              updatedAt: "desc",
            },
          },
        },
      });
    }),

  getCategoryById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.videoCategory.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getVideoCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.videoCategory.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  upsertVideo: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        url: z.string(),
        picture: z.string(),
        categoryId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.video.upsert({
        where: {
          id: input.id,
        },
        update: {
          title: input.title,
          url: input.url,
          picture: input.picture,
          VideoCategory: {
            connect: {
              id: input.categoryId,
            },
          },
        },
        create: {
          title: input.title,
          url: input.url,
          picture: input.picture,
          VideoCategory: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
    }),

  upsertVideoCategory: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.videoCategory.upsert({
        where: {
          id: input.id,
        },
        update: {
          name: input.name,
          description: input.description,
        },
        create: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  deleteVideo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.video.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllVideosAdmin: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.video.findMany({
      include: {
        VideoCategory: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.videoCategory.findMany({
      select: {
        name: true,
      },
    });

    return {
      title: "Videos",
      href: "/dashboard/videos",
      subMenus: categories.map((category) => {
        return {
          title: category.name,
          url: `/dashboard/videos/${category.name}`,
        };
      }),
    };
  }),
});
