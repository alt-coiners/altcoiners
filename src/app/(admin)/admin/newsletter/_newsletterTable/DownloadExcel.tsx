import { Button } from "@/components/ui/button";
import type { NewsLetter } from "@prisma/client";
import React from "react";
import * as xlsx from "xlsx";

export default function DownloadExcel({ data }: { data: NewsLetter[] }) {
  const downloadExcel = () => {
    const newsLetterData = data.map((item) => ({
      id: item.id,
      email: item.email,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    const ws = xlsx.utils.json_to_sheet(newsLetterData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "NewsLetter");
    xlsx.writeFile(wb, "newsLetter.xlsx");
  };

  return <Button onClick={downloadExcel}>Download Excel</Button>;
}
