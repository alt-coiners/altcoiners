"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Banner } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import AdSection from "../AdSection";

interface AdSliderProps {
  ads: Banner[];
}

export default function AdSlider({ ads }: AdSliderProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="mx-auto hidden w-full max-w-3xl items-center justify-between gap-8 lg:flex xl:max-w-5xl 2xl:max-w-7xl">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" banner={ads[0]} />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" banner={ads[1]} />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" banner={ads[2]} />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" banner={ads[3]} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
