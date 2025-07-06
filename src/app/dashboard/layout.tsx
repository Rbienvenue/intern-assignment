import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/ui/admin-sidebar"
import { DashboardHeader } from "@/components/ui/dashboard-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
