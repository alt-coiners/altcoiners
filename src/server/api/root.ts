// import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { bannerRouter } from "./routers/banner";
import { cryptoRouter } from "./routers/crypto";
import { exchangeRouter } from "./routers/exchange";
import { exclusiveRouter } from "./routers/exclusive";
import { guideRouter } from "./routers/guide";
import { newsRouter } from "./routers/news";
import { newsletterRouter } from "./routers/newsletter";
import { podcastRouter } from "./routers/podcast";
import { searchRouter } from "./routers/search";
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
  crypto: cryptoRouter,
  search: searchRouter,
  exclusive: exclusiveRouter,
  podcast: podcastRouter,
  banner: bannerRouter,
  newsletter: newsletterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
