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
import { Home, FileText, LogOut, Settings, User, Heart, MessageSquare, Bookmark } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const menuItems = [
  {
    title: "Home",
    url: "/user",
    icon: Home,
  },
  {
    title: "My Posts",
    url: "/user/posts",
    icon: FileText,
  },
  {
    title: "Liked Posts",
    url: "/user/liked",
    icon: Heart,
  },
  {
    title: "Bookmarks",
    url: "/user/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Comments",
    url: "/user/comments",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
]

export function UserSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    const res = await fetch("/api/auth/logout")
    if (res.ok) {
      router.replace("/login")
    }
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <h2 className="text-xl font-bold text-gray-900">Social Platform</h2>
        <p className="text-sm text-gray-600">User Dashboard</p>
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

      <SidebarFooter className="p-4 my-6">
        <Button variant="outline" className="w-full justify-start bg-transparent cursor-pointer" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
