"use client";
import { Button } from "@/components/ui/button";
import SnoozePicker from "./SnoozePicker";
import { Insight, ActionType, SnoozeDuration } from "@/types/insights";

type InsightActionsProps = {
  insight: Insight;
  activeTab: string;
  handleAction: (insight: Insight, action: ActionType, duration?: SnoozeDuration) => void;
};

export default function InsightActions({ insight, activeTab, handleAction }: InsightActionsProps) {
  return (
    <div className="flex justify-center gap-3 px-4 py-3 border-t border-slate-200 bg-white">
      {activeTab !== "dismiss" && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleAction(insight, "dismiss")}
        >
          Dismiss
        </Button>
      )}

      {activeTab !== "snooze" && (
        <SnoozePicker
          onConfirm={(days, hours, minutes) =>
            handleAction(insight, "snooze", { days, hours, minutes })
          }
        />
      )}

      {activeTab !== "todo" && (
        <Button
          variant="default"
          size="sm"
          onClick={() => handleAction(insight, "todo")}
        >
          Add to tasks
        </Button>
      )}

      {activeTab !== "complete" && (
        <Button
          className="bg-green-200 hover:bg-green-300 text-green-900"
          size="sm"
          onClick={() => handleAction(insight, "complete")}
        >
          Mark as Complete
        </Button>
      )}
    </div>
  );
}
