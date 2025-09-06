export type Priority = "HIGH" | "MID" | "LOW";

export type Insight = {
  id: number;
  title: string;
  priority: Priority;
  category: string;
  confidence: number;
  date: string;
  evidence?: string;
  suggestedAction: string;
};

export type ActionType = "snooze" | "dismiss" | "todo";

export type FilterType = "keyword" | "priority" | "category" | "date"

export type CategoryType = "Inventory" | "Marketing" | "Sales" | "Logistics" | "Analytics" | "Support"