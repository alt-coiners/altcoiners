"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns as categoryColumns } from "./_newsTable/newsCategory/columns";
import EditNewsCategory from "./_newsTable/newsCategory/create";
import { columns } from "./_newsTable/newsItem/columns";
import EditNews from "./_newsTable/newsItem/create";

export default function GuidesAdmin() {
  const { data: categories, isLoading: isCategoriesLoading } =
    api.news.getAllCategories.useQuery();
  const { data: news, isLoading: isNewsLoading } =
    api.news.getAllNews.useQuery();

  return (
    <div>
      <p className="p-2 text-3xl font-semibold">News</p>
      <hr />
      <Tabs defaultValue="news" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="news" className="w-full">
            News
          </TabsTrigger>
          <TabsTrigger value="category" className="w-full">
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">News</p>
              <DataTable
                columns={columns}
                data={news ?? []}
                sortColumnAccessor="title"
                sortColumnName="Title"
                isLoading={isNewsLoading}
                createComponent={<EditNews id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="category">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Categories</p>
              <DataTable
                columns={categoryColumns}
                data={categories ?? []}
                isLoading={isCategoriesLoading}
                sortColumnAccessor="name"
                sortColumnName="Name"
                createComponent={<EditNewsCategory id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
