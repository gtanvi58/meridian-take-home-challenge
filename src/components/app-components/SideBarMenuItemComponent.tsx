import {
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { ActionType } from "@/types/insights";

type SideBarMenuItemComponentProps = {
    setActiveTab: (tab: ActionType) => void;
    currentInsights: any[]
    textToDisplay: string
    actionType: ActionType
}

export default function SideBarMenuItemComponent({
      setActiveTab,
      currentInsights,
      textToDisplay,
      actionType
}: SideBarMenuItemComponentProps){
    return (
        <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab(actionType)}>
                      {textToDisplay} ({currentInsights.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
    )
}