"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns } from "./_exclusiveTable/columns";
import EditExclusive from "./_exclusiveTable/create";

export default function ExclusiveAdmin() {
  const { data: exclusives, isLoading: isLoading } =
    api.exclusive.getAllAdmin.useQuery();

  return (
    <div>
      <p className="p-2 text-3xl font-semibold">Exclusives</p>
      <hr />
      <Tabs defaultValue="exchanges" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="exchanges" className="w-full">
            Exclusives
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exchanges">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <DataTable
                columns={columns}
                data={exclusives ?? []}
                sortColumnAccessor="title"
                sortColumnName="Title"
                isLoading={isLoading}
                createComponent={<EditExclusive id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
