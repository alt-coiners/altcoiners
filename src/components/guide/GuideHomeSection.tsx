import type { Guide, GuideCategory } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface GuideHomeSectionProps {
  guides: ({
    Guide: Guide[];
  } & GuideCategory)[];
}

export default function GuideHomeSection({ guides }: GuideHomeSectionProps) {
  return (
    <Card className="bg-primary-dark text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Guides</CardTitle>
        <Button variant="ghost">
          View All <ArrowRight size={12} />
        </Button>
      </CardHeader>
      <CardContent>
        {guides.map((category) => (
          <div key={category.id} className="my-4">
            <h2 className="text-xl font-bold">{category.name}</h2>
            <div className="flex flex-col gap-2">
              {category.Guide.map((guide) => (
                <p key={guide.id} className="text-sm">
                  {guide.title}
                </p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
