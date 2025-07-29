"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Heart, MessageSquare, FlameIcon as Fire } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Post {
  id: string
  title: string
  description: string
  thumbnail: string
  createdAt: Date
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  _count: {
    likes: number
    comments: number
  }
}

interface TrendingPostsProps {
  posts: Post[]
}

export function TrendingPosts({ posts }: TrendingPostsProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fire className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Trending Posts</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            Hot 🔥
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {posts.length === 0 ? (
          <div className="text-center py-8 px-4">
            <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-3">No trending posts yet</p>
            <Button asChild size="sm" variant="outline">
              <Link href="/user/posts/create">Create trending content</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== posts.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex gap-3">
                  {/* Ranking Number */}
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>

                  {/* Post Thumbnail */}
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 text-gray-900 hover:text-orange-600 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>by {post.author.firstName}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <Heart className="h-3 w-3" />
                        <span className="font-medium">{post._count.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <MessageSquare className="h-3 w-3" />
                        <span className="font-medium">{post._count.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
