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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import AdSection from "../AdSection";

export default function AdSlider() {
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
            <AdSection className="h-48" />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" />
          </CarouselItem>
          <CarouselItem className="w-full basis-1/3">
            <AdSection className="h-48" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
