import { columns } from "@/components/admin/video/videoCategory/columns";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VideosAdmin() {
  return (
    <div>
      <p className="p-2 text-2xl font-semibold">Holidays</p>
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
        <TabsContent value="all">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Videos</p>
              <DataTable
                columns={columns}
                data={holidays ?? []}
                sortColumnAccessor="day"
                sortColumnName="Date"
                isLoading={isHolidaysLoading}
                createComponent={<EditHoliday holidayId={-1} />}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="category">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full flex-col">
              <p className="text-lg font-medium">Video Categories</p>
              <DataTable
                columns={columnsSchoolHolidays}
                data={schoolHolidaysMap ?? []}
                sortColumnAccessor="day"
                sortColumnName="Date"
                isLoading={isSchoolHolidaysLoading}
                createComponent={<EditSchoolHoliday holidayId={-1} />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
