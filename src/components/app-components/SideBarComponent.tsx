import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/ui/sidebar";
import { ActionType } from "@/types/insights";
import SideBarMenuItemComponent from "./SideBarMenuItemComponent";
type SideBarComponentProps = {
  setActiveTab: (tab: ActionType) => void;
  allInsights: any[];
  snoozed: any[];
  dismissed: any[];
  todos: any[];
  complete: any[]
};

export default function SideBarComponent({
  setActiveTab,
  allInsights,
  snoozed,
  dismissed,
  todos,
  complete
}: SideBarComponentProps){
    return (
       <Sidebar className="w-64 border-r border-gray-200 bg-white shadow-sm">
  <SidebarContent className="h-full flex flex-col">
    <SidebarGroup className="mb-6">
      <SidebarGroupLabel className="text-gray-700 font-semibold text-sm px-4 py-2 uppercase tracking-wide">
        Tasks
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-1">
          <SideBarMenuItemComponent
            setActiveTab={setActiveTab}
            actionType={"all"}
            currentInsights={allInsights}
            textToDisplay={"All"}
          />
          <SideBarMenuItemComponent
            setActiveTab={setActiveTab}
            actionType={"snooze"}
            currentInsights={snoozed}
            textToDisplay={"Snoozed"}
          />
          <SideBarMenuItemComponent
            setActiveTab={setActiveTab}
            actionType={"dismiss"}
            currentInsights={dismissed}
            textToDisplay={"Dismissed"}
          />
          <SideBarMenuItemComponent
            setActiveTab={setActiveTab}
            actionType={"todo"}
            currentInsights={todos}
            textToDisplay={"Todos"}
          />
          <SideBarMenuItemComponent
            setActiveTab={setActiveTab}
            actionType={"complete"}
            currentInsights={complete}
            textToDisplay={"Completed"}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

    )
}