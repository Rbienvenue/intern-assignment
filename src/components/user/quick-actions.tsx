"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, Users, Settings, Heart, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Create Post",
      description: "Share your thoughts",
      icon: Plus,
      href: "/user/posts/create",
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
    },
    {
      title: "My Posts",
      description: "Manage content",
      icon: BookOpen,
      href: "/user/posts",
      color: "bg-white hover:bg-gray-50 border",
      textColor: "text-gray-900",
    },
    {
      title: "Liked Posts",
      description: "Your favorites",
      icon: Heart,
      href: "/user/liked",
      color: "bg-white hover:bg-gray-50 border",
      textColor: "text-gray-900",
    },
    {
      title: "Comments",
      description: "Your discussions",
      icon: MessageSquare,
      href: "/user/comments",
      color: "bg-white hover:bg-gray-50 border",
      textColor: "text-gray-900",
    },
    {
      title: "Profile",
      description: "Edit your info",
      icon: Users,
      href: "/user/profile",
      color: "bg-white hover:bg-gray-50 border",
      textColor: "text-gray-900",
    },
    {
      title: "Settings",
      description: "Preferences",
      icon: Settings,
      href: "/user/settings",
      color: "bg-white hover:bg-gray-50 border",
      textColor: "text-gray-900",
    },
  ]

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              asChild
              className={`justify-start h-auto p-4 ${action.color} ${action.textColor}`}
              variant="ghost"
            >
              <Link href={action.href}>
                <div className="flex items-center gap-3 w-full">
                  <action.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
