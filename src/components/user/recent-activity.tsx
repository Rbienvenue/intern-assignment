"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Heart, MessageSquare, User } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  title: string
  createdAt: Date
  _count: {
    likes: number
    comments: number
  }
}

interface LikedPost {
  id: string
  createdAt: Date
  post: {
    id: string
    title: string
    author: {
      firstName: string
      lastName: string
    }
    _count: {
      likes: number
      comments: number
    }
  }
}

interface Comment {
  id: string
  content: string
  createdAt: Date
  post: {
    id: string
    title: string
    author: {
      firstName: string
      lastName: string
    }
  }
}

interface RecentActivityProps {
  userPosts: Post[]
  likedPosts: LikedPost[]
  recentComments: Comment[]
}

export function RecentActivity({ userPosts, likedPosts, recentComments }: RecentActivityProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* My Recent Posts */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">My Recent Posts</CardTitle>
            </div>
            <Link href="/user/posts">
              <Button variant="ghost" size="sm" className="text-xs">
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {userPosts.length === 0 ? (
            <div className="text-center py-8 px-4">
              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3">No posts yet</p>
              <Button asChild size="sm">
                <Link href="/user/posts/create">Create your first post</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-0">
              {userPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    index !== userPosts.length - 1 ? "border-b" : ""
                  }`}
                >
                  <h4 className="font-medium text-sm line-clamp-2 mb-2">{post.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{post._count.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post._count.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recently Liked Posts */}
      {likedPosts.length > 0 && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                <CardTitle className="text-lg">Recently Liked</CardTitle>
              </div>
              <Link href="/user/liked">
                <Button variant="ghost" size="sm" className="text-xs">
                  View all
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {likedPosts.map((like, index) => (
                <div
                  key={like.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    index !== likedPosts.length - 1 ? "border-b" : ""
                  }`}
                >
                  <h4 className="font-medium text-sm line-clamp-2 mb-2">{like.post.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>
                        by {like.post.author.firstName} {like.post.author.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span>{like.post._count.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Comments */}
      {recentComments.length > 0 && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Recent Comments</CardTitle>
              </div>
              <Badge variant="secondary">{recentComments.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentComments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    index !== recentComments.length - 1 ? "border-b" : ""
                  }`}
                >
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">"{comment.content.substring(0, 80)}..."</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>on "{comment.post.title}"</span>
                    <span>{formatTimeAgo(comment.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
