import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Priority, Insight, ActionType, SnoozeDuration } from "@/types/insights";
import { motion, AnimatePresence } from "framer-motion";
import SnoozePicker from "./SnoozePicker";

let displayPriority = (priority: Priority) => {
  switch (priority) {
    case "HIGH":
      return <span className="text-red-600 font-semibold">High</span>;
    case "MID":
      return <span className="text-orange-500 font-semibold">Medium</span>;
    case "LOW":
      return <span className="text-yellow-500 font-semibold">Low</span>;
    default:
      return <span className="text-gray-400">Unknown</span>;
  }
};

type AccordionComponentProps = {
  activeTab: string;
  handleAction: (insight: Insight, action: ActionType, duration?: SnoozeDuration) => void;
  getActiveList: () => Insight[];
};

export default function AccordionComponent({
  activeTab,
  handleAction,
  getActiveList,
}: AccordionComponentProps) {

const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

let handleHoverStart = (title: string, e: React.MouseEvent) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  setHoveredTitle(title);
  setHoverPosition({ x: rect.left, y: rect.bottom });
};

let handleHoverEnd = () => {
  setHoveredTitle(null);
  setHoverPosition(null);
};

  const activeInsights = getActiveList();

 useEffect(() => {
  const images: string[] = activeInsights
    .map(i => i.evidence)
    .filter((e): e is string => !!e);

  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, [activeInsights]);

  return (
    <Accordion type="multiple" className="space-y-6 w-full max-w-4xl mx-auto">
      <AnimatePresence mode="popLayout">
        {activeInsights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.25 }}
            layout
            className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <AccordionItem value={insight.id.toString()}>
              <AccordionTrigger className="p-4 hover:bg-slate-50 transition-colors">
                <div className="grid grid-cols-5 items-center gap-4 w-full">
                  <span className="text-base md:text-lg font-semibold text-slate-800">
                    {insight.category}
                  </span>
                 <span
  className="col-span-2 text-base md:text-lg font-medium text-slate-600 truncate relative"
  onMouseEnter={(e) => handleHoverStart(insight.title, e)}
  onMouseLeave={handleHoverEnd}
>
  {insight.title}
</span>
                  <span className="text-sm md:text-base text-slate-500 text-center">
                    {new Date(insight.date).toLocaleDateString()}
                  </span>
                  <div className="flex justify-end">{displayPriority(insight.priority)}</div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 space-y-3 bg-slate-50 rounded-b-2xl">
                <div className="bg-white border border-slate-200 p-4 rounded-xl text-sm md:text-base text-slate-700 shadow-sm">
                  <span className="font-semibold text-slate-800">Suggested Action:</span>{" "}
                  {insight.suggestedAction}
                </div>

                {insight.evidence && (
                  <img
                    src={insight.evidence}
                    alt="Evidence"
                    className="w-full h-52 object-cover rounded-xl shadow-sm border border-slate-200"
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            <div className="flex justify-center gap-3 px-4 py-3 border-t border-slate-200 bg-white">
              {activeTab !== "dismissed" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleAction(insight, "dismiss")}
                >
                  Dismiss
                </Button>
              )}
              {activeTab !== "snoozed" && (
              <SnoozePicker
                onConfirm={(days, hours, minutes) => 
                  handleAction(insight, "snooze", { days, hours, minutes })
                }
              />
)}
              {activeTab !== "todos" && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAction(insight, "todo")}
                >
                  Add to tasks
                </Button>
              )}
              {activeTab !== "done" && (
  <Button
  className="bg-green-200 hover:bg-green-300 text-green-900"
  size="sm"
  onClick={() => handleAction(insight, "complete")}
>
  Mark as Complete
</Button>
)}
            </div>
            {insight.snoozeUntil && (
  <div className="ml-auto text-right px-4 py-2">
    <span className="text-sm text-slate-500 whitespace-nowrap">
      Snoozed until: {new Date(insight.snoozeUntil).toLocaleString()}
    </span>
  </div>
)}
<AnimatePresence>
  {hoveredTitle && hoverPosition && (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 bg-white border border-slate-200 shadow-lg rounded-lg p-3 text-sm text-slate-700 max-w-xs"
      style={{
        top: hoverPosition.y + 8, // small offset
        left: hoverPosition.x,
      }}
    >
      {hoveredTitle}
    </motion.div>
  )}
</AnimatePresence>

          </motion.div>
        ))}
      </AnimatePresence>
    </Accordion>
  );
}