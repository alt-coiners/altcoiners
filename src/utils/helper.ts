export const getHowLongAgo = (date: Date) => {
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

export const calculateReadingTime = (text: string): string => {
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export const formatDate = (date: Date): string => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate} ${formattedTime}`;
};
