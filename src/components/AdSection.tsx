import { cn } from "@/lib/utils";
import type { Banner } from "@prisma/client";
import Image from "next/image";
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
      <Image
        src={url}
        alt={name}
        width={300}
        height={250}
        quality={100}
        className="h-full w-full rounded-xl object-cover"
      />
    </Link>
  );
}
