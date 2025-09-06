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
      return <span className="text-red-500 font-semibold">High</span>;
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
    <Accordion
      type="multiple"
      className="space-y-4 w-full max-w-3xl mx-auto"
    >
      {activeInsights.map((insight) => (
        <AccordionItem
          key={insight.id}
          value={insight.id.toString()}
          className="rounded-xl border shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <AccordionTrigger className="p-4 hover:bg-slate-50 rounded-xl transition-colors">
            <div className="grid grid-cols-[2fr_2fr_1fr_auto] items-center w-full gap-4">
              <span className="text-base md:text-lg font-semibold text-slate-800">
                {insight.category}
              </span>
              <span className="text-base md:text-lg font-medium text-slate-600 break-words">
  {insight.title}
</span>
              <span className="text-sm text-slate-500 text-right">
                {new Date(insight.date).toLocaleDateString()}
              </span>
              <div className="flex justify-end">
                {displayPriority(insight.priority)}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 space-y-3 bg-slate-50 rounded-b-xl">
            <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm md:text-base text-slate-700 shadow-sm">
              <span className="font-semibold text-slate-800">
                Suggested Action:
              </span>{" "}
              {insight.suggestedAction}
            </div>

            {insight.evidence && (
              <img
                src={insight.evidence}
                alt="Evidence"
                className="w-full h-48 object-cover rounded-lg shadow-sm border"
              />
            )}

            <div className="flex flex-wrap gap-2 pt-2">
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
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
