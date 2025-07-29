"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Eye, BookOpen, ThumbsUp, MessageCircle } from "lucide-react"
import Link from "next/link"

interface UserStatsWidgetProps {
  stats: {
    myPosts: number
    totalLikes: number
    totalComments: number
    totalViews: number
    likedPosts: number
    commentsGiven: number
  }
}

export function UserStatsWidget({ stats }: UserStatsWidgetProps) {
  const statCards = [
    {
      title: "My Posts",
      value: stats.myPosts,
      icon: BookOpen,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      description: "Published posts",
      link: "/user/posts",
      linkText: "Manage posts",
    },
    {
      title: "Likes Received",
      value: stats.totalLikes,
      icon: Heart,
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      description: "On your posts",
      badge:
        stats.totalLikes > 0 ? `${Math.floor(stats.totalLikes / Math.max(stats.myPosts, 1))} avg` : "Start posting!",
    },
    {
      title: "Comments Received",
      value: stats.totalComments,
      icon: MessageSquare,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      description: "Conversations started",
      badge: stats.totalComments > 0 ? "Engaging content" : "Be interactive!",
    },
    {
      title: "Profile Views",
      value: stats.totalViews,
      icon: Eye,
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      description: "Total post views",
      badge: stats.myPosts > 0 ? `~${Math.floor(stats.totalViews / stats.myPosts)} per post` : "No posts yet",
    },
    {
      title: "Posts Liked",
      value: stats.likedPosts,
      icon: ThumbsUp,
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      description: "Posts you liked",
      link: "/user/liked",
      linkText: "View liked",
    },
    {
      title: "Comments Given",
      value: stats.commentsGiven,
      icon: MessageCircle,
      color: "teal",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      description: "Your contributions",
      link: "/user/comments",
      linkText: "View comments",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
            <p className="text-xs text-gray-500 mb-3">{stat.description}</p>

            {stat.badge && (
              <Badge variant="outline" className="text-xs mb-2">
                {stat.badge}
              </Badge>
            )}

            {stat.link && (
              <Link href={stat.link}>
                <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:underline">
                  {stat.linkText} →
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
