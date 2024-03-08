import { Menu, Triangle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="border-primary/50 flex justify-between border px-5 py-3">
      <div className="text-primary flex items-center gap-1 text-lg font-medium">
        <Triangle className="size-6" />
        <p>AltCoiners.live</p>
      </div>
      <Menu className="text-primary size-6" />
    </div>
  );
}
