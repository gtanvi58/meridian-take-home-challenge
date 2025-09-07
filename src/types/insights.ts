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
  snoozeUntil: Date
};

export type ActionType = "snooze" | "dismiss" | "todo";

export type FilterType = "contains keyword" | "priority" | "category" | "date"

export type CategoryType = "Inventory" | "Marketing" | "Sales" | "Logistics" | "Analytics" | "Support"

export type SnoozeDuration = {
  days: number;
  hours: number;
  minutes: number;
};