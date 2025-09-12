import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className=" bg-white">
                <Image
                    src="./icons/TafuriNewLogo.svg"
                    alt="tafuri logo"
                    width={250}
                    height={250}
                />
            </SidebarHeader>

            <SidebarContent className="bg-[#0f75bc]">
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}