import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Record<"BTC" | "USD", Quote>;
}

interface Quote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number | null;
  ath_date: null | string;
  percent_from_price_ath: number | null;
}

export const cryptoRouter = createTRPCRouter({
  getAllCoins: publicProcedure.query(async () => {
    return (await fetch("https://api.coinpaprika.com/v1/tickers?limit=100", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    }).then((res) => res.json())) as Promise<Coin[]>;
  }),
});
