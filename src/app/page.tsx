"use client";
import { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccordionComponent from "../components/app-components/AccordionComponent";
import SideBarComponent from "../components/app-components/SideBarComponent";
import FilterOptions from "../components/app-components/FilterOptions";
import { Priority, Insight, CategoryType } from "@/types/insights";
import mockData from "../../data/mock-insights.json";

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

  // 🔹 central filter state
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

    return baseList.filter((insight) => {
      if (
        filters.priority.length > 0 &&
        !filters.priority.includes(insight.priority as Priority)
      ) return false;

      if (
        filters.category.length > 0 &&
        !filters.category.includes(insight.category as CategoryType)
      ) return false;

      return true;
    });
  }, [activeTab, snoozed, dismissed, todos, insights, filters]);

  const handleAction = (
    insight: Insight,
    action: "snooze" | "dismiss" | "todo"
  ) => {
    setInsights((prev) => prev.filter((i) => i.id !== insight.id));
    setSnoozed((prev) => prev.filter((i) => i.id !== insight.id));
    setDismissed((prev) => prev.filter((i) => i.id !== insight.id));
    setTodos((prev) => prev.filter((i) => i.id !== insight.id));

    if (action === "snooze") setSnoozed((prev) => [...prev, insight]);
    if (action === "dismiss") setDismissed((prev) => [...prev, insight]);
    if (action === "todo") setTodos((prev) => [...prev, insight]);
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
            />
          </div>

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
