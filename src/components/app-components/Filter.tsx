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
  filterList: string[];
  currentFilters: Record<string, string[]>;
  setCurrentFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

export default function Filter({
  filterName,
  filterList,
  currentFilters,
  setCurrentFilters,
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
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by {filterName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterList.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={selectedItems.includes(item)}
            onCheckedChange={(checked) => handleToggle(item, checked)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
