"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import DownloadExcel from "./_newsletterTable/DownloadExcel";
import { columns } from "./_newsletterTable/columns";

export default function NewsLetterAdmin() {
  const { data, isLoading: isLoading } = api.newsletter.getAll.useQuery();

  return (
    <div>
      <p className="p-2 text-3xl font-semibold">NewsLetter Mails</p>
      <hr />
      <Tabs defaultValue="exchanges" className="w-full px-4 py-6">
        <TabsContent value="exchanges">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <DataTable
                columns={columns}
                data={data ?? []}
                sortColumnAccessor="email"
                sortColumnName="Email"
                isLoading={isLoading}
                createComponent={<DownloadExcel data={data ?? []} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
