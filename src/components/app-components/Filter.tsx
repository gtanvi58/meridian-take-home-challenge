"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FilterType } from "@/types/insights";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterProps = {
  filterName: FilterType;
  filterList?: string[];
  currentFilters: Record<string, string[]>;
  setCurrentFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  keyword?: string;
  setKeyword?: React.Dispatch<React.SetStateAction<string>>;
  fromDate?: string;
  setFromDate?: React.Dispatch<React.SetStateAction<string>>;
  toDate?: string;
  setToDate?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filter({
  filterName,
  filterList,
  currentFilters,
  setCurrentFilters,
  keyword,
  setKeyword,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: FilterProps) {
  const selectedItems = currentFilters[filterName] || [];

  const handleToggle = (
    item: string,
    checked: boolean | "indeterminate"
  ) => {
    let updated: string[];
    if (checked) {
      updated = [...selectedItems, item];
    } else {
      updated = selectedItems.filter((i) => i !== item);
    }

    // update parent map immutably
    setCurrentFilters((prev) => ({
      ...prev,
      [filterName]: updated,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {filterName} <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[20rem] p-3"> {/* make it wider */}
  <DropdownMenuLabel>Filter by {filterName}</DropdownMenuLabel>
  <DropdownMenuSeparator />
  {filterList?.map((item) => (
    <DropdownMenuCheckboxItem
      key={item}
      checked={selectedItems.includes(item)}
      onCheckedChange={(checked) => handleToggle(item, checked)}
    >
      {item}
    </DropdownMenuCheckboxItem>
  ))}

  {filterName === "contains keyword" && (
    <input
      type="text"
      placeholder="Enter keyword"
      value={keyword}
      onChange={(e) => setKeyword?.(e.target.value)}
      className="border rounded-md px-3 py-1 w-full mt-2"
    />
  )}

  {filterName === "date" && (
    <div className="flex gap-2 mt-2">
      <label className="flex flex-col flex-1">
        From:
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate?.(e.target.value)}
          className="border rounded-md px-2 py-1 w-full"
        />
      </label>

      <label className="flex flex-col flex-1">
        To:
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate?.(e.target.value)}
          className="border rounded-md px-2 py-1 w-full"
        />
      </label>
    </div>
  )}
</DropdownMenuContent>

    </DropdownMenu>
  );
}
