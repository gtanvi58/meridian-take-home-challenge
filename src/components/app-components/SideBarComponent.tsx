import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { ActionType } from "@/types/insights";

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
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("all")}>
                      All ({allInsights.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("snooze")}>
                      Snoozed ({snoozed.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("dismiss")}>
                      Dismissed ({dismissed.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("todo")}>
                      To-Dos ({todos.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("complete")}>
                      Completed ({complete.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
}