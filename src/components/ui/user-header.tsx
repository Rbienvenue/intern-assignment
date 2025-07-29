"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function UserHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search posts..." className="pl-10 w-64" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/user/posts/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </header>
  )
}
