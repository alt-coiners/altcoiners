import { getHowLongAgo } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: number;
  picture: string;
  title: string;
  category: string;
  date: Date;
}

export default function NewsCard({
  id,
  picture,
  title,
  category,
  date,
}: NewsCardProps) {
  return (
    <Link
      className="flex flex-col gap-2"
      href={`/dashboard/news/${category}/${id}`}
    >
      <Image
        src={picture}
        alt={title}
        width={300}
        height={200}
        quality={100}
        className="h-48 w-full lg:h-full"
      />
      <div className="flex items-center gap-2 text-sm">
        <p className="text-gray-600">{getHowLongAgo(date)}</p>
        <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
        <p className="text-primary">{category}</p>
      </div>
      <p className="w-5/6 text-pretty font-semibold">{title}</p>
    </Link>
  );
}
