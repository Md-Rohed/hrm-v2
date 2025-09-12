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
import { adminRoutes } from "@/routes/admin.routes"

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
                <SidebarGroup className="p-0 pt-2">
                    <SidebarGroupContent>

                        {adminRoutes.map(navItem => {
                            const hasChildren = !!navItem.children?.length;

                            return (
                                <SidebarMenu key={navItem.id} className="">
                                    {!hasChildren ?
                                        <SidebarMenuItem className="">
                                            <SidebarMenuButton asChild className="p-6 text-white">
                                                <Link
                                                    href={navItem.path || '/'}
                                                >
                                                    <navItem.icon className="mr-2.5"/>
                                                    <span>{navItem.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        : <Collapsible
                                            defaultOpen={false}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="p-6 text-white">
                                                        <navItem.icon className="mr-2.5"/>
                                                        {navItem.name}
                                                        <ChevronDown
                                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                                                        />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>

                                                <CollapsibleContent>
                                                    {navItem.children?.map(childNav => {
                                                        return (
                                                            <SidebarMenuSub
                                                                key={childNav.id}>
                                                                <SidebarMenuSubItem >
                                                                    <SidebarMenuButton asChild className="p-6 text-white">
                                                                        <Link href={childNav.path}>
                                                                            <span>{childNav.name}</span>
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuSubItem>
                                                            </SidebarMenuSub>
                                                        )
                                                    })}
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    }

                                </SidebarMenu>
                            )
                        })}

                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}