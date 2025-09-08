"use client";
import { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccordionComponent from "../components/app-components/AccordionComponent";
import SideBarComponent from "../components/app-components/SideBarComponent";
import FilterOptions from "../components/app-components/FilterOptions";
import InsightsAI from "../components/app-components/InsightsAI";
import { Priority, Insight, CategoryType, ActionType, SnoozeDuration } from "@/types/insights";
import mockData from "../../data/mock-insights.json";
import ActiveFilters from "../components/app-components/ActiveFilters";

export default function ArakkisView() {
  const [activeTab, setActiveTab] = useState<ActionType>("all");
  const [snoozed, setSnoozed] = useState<Insight[]>([]);
  const [dismissed, setDismissed] = useState<Insight[]>([]);
  const [todos, setTodos] = useState<Insight[]>([]);
  const [completed, setCompleted] = useState<Insight[]>([]);
  const [allInsights, setAllInsights] = useState<Insight[]>(
    mockData as Insight[]
  );
  const [keyword, setKeyword] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [filters, setFilters] = useState<Record<string, string[]>>({
    priority: [],
    category: [],
  });
  const tabHeadings: Record<typeof activeTab, string> = {
  all: "Your Daily Overview",
  snooze: "Snoozed Insights",
  dismiss: "Dismissed Insights",
  todo: "Your To-Dos",
  complete: "Completed Tasks"
};


const filteredList = useMemo(() => {
  let baseList: Insight[] = [];
  switch (activeTab) {
    case "snooze": baseList = snoozed; break;
    case "dismiss": baseList = dismissed; break;
    case "todo": baseList = todos; break;
    case "complete" : baseList = completed; break;
    default: baseList = allInsights;
  }

  //function to implement individual filters.
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

  //ensure filtered results are sorted.
  return filtered.sort((a, b) => {
    const priorityDiff =
      priorityOrder[a.priority as Priority] -
      priorityOrder[b.priority as Priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}, [activeTab, snoozed, dismissed, todos, allInsights, filters, keyword, fromDate, toDate]);

const handleAction = (
  insight: Insight,
  action: ActionType,
  duration?: SnoozeDuration
) => {
  // Remove from all lists
  setAllInsights((prev) => prev.filter((i) => i.id !== insight.id));
  setSnoozed((prev) => prev.filter((i) => i.id !== insight.id));
  setDismissed((prev) => prev.filter((i) => i.id !== insight.id));
  setTodos((prev) => prev.filter((i) => i.id !== insight.id));
  setCompleted((prev) => prev.filter((i) => i.id !== insight.id));

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
      setAllInsights((prev) => [...prev, insight]);
    }, snoozeUntil.getTime() - now.getTime());
  }

  if (action === "dismiss") setDismissed((prev) => [...prev, insight]);
  if (action === "todo") setTodos((prev) => [...prev, insight]);
   if (action === "complete") setCompleted((prev) => [...prev, insight]);
};
  //when a filter badge is removed
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
          allInsights={allInsights}
          complete={completed}
        />

<main className="flex-1 flex flex-col min-h-screen p-6">
  {/* Display message when list is empty */}
  {filteredList.length === 0 && (filters.priority.length === 0 &&
  filters.category.length === 0 &&
  keyword.trim() === "" &&
  fromDate === "" &&
  toDate === "") ?
   (
    <div className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm max-w-md">
    <p className="text-gray-600 dark:text-gray-300 text-lg">
      {activeTab === "dismiss"
        ? "You have no dismissed insights."
        : activeTab === "todo"
        ? "You have no tasks to do."
        : activeTab === "snooze"
        ? "You have no snoozed insights."
        : activeTab === "complete"
        ? "You have no completed tasks."
        : "No insights available."}
    </p>
  </div>
</div>


  ) : (
    <>
    <h1 className="text-2xl font-bold mb-6 text-black text-center">
    {tabHeadings[activeTab]}
  </h1>
      <div className="mb-4">
        <InsightsAI />
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
    </>
  )}
</main>





      </div>
    </SidebarProvider>
  );
}
