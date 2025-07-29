import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPostsGrid } from "@/components/user/user-posts-grid"
import { FileText, Plus, Eye, Calendar } from "lucide-react"
import prisma from "@/lib/db"
import { auth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function UserPostsPage() {
  const user = await auth()

  const posts = await prisma.posts.findMany({
    where: { authorId: user.id },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const totalPosts = posts.length
  const publishedPosts = posts.filter((post) => post.published).length
  const draftPosts = posts.filter((post) => !post.published).length
  const totalLikes = posts.reduce((sum, post) => sum + post._count.likes, 0)

  const postStats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "All your posts",
    },
    {
      title: "Published",
      value: publishedPosts,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Live posts",
    },
    {
      title: "Drafts",
      value: draftPosts,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Unpublished posts",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "On all posts",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <p className="text-gray-600">Create and manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/user/posts/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {postStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Posts Grid */}
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Posts</CardTitle>
            <Badge variant="secondary">{totalPosts} posts</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <UserPostsGrid posts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
