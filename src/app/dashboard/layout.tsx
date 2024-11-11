"use client";

import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";

export default function Layout({}: { children: React.ReactNode }) {
  const pathname = usePathname();
  return redirect(pathname.split("/dashboard")[1] ?? "/");
}
