import { Menu, Triangle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between border border-primary/50 px-5 py-3">
      <Link href="/dashboard">
        <div className="flex items-center gap-1 text-lg font-medium text-primary">
          <Triangle className="size-6" />
          <p>AltCoiners.live</p>
        </div>
      </Link>
      <Menu className="size-6 text-primary" />
    </div>
  );
}
