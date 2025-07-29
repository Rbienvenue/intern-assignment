"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Eye, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Post {
  id: string
  title: string
  description: string
  thumbnail: string
  createdAt: Date
  published: boolean
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

interface ActivityFeedProps {
  posts: Post[]
}

export function ActivityFeed({ posts }: ActivityFeedProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`
    return new Date(date).toLocaleDateString()
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <Card className="h-fit">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl">Community Feed</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-white">
            {posts.length} recent posts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[800px] overflow-y-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12 px-6">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share something amazing!</p>
              <Button asChild>
                <Link href="/user/posts/create">Create First Post</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-0">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    index !== posts.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Post Thumbnail */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg leading-tight hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
                        {truncateText(post.description, 150)}
                      </p>

                      {/* Author and Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs font-medium">{post.author.firstName.charAt(0)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {post.author.firstName} {post.author.lastName}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimeAgo(post.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1 hover:text-red-600 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{post._count.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post._count.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                            <Eye className="h-4 w-4" />
                            <span>{Math.floor(Math.random() * 100) + 50}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
