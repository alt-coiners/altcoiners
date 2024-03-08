import Image from "next/image";

interface NewsCardProps {
  picture: string;
  title: string;
  category: string;
  date: Date;
}

const getHowLongAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

export default function NewsCard({
  picture,
  title,
  category,
  date,
}: NewsCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <Image
        src={picture}
        alt={title}
        width={300}
        height={200}
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center gap-2 text-xs">
        <p className="text-gray-400">{getHowLongAgo(date)}</p>
        <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
        <p className="text-primary">{category}</p>
      </div>
      <p className="w-5/6 text-pretty font-semibold">{title}</p>
    </div>
  );
}
