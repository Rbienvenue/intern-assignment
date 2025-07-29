import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/ui/user-sidebar"
import { UserHeader } from "@/components/ui/user-header"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <UserHeader />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
