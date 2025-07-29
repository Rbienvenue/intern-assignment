"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Sparkles, Calendar } from "lucide-react"
import Link from "next/link"

interface WelcomeHeroProps {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    createdAt: Date
  }
  stats: {
    myPosts: number
    totalLikes: number
    totalComments: number
  }
}

export function WelcomeHero({ user, stats }: WelcomeHeroProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getMembershipDuration = () => {
    const joinDate = new Date(user.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - joinDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) return `${diffDays} days`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`
    return `${Math.floor(diffDays / 365)} years`
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {getGreeting()}, {user.firstName}!
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </h1>
                <p className="text-gray-600 text-lg">Ready to share something amazing today?</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Member for {getMembershipDuration()}
              </Badge>
              {stats.myPosts > 0 && (
                <Badge variant="outline" className="bg-white">
                  {stats.myPosts} posts published
                </Badge>
              )}
              {stats.totalLikes > 0 && (
                <Badge variant="outline" className="bg-white">
                  {stats.totalLikes} likes received
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/user/posts/create">
                <Plus className="h-5 w-5 mr-2" />
                Create Post
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white shadow-md">
              <Link href="/user/posts">View My Posts</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
