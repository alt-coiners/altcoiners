"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns as categoryColumns } from "./_guideTable/guideCategory/columns";
import EditGuideCategory from "./_guideTable/guideCategory/create";
import { columns } from "./_guideTable/guideItem/columns";

export default function GuidesAdmin() {
  const { data: guideCategories, isLoading: isCategoriesLoading } =
    api.guide.getGuideCategories.useQuery();
  const { data: guides, isLoading: isGuidesLoading } =
    api.guide.getAllGuides.useQuery();

  return (
    <div>
      <p className="p-2 text-2xl font-semibold">Guides</p>
      <hr />
      <Tabs defaultValue="guides" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="guides" className="w-full">
            Guides
          </TabsTrigger>
          <TabsTrigger value="category" className="w-full">
            Guide Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="guides">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Guides</p>
              <DataTable
                columns={columns}
                data={guides ?? []}
                sortColumnAccessor="title"
                sortColumnName="Title"
                isLoading={isGuidesLoading}
                // createComponent={<EditVideo videoId={-1} />}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="category">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Guide Categories</p>
              <DataTable
                columns={categoryColumns}
                data={guideCategories ?? []}
                isLoading={isCategoriesLoading}
                sortColumnAccessor="name"
                sortColumnName="Name"
                createComponent={<EditGuideCategory id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
