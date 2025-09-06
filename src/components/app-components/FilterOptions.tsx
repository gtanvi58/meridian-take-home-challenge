import Filter from "./Filter";
import { Priority, CategoryType } from "@/types/insights";

type FilterOptionsProps = {
  currentFilters: Record<string, string[]>;
  setCurrentFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

export default function FilterOptions({
  currentFilters,
  setCurrentFilters,
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
    </div>
  );
}
