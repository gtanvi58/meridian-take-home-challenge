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

type ActiveTab = "all" | "snoozed" | "dismissed" | "todos";

type SideBarComponentProps = {
  setActiveTab: (tab: ActiveTab) => void;
  insights: any[];
  snoozed: any[];
  dismissed: any[];
  todos: any[];
};

export default function SideBarComponent({
  setActiveTab,
  insights,
  snoozed,
  dismissed,
  todos,
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
                      All ({insights.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("snoozed")}>
                      Snoozed ({snoozed.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("dismissed")}>
                      Dismissed ({dismissed.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("todos")}>
                      To-Dos ({todos.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
}