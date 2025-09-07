"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Priority, CategoryType } from "@/types/insights";

type ActiveFiltersProps = {
  filters: Record<string, string[]>;
  keyword: string;
  fromDate?: string;
  toDate?: string;
  removeFilter: (type: string, value?: string) => void;
};

export default function ActiveFilters({
  filters,
  keyword,
  fromDate,
  toDate,
  removeFilter,
}: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
  {Object.entries(filters).map(([key, values]) =>
    values.map((val) => (
      <Badge
        key={`${key}-${val}`}
        variant="secondary"
        className="flex items-center gap-1 text-sm px-2 py-1"
      >
        {`${key}: ${val}`}
        <button
          type="button"
          onClick={() => removeFilter(key, val)}
          className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200"
        >
          <X className="w-3 h-3" />
        </button>
      </Badge>
    ))
  )}

  {keyword && (
    <Badge variant="secondary" className="flex items-center gap-1 text-sm px-2 py-1">
      {`Keyword: ${keyword}`}
      <button
        type="button"
        onClick={() => removeFilter("keyword")}
        className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200"
      >
        <X className="w-3 h-3" />
      </button>
    </Badge>
  )}

  {fromDate && (
    <Badge variant="secondary" className="flex items-center gap-1 text-sm px-2 py-1">
      From: {fromDate}
      <button
        type="button"
        onClick={() => removeFilter("fromDate")}
        className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200"
      >
        <X className="w-3 h-3" />
      </button>
    </Badge>
  )}

  {toDate && (
    <Badge variant="secondary" className="flex items-center gap-1 text-sm px-2 py-1">
      To: {toDate}
      <button
        type="button"
        onClick={() => removeFilter("toDate")}
        className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200"
      >
        <X className="w-3 h-3" />
      </button>
    </Badge>
  )}
</div>

  );
}
