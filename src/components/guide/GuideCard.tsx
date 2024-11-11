import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface GuideCardProps {
  category: string;
  title: string;
  id: number;
  category_id: number;
}

export default function GuideCard({
  category,
  title,
  category_id,
  id,
}: GuideCardProps) {
  return (
    <Card className="shadow-xl drop-shadow-xl">
      <Link href={`/guides/${category_id}/${id}`} key={id}>
        <CardHeader>
          <CardDescription>{category}</CardDescription>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent></CardContent>
    </Card>
  );
}
