import Filter from "./Filter";
import { Priority, CategoryType } from "@/types/insights";

type FilterOptionsProps = {
  currentFilters: Record<string, string[]>;
  setCurrentFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  keyword: string,
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function FilterOptions({
  currentFilters,
  setCurrentFilters,
  keyword,
  setKeyword,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: FilterOptionsProps) {
  const priorityValues: Priority[] = ["HIGH", "MID", "LOW"];
  const categoryValues: CategoryType[] = [
    "Inventory",
    "Marketing",
    "Sales",
    "Logistics",
    "Analytics",
    "Support",
  ];

  return (
    <div className="flex gap-2">
       <Filter
        filterName="contains keyword"
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <Filter
        filterName="priority"
        filterList={priorityValues}
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
      />
      <Filter
        filterName="category"
        filterList={categoryValues}
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
      />
      <Filter
        filterName="date"
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
    </div>
  );
}
