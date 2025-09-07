"use client";
import { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccordionComponent from "../components/app-components/AccordionComponent";
import SideBarComponent from "../components/app-components/SideBarComponent";
import FilterOptions from "../components/app-components/FilterOptions";
import { Priority, Insight, CategoryType, ActionType, SnoozeDuration } from "@/types/insights";
import mockData from "../../data/mock-insights.json";
import ActiveFilters from "../components/app-components/ActiveFilters";

export default function ArakkisView() {
  const [activeTab, setActiveTab] = useState<
    "all" | "snoozed" | "dismissed" | "todos"
  >("all");
  const [snoozed, setSnoozed] = useState<Insight[]>([]);
  const [dismissed, setDismissed] = useState<Insight[]>([]);
  const [todos, setTodos] = useState<Insight[]>([]);
  const [insights, setInsights] = useState<Insight[]>(
    mockData as Insight[]
  );
  const [keyword, setKeyword] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [filters, setFilters] = useState<Record<string, string[]>>({
    priority: [],
    category: [],
  });

const filteredList = useMemo(() => {
  let baseList: Insight[] = [];
  switch (activeTab) {
    case "snoozed": baseList = snoozed; break;
    case "dismissed": baseList = dismissed; break;
    case "todos": baseList = todos; break;
    default: baseList = insights;
  }

  const filtered = baseList.filter((insight) => {
    if (
      filters.priority.length > 0 &&
      !filters.priority.includes(insight.priority as Priority)
    ) return false;

    if (
      filters.category.length > 0 &&
      !filters.category.includes(insight.category as CategoryType)
    ) return false;

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      if (
        !insight.title.toLowerCase().includes(lowerKeyword) &&
        !insight.suggestedAction.toLowerCase().includes(lowerKeyword) &&
        !insight.category.toLowerCase().includes(lowerKeyword)
      ) {
        return false;
      }
    }

    const insightDate = new Date(insight.date);
    if (fromDate && insightDate < new Date(fromDate)) return false;
    if (toDate && insightDate > new Date(toDate)) return false;

    return true;
  });

  const priorityOrder: Record<Priority, number> = {
    HIGH: 1,
    MID: 2,
    LOW: 3,
  };

  return filtered.sort((a, b) => {
    const priorityDiff =
      priorityOrder[a.priority as Priority] -
      priorityOrder[b.priority as Priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}, [activeTab, snoozed, dismissed, todos, insights, filters, keyword, fromDate, toDate]);

const handleAction = (
  insight: Insight,
  action: ActionType,
  duration?: SnoozeDuration
) => {
  // Remove from all lists
  setInsights((prev) => prev.filter((i) => i.id !== insight.id));
  setSnoozed((prev) => prev.filter((i) => i.id !== insight.id));
  setDismissed((prev) => prev.filter((i) => i.id !== insight.id));
  setTodos((prev) => prev.filter((i) => i.id !== insight.id));

  if (action === "snooze" && duration) {
    const now = new Date();
    const snoozeUntil = new Date(
      now.getTime() +
        (duration.days * 24 * 60 * 60 +
         duration.hours * 60 * 60 +
         duration.minutes * 60) * 1000
    );

    const snoozedItem = { ...insight, snoozeUntil };
    setSnoozed((prev) => [...prev, snoozedItem]);

    // Timer to return the task to main list
    setTimeout(() => {
      setSnoozed((prev) => prev.filter((i) => i.id !== insight.id));
      setInsights((prev) => [...prev, insight]);
    }, snoozeUntil.getTime() - now.getTime());
  }

  if (action === "dismiss") setDismissed((prev) => [...prev, insight]);
  if (action === "todo") setTodos((prev) => [...prev, insight]);
};

  const removeFilter = (type: string, value?: string) => {
    if (type === "keyword") return setKeyword("");
    if (type === "fromDate") return setFromDate("");
    if (type === "toDate") return setToDate("");
    
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type]?.filter((v) => v !== value) || [],
    }));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SideBarComponent
          setActiveTab={setActiveTab}
          snoozed={snoozed}
          dismissed={dismissed}
          todos={todos}
          insights={insights}
        />

        <main className="flex-1 p-6">
          <div className="mb-4">
            <FilterOptions
              currentFilters={filters}
              setCurrentFilters={setFilters}
              keyword={keyword}
              setKeyword={setKeyword}
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
            />
          </div>

          <ActiveFilters
            filters={filters}
            keyword={keyword}
            fromDate={fromDate}
            toDate={toDate}
            removeFilter={removeFilter}
          />

          <AccordionComponent
            activeTab={activeTab}
            handleAction={handleAction}
            getActiveList={() => filteredList}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
