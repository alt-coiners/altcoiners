"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns } from "./_bannerTable/columns";
import EditBanner from "./_bannerTable/create";

export default function BannerAdmin() {
  const { data: banners, isLoading: isLoading } = api.banner.getAll.useQuery();

  return (
    <div>
      <p className="p-2 text-2xl font-semibold">Banners</p>
      <hr />
      <Tabs defaultValue="exchanges" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="exchanges" className="w-full">
            Banners
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exchanges">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <DataTable
                columns={columns}
                data={banners ?? []}
                sortColumnAccessor="title"
                sortColumnName="Title"
                isLoading={isLoading}
                createComponent={<EditBanner id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
