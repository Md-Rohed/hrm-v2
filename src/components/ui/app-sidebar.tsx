import { Building2, ChevronDown, LayoutDashboard } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import Link from "next/link"

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
                <SidebarGroup >
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="">
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <SidebarMenu>
                            <Collapsible defaultOpen={false} className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton >
                                            <Building2 />
                                            Organization
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem >
                                                <SidebarMenuButton asChild>
                                                    <Link href="">
                                                        <span>Companies</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>

                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem >
                                                <SidebarMenuButton asChild>
                                                    <Link href="">
                                                        <span>Departments</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}