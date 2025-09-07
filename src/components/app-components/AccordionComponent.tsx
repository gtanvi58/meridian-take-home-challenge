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
  const activeInsights = getActiveList();

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
                  <span className="col-span-2 text-base md:text-lg font-medium text-slate-600 truncate">
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
            </div>
            {insight.snoozeUntil && (
  <div className="ml-auto text-right px-4 py-2">
    <span className="text-sm text-slate-500 whitespace-nowrap">
      Snoozed until: {new Date(insight.snoozeUntil).toLocaleString()}
    </span>
  </div>
)}

          </motion.div>
        ))}
      </AnimatePresence>
    </Accordion>
  );
}