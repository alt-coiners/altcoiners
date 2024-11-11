export const dynamic = "force-static";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Navbar />
        <div className="py-5 lg:py-8"></div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
