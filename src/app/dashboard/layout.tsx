import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div>Header</div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
