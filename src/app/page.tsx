import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/dashboard");
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      Sandeep
    </main>
  );
}
