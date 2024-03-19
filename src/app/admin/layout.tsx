import AdminSideNav from "@/components/admin/AdminSideNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-1">
      <AdminSideNav />
      <div className="ml-[250px] mt-2 w-full">{children}</div>
    </div>
  );
}
