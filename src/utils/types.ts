import { type Article, type NewsCategory } from "@prisma/client";

export type NewsWithCategory = Article & { category: NewsCategory };
