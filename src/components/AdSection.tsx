import { cn } from "@/lib/utils";
import type { Banner } from "@prisma/client";
import Link from "next/link";

interface AdSectionProps {
  banner: Banner | undefined;
  className?: string;
}

export default function AdSection({ banner, className }: AdSectionProps) {
  if (!banner) return null;
  const { url, redirectUrl, name } = banner;
  return (
    <Link
      href={redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "mx-auto w-full rounded-xl hover:opacity-90 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl",
        className,
      )}
    >
      <img
        src={url}
        alt={name}
        width={300}
        height={250}
        className="h-full w-full rounded-xl object-cover lg:object-contain"
      />
    </Link>
  );
}
