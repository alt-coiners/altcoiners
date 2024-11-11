"use client";

import AdminSideNav from "@/components/admin/AdminSideNav";
import { useAdminLoginStore } from "@/utils/store/adminLogin";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAdminLoginStore();
  const router = useRouter();
  const pathname = usePathname();
  if (!isLoggedIn && pathname && !pathname.includes("/admin/login")) {
    return router.push("/admin/login");
  }
  return (
    <div className="flex gap-1">
      <AdminSideNav />
      <div className="ml-[250px] mt-2 w-full">{children}</div>
    </div>
  );
}
