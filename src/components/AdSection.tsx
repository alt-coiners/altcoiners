import { cn } from "@/lib/utils";
import Image from "next/image";

interface AdSectionProps {
  className?: string;
}

export default function AdSection({ className }: AdSectionProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full rounded-xl sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl",
        className,
      )}
    >
      <Image
        src="/images/ad-placeholder.jpeg"
        alt="Ad"
        width={300}
        height={250}
        className="h-full w-full rounded-xl object-cover"
      />
    </div>
  );
}
