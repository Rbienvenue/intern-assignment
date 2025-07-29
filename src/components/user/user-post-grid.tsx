"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPostCard } from "./user-post-card"
import { Search, Grid, List, FileText } from "lucide-react"

interface Post {
  id: string
  thumbnail: string
  title: string
  description: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
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

interface UserPostsGridProps {
  posts: Post[]
}

export function UserPostsGrid({ posts }: UserPostsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  // Filter posts based on search term and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" || (filter === "published" && post.published) || (filter === "draft" && !post.published)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "published" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("published")}
            >
              Published
            </Button>
            <Button variant={filter === "draft" ? "default" : "outline"} size="sm" onClick={() => setFilter("draft")}>
              Drafts
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filteredPosts.length} posts</Badge>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Posts Display */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{searchTerm ? "No posts found" : "No posts yet"}</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first post."}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
          }
        >
          {filteredPosts.map((post) => (
            <UserPostCard key={post.id} post={post} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
