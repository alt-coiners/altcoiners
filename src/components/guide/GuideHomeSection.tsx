"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Guide, GuideCategory } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
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
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Card className="bg-primary-dark text-white">
      <CardHeader className="mx-auto flex flex-row items-center justify-between lg:max-w-3xl lg:px-0 xl:max-w-5xl 2xl:max-w-7xl">
        <CardTitle>Guides</CardTitle>
        <Button variant="ghost">
          View All <ArrowRight size={12} />
        </Button>
      </CardHeader>
      <CardContent>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="lg:hidden"
        >
          <CarouselContent>
            {guides.map((category) => (
              <CarouselItem key={category.id}>
                <h2 className="text-sm font-semibold opacity-80">
                  {category.name}
                </h2>
                <div className="flex h-full flex-col gap-4 py-4 font-semibold">
                  {category.Guide.slice(0, 5).map((guide) => (
                    <p key={guide.id}>{guide.title}</p>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* make multiple columns of the categories with the guides below */}
        <div className="mx-auto hidden grid-cols-4 gap-4 lg:grid lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
          {guides.slice(0, 4).map((category) => (
            <div key={category.id}>
              <h2 className="text-sm font-semibold opacity-80">
                {category.name}
              </h2>
              <div className="flex h-full flex-col gap-4 py-4 font-semibold lg:gap-6">
                {category.Guide.slice(0, 5).map((guide) => (
                  <p key={guide.id}>{guide.title}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
