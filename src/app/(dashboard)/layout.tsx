import { AppSidebar } from "@/components/ui/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Headset } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <div className="border-b-2 p-5 flex justify-between">
                        <div className="flex gap-3">
                            <SidebarTrigger />
                            {/* Breadcrumb */}
                        </div>
                        <div className="flex items-center gap-4">
                            <Headset />
                            <Bell />
                            <p>Welcome</p>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </>
    )
}