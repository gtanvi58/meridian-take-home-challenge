import { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Priority, Insight, ActionType } from "@/types/insights";

let displayPriority = (priority: Priority) => {
  switch (priority) {
    case "HIGH":
      return <span className="text-red-500 font-medium">High</span>;
    case "MID":
      return <span className="text-orange-400 font-medium">Medium</span>;
    case "LOW":
      return <span className="text-yellow-300 font-medium">Low</span>;
    default:
      return <span className="text-gray-400">Unknown</span>;
  }
};

type AccordionComponentProps = {
  handleAction: (insight: Insight, action: ActionType) => void;
  getActiveList: () => Insight[];
};

export default function AccordionComponent({
  handleAction,
  getActiveList
}: AccordionComponentProps){

  const activeInsights = getActiveList();

    return (
          <Accordion type="multiple" className="space-y-2 w-full max-w-2xl mx-auto">
            {activeInsights.map((insight) => (
              <AccordionItem
                key={insight.id}
                value={insight.id.toString()}
                className="border rounded-md"
              >
                <AccordionTrigger className="p-4">
                  <div className="grid grid-cols-[3fr_1fr_1fr] items-center w-full gap-4">
                    <span className="text-lg font-semibold">{insight.title}</span>
                    <span className="text-sm text-slate-500 text-center">
                      {new Date(insight.date).toLocaleDateString()}
                    </span>
                    <div className="flex justify-end">{displayPriority(insight.priority)}</div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2 space-y-2">
                  <div className="bg-slate-100 p-2 rounded-md text-sm md:text-base text-slate-800">
                    <span className="font-semibold">Suggested Action:</span>{" "}
                    {insight.suggestedAction}
                  </div>

                  {insight.evidence && (
                    <img
                      src={insight.evidence}
                      alt="Evidence"
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}

                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleAction(insight, "dismiss")}>Dismiss</Button>
                    <Button onClick={() => handleAction(insight, "snooze")}>Snooze</Button>
                    <Button onClick={() => handleAction(insight, "todo")}>Add to tasks</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
)
}
        