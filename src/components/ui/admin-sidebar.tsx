"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart3, FileText, ImageIcon, Layout, LogOut, Settings, Upload, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: BarChart3,
    },
    {
        title: "Posts",
        url: "/dashboard/posts",
        icon: FileText,
    },
    {
        title: "Uploads",
        url: "/dashboard/uploads",
        icon: Upload,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },
]

export function AdminSidebar() {

    const router = useRouter()

    const pathname = usePathname()

    async function handleLogout() {
        const res = await fetch('/api/auth/logout')
        if (res.ok) {
            router.replace('/login')
        }

    }

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="p-6">
                <h2 className="text-xl font-bold text-gray-900">Brilliant Researchers</h2>
                <p className="text-sm text-gray-600">Admin Panel</p>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
