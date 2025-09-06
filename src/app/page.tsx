"use client";

import { useState, useEffect } from "react";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import AccordionComponent from "../components/app-components/AccordionComponent";
import SideBarComponent from "../components/app-components/SideBarComponent";
import { Priority, Insight } from "@/types/insights";
import mockData from "../../data/mock-insights.json";

export default function ArakkisView() {

  const [activeTab, setActiveTab] = useState<"all" | "snoozed" | "dismissed" | "todos">("all");
  const [snoozed, setSnoozed] = useState<Insight[]>([]);
  const [dismissed, setDismissed] = useState<Insight[]>([]);
  const [todos, setTodos] = useState<Insight[]>([]);
  const [insights, setInsights] = useState<Insight[]>(mockData as Insight[]);
  
  useEffect(() => {
    insights.forEach((insight) => {
      if (insight.evidence) {
        const img = new Image();
        img.src = insight.evidence;
      }
    });
  }, [insights]);

  const getActiveList = () => {
    switch (activeTab) {
      case "snoozed":
        return snoozed;
      case "dismissed":
        return dismissed;
      case "todos":
        return todos;
      default:
        return insights;
    }
  };

   const handleAction = (insight: Insight, action: "snooze" | "dismiss" | "todo") => {
    if (action === "snooze") setSnoozed((prev) => [...prev, insight]);
    if (action === "dismiss") setDismissed((prev) => [...prev, insight]);
    if (action === "todo") setTodos((prev) => [...prev, insight]);

    // remove from main list
    setInsights((prev) => prev.filter((item) => item.id !== insight.id));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SideBarComponent setActiveTab ={setActiveTab}
                          snoozed={snoozed}
                          dismissed={dismissed}
                          todos={todos}
                          insights={insights}/>
       

        <main className="flex-1 p-6">
          <AccordionComponent
          handleAction={handleAction}
          getActiveList={getActiveList}/>
        </main>
      </div>
    </SidebarProvider>
  );
}
