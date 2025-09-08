"use client";
import { useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Insight, ActionType, SnoozeDuration } from "@/types/insights";
import InsightRow from "./InsightRow";

type AccordionComponentProps = {
  activeTab: string;
  handleAction: (insight: Insight, action: ActionType, duration?: SnoozeDuration) => void;
  getActiveList: () => Insight[];
};

export default function AccordionComponent({ activeTab, handleAction, getActiveList }: AccordionComponentProps) {
  const activeInsights = getActiveList();

  // Preload images
  useEffect(() => {
    const images: string[] = activeInsights
      .map((i) => i.evidence)
      .filter((e): e is string => !!e);

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activeInsights]);

  return (
    <Accordion type="multiple" className="space-y-6 w-full max-w-4xl mx-auto">
      {activeInsights.map((insight) => (
        <InsightRow
          key={insight.id}
          insight={insight}
          activeTab={activeTab}
          handleAction={handleAction}
        />
      ))}
    </Accordion>
  );
}
