"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function NewsId() {
  const { id } = useParams();
  const { data } = api.news.getNewsById.useQuery({
    id: parseInt((id as string) ?? 0),
  });

  return <div>{data?.title}</div>;
}
