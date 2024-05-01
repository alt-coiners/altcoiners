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
import { type Coin } from "@/server/api/routers/crypto";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface CoinPricesCarouselProps {
  coinsData: Coin[];
}

export default function CoinPricesCarousel({
  coinsData: coins,
}: CoinPricesCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 lg:-mb-8 xl:max-w-5xl 2xl:max-w-7xl">
      <h2 className="text-2xl font-bold text-primary-dark">
        Buy/Sell At the Best Prices
      </h2>
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
          {coins?.map((coin) => (
            <CarouselItem
              key={coin.id}
              className="w-full basis-full lg:basis-1/4 xl:basis-1/5"
            >
              <CoinCard coin={coin} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function CoinCard({ coin }: { coin: Coin }) {
  return (
    <div className="flex flex-col gap-2 border p-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{coin.name}</p>
        <p
          className={`text-sm ${coin.quotes.USD.percent_change_1h < 0 ? "text-red-500" : "text-green-500"}`}
        >
          {coin.quotes.USD.percent_change_1h}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">
            Buy for{" "}
            <span className="font-medium">
              {coin.quotes.USD.price.toFixed(5)}
            </span>
          </p>
          <p className="text-sm">
            Sell for{" "}
            <span className="font-medium">
              {coin.quotes.USD.price.toFixed(5)}
            </span>
          </p>
        </div>
        <p className="font-semibold">{coin.symbol}</p>
      </div>
    </div>
  );
}
