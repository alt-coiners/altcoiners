import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Exchange } from "@prisma/client";
import { ArrowRight, Circle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ExchangeCardProps {
  exchange: Exchange;
}

export default function ExchangeCard({ exchange }: ExchangeCardProps) {
  const { name, info, url } = exchange;
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            {/* <Circle size={16} /> */}
            <p>{name}</p>
          </div>
          <Button size="sm" className="h-8 bg-primary-dark text-xs">
            Premium
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="prose prose-sm">
          <ul>
            {info.split(",").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={url} target="_blank" rel="noreferrer">
          <Button className="w-full gap-2 bg-primary-dark">
            Open Account <ArrowRight size={14} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
