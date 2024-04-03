"use client";

import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { columns } from "./_exchangesTable/columns";
import EditExchange from "./_exchangesTable/create";

export default function GuidesAdmin() {
  const { data: exchanges, isLoading: isLoading } =
    api.exchange.getAllExchanges.useQuery();

  return (
    <div>
      <p className="p-2 text-2xl font-semibold">Exchanges</p>
      <hr />
      <Tabs defaultValue="exchanges" className="w-full px-4 py-6">
        <TabsList className="w-1/2">
          <TabsTrigger value="exchanges" className="w-full">
            Exchanges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exchanges">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <DataTable
                columns={columns}
                data={exchanges ?? []}
                sortColumnAccessor="name"
                sortColumnName="Name"
                isLoading={isLoading}
                createComponent={<EditExchange id={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
