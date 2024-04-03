import { createTRPCRouter } from "@/server/api/trpc";
import { exchangeRouter } from "./routers/exchange";
import { guideRouter } from "./routers/guide";
import { newsRouter } from "./routers/news";
import { videoRouter } from "./routers/video";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  news: newsRouter,
  video: videoRouter,
  guide: guideRouter,
  exchange: exchangeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
