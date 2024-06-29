"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns } from "./_videoTable/videoCategory/columns";
import EditVideoCategory from "./_videoTable/videoCategory/create";
import { columns as videosColumns } from "./_videoTable/videoItem/columns";
import EditVideo from "./_videoTable/videoItem/create";

export default function VideosAdmin() {
  const { data: videoCategories, isLoading: isVideoCategoriesLoading } =
    api.video.getVideoCategories.useQuery();
  const { data: videos, isLoading: isVideosLoading } =
    api.video.getAllVideosAdmin.useQuery();

  return (
    <div>
      <p className="p-2 text-3xl font-semibold">Videos</p>
      <hr />
      <Tabs defaultValue="videos" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="videos" className="w-full">
            Videos
          </TabsTrigger>
          <TabsTrigger value="category" className="w-full">
            Video Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Videos</p>
              <DataTable
                columns={videosColumns}
                data={videos ?? []}
                sortColumnAccessor="title"
                sortColumnName="Title"
                isLoading={isVideosLoading}
                createComponent={<EditVideo videoId={-1} />}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="category">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Video Categories</p>
              <DataTable
                columns={columns}
                data={videoCategories ?? []}
                isLoading={isVideoCategoriesLoading}
                sortColumnAccessor="name"
                sortColumnName="Name"
                createComponent={<EditVideoCategory videoCategoryId={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
