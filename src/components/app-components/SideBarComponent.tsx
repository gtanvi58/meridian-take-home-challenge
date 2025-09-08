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
        <Sidebar className="w-64 border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Tasks</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SideBarMenuItemComponent setActiveTab={setActiveTab}
                  actionType={"all"}
                  currentInsights={allInsights}
                  textToDisplay={"All"}/>
                  <SideBarMenuItemComponent setActiveTab={setActiveTab}
                  actionType={"snooze"}
                  currentInsights={snoozed}
                  textToDisplay={"Snoozed"}/>
                  <SideBarMenuItemComponent setActiveTab={setActiveTab}
                  actionType={"dismiss"}
                  currentInsights={dismissed}
                  textToDisplay={"Dismissed"}/>
                  <SideBarMenuItemComponent setActiveTab={setActiveTab}
                  actionType={"todo"}
                  currentInsights={todos}
                  textToDisplay={"Todos"}/>
                  <SideBarMenuItemComponent setActiveTab={setActiveTab}
                  actionType={"complete"}
                  currentInsights={complete}
                  textToDisplay={"Completed"}/>
                 
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
}