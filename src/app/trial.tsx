import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Check, Clock, Archive, Inbox, Plus } from "lucide-react";
import Image from "next/image";

// --- Types & Mock Data -------------------------------------------------------

type Priority = "HIGH" | "MID" | "LOW";

type Insight = {
  id: number;
  title: string;
  priority: Priority;
  category: string;
  confidence: number; // 0..1
  date: string; // ISO date
  evidence?: string; // url
  suggestedAction: string;
};

const MOCK_INSIGHTS: Insight[] = [
  {
    id: 1,
    title: "Inventory running low on SKU-A12",
    priority: "HIGH",
    category: "Inventory",
    confidence: 0.87,
    date: "2025-07-28",
    evidence: "https://picsum.photos/seed/sku-a12/640/360",
    suggestedAction: "Order 500 more units before Friday.",
  },
  {
    id: 2,
    title: "Spike in 5-star reviews after TikTok mention",
    priority: "MID",
    category: "Marketing",
    confidence: 0.81,
    date: "2025-07-28",
    evidence: "https://picsum.photos/seed/review-trend/640/360",
    suggestedAction: "Boost TikTok post and reply to top comments.",
  },
  {
    id: 3,
    title: "Unusual refund rate for Order Batch #214",
    priority: "HIGH",
    category: "Support",
    confidence: 0.76,
    date: "2025-07-28",
    evidence: "https://picsum.photos/seed/refunds/640/360",
    suggestedAction: "Audit the batch and contact affected customers.",
  },
  {
    id: 4,
    title: "Email campaign CTR down 12% week-over-week",
    priority: "LOW",
    category: "Marketing",
    confidence: 0.69,
    date: "2025-07-28",
    evidence: "https://picsum.photos/seed/ctr/640/360",
    suggestedAction: "A/B test subject lines on next send.",
  },
];

// --- Helpers -----------------------------------------------------------------

const priorityOrder: Record<Priority, number> = { HIGH: 0, MID: 1, LOW: 2 };

function formatConfidence(c: number) {
  return `${Math.round(c * 100)}%`;
}

function classForPriority(p: Priority) {
  switch (p) {
    case "HIGH":
      return "bg-red-100 text-red-700 border border-red-200";
    case "MID":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "LOW":
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
}

// --- Component ---------------------------------------------------------------

export default function ArrakisTriage() {
  const [insights, setInsights] = useState<Insight[]>(MOCK_INSIGHTS);
  const [tasks, setTasks] = useState<Insight[]>([]);
  const [snoozed, setSnoozed] = useState<Insight[]>([]);
  const [query, setQuery] = useState("");
  const [activeInsight, setActiveInsight] = useState<Insight | null>(null);

  // Derived: filtered + sorted list for Today tab
  const visibleInsights = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = insights.filter((i) =>
      [i.title, i.category].some((s) => s.toLowerCase().includes(q))
    );
    return filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [insights, query]);

  // Actions
  function dismiss(insight: Insight) {
    setInsights((prev) => prev.filter((i) => i.id !== insight.id));
  }

  function addToTasks(insight: Insight) {
    setTasks((prev) => [{ ...insight }, ...prev]);
    dismiss(insight);
  }

  function snooze(insight: Insight, when: "tomorrow" | "next-week") {
    // For MVP, just move to snoozed list with a tag; persistence not required
    setSnoozed((prev) => [{ ...insight, title: `${insight.title} (Snoozed: ${when})` }, ...prev]);
    dismiss(insight);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <div className="font-semibold tracking-tight">Arrakis</div>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm text-slate-500">Daily ops insights</div>
          <div className="ml-auto w-72">
            <Input
              placeholder="Search title or category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Tabs defaultValue="inbox" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="inbox" className="gap-2"><Inbox className="h-4 w-4" /> Insights</TabsTrigger>
              <TabsTrigger value="tasks" className="gap-2"><Check className="h-4 w-4" /> Task List</TabsTrigger>
              <TabsTrigger value="snoozed" className="gap-2"><Clock className="h-4 w-4" /> Snoozed</TabsTrigger>
            </TabsList>
            <div className="text-xs text-slate-500">Triage goal: under 5 minutes</div>
          </div>

          {/* Inbox / Today */}
          <TabsContent value="inbox" className="space-y-3">
            {visibleInsights.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-slate-500">All caught up. Nice work! 🎉</CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visibleInsights.map((insight) => (
                  <Card
                    key={insight.id}
                    className="group hover:shadow-sm transition-shadow cursor-pointer border-slate-200"
                  >
                    <CardHeader className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + classForPriority(insight.priority)}>
                          {insight.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">{insight.category}</span>
                        <span className="ml-auto text-xs text-slate-400">{new Date(insight.date).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="tracking-tight leading-tight text-base">
                        {insight.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Confidence {formatConfidence(insight.confidence)} · Suggested: {insight.suggestedAction}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <Button variant="secondary" className="h-8" onClick={() => setActiveInsight(insight)}>
                        View
                      </Button>
                      <Button variant="ghost" className="h-8" onClick={() => dismiss(insight)}>
                        <Archive className="h-4 w-4 mr-1" /> Dismiss
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8">
                            <Clock className="h-4 w-4 mr-1" /> Snooze
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => snooze(insight, "tomorrow")}>Tomorrow</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => snooze(insight, "next-week")}>Next week</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button className="h-8 ml-auto" onClick={() => addToTasks(insight)}>
                        <Plus className="h-4 w-4 mr-1" /> Add to Tasks
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tasks */}
          <TabsContent value="tasks">
            {tasks.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-slate-500">No tasks yet. Add important insights here.</CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {tasks.map((t) => (
                  <Card key={t.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + classForPriority(t.priority)}>
                          {t.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">{t.category}</span>
                        <span className="ml-auto text-xs text-slate-400">{new Date(t.date).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="text-base">{t.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">{t.suggestedAction}</CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Snoozed */}
          <TabsContent value="snoozed">
            {snoozed.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-slate-500">Nothing snoozed. Keep cruising.</CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {snoozed.map((s) => (
                  <Card key={s.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + classForPriority(s.priority)}>
                          {s.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">{s.category}</span>
                        <span className="ml-auto text-xs text-slate-400">{new Date(s.date).toLocaleDateString()}</span>
                      </div>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">{s.suggestedAction}</CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!activeInsight} onOpenChange={() => setActiveInsight(null)}>
        <DialogContent className="sm:max-w-2xl">
          {activeInsight && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-lg tracking-tight">{activeInsight.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Badge className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + classForPriority(activeInsight.priority)}>
                    {activeInsight.priority}
                  </Badge>
                  <span className="text-xs text-slate-500">{activeInsight.category}</span>
                  <span className="text-xs text-slate-400 ml-auto">Confidence {formatConfidence(activeInsight.confidence)}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl border bg-slate-50 overflow-hidden">
                {activeInsight.evidence ? (
                  <div className="relative w-full h-56">
                    {/* Using next/image keeps layout crisp; placeholder external image for mock */}
                    <Image src={activeInsight.evidence} alt="Evidence" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="p-6 text-sm text-slate-500">No evidence available.</div>
                )}
              </div>

              <div className="rounded-xl border p-4 bg-white">
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Suggested action</div>
                <div className="text-sm text-slate-700">{activeInsight.suggestedAction}</div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => { dismiss(activeInsight); setActiveInsight(null); }}>
                  <Archive className="h-4 w-4 mr-1" /> Dismiss
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Clock className="h-4 w-4 mr-1" /> Snooze
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => { snooze(activeInsight, "tomorrow"); setActiveInsight(null); }}>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { snooze(activeInsight, "next-week"); setActiveInsight(null); }}>Next week</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="ml-auto" onClick={() => { addToTasks(activeInsight); setActiveInsight(null); }}>
                  <Plus className="h-4 w-4 mr-1" /> Add to Tasks
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
