import type { MetadataRoute } from "next";

const BASE_URL = "https://www.altcoiners.live";

const staticPaths = [
  "",
  "/news",
  "/exclusives",
  "/exclusives/podcasts",
  "/guides",
  "/reviews",
  "/videos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
}
