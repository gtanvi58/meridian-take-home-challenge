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
  handleAction: (insight: Insight, action: ActionType) => void;
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
      {activeInsights.map((insight) => (
        <div
          key={insight.id}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Trigger + Content */}
          <AccordionItem value={insight.id.toString()}>
            <AccordionTrigger className="p-4 hover:bg-slate-50 transition-colors">
              <div className="grid grid-cols-[2fr_3fr_1fr_auto] items-center gap-4 w-full">
                <span className="text-base md:text-lg font-semibold text-slate-800">
                  {insight.category}
                </span>
                <span className="text-base md:text-lg font-medium text-slate-600 break-words">
                  {insight.title}
                </span>
                <span className="text-sm text-slate-500 text-right">
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

          {/* Buttons outside */}
          <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-slate-200 bg-white">
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAction(insight, "snooze")}
              >
                Snooze
              </Button>
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
        </div>
      ))}
    </Accordion>
  );
}
