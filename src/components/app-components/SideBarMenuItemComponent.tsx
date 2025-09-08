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
        <div className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
>
        <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab(actionType)}>
                      {textToDisplay} ({currentInsights.length})
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  </div>
    )
}