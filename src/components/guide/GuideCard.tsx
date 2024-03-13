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
}

export default function GuideCard({ category, title }: GuideCardProps) {
  return (
    <Card className="shadow-xl drop-shadow-xl">
      <CardHeader>
        <CardDescription>{category}</CardDescription>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
