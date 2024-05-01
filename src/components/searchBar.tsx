"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [showInput, setShowInput] = useState(false);

  const { data: searchResults, isLoading } = api.search.fuzzySearch.useQuery(
    {
      query: debouncedSearchTerm,
    },
    {
      enabled: !!debouncedSearchTerm,
    },
  );
  return (
    <div className="flex items-center gap-2">
      {showInput && (
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      )}
      <Popover>
        <PopoverTrigger>
          <Search className="size-6" onClick={() => setShowInput(true)} />
        </PopoverTrigger>
        <PopoverContent className={`${searchTerm.length ? "block" : "hidden"}`}>
          {isLoading ? (
            <div>Searching...</div>
          ) : (
            <ul className="flex flex-col gap-2 divide-y divide-gray-400 text-sm">
              {!searchResults?.length ? (
                <p>No results found</p>
              ) : (
                searchResults?.splice(0, 8).map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="pt-2 hover:bg-gray-50"
                  >
                    {result.title}
                  </Link>
                ))
              )}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
