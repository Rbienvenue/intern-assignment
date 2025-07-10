import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PostsGrid } from "@/components/posts/post-grid"
import { FileText, Plus, Eye, Calendar } from "lucide-react"
import { CreatePostDialog } from "@/components/posts/create-post-dialog";
import prisma from "@/lib/db";
import { Badge } from "@/components/ui/badge"

export default async function Posts() {

  const posts = await prisma.posts.findMany({
    include: {
        author: true
    }
  })
  const totalPosts = posts.length
  const recentPosts = posts.filter(
    (post) => new Date(post.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length
  const thisMonthPosts = posts.filter((post) => new Date(post.createdAt).getMonth() === new Date().getMonth()).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-600">Create and manage your blog posts and articles</p>
        </div>
        <CreatePostDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </CreatePostDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-gray-500 mt-1">All published posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthPosts}</div>
            <p className="text-xs text-gray-500 mt-1">Posts this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Recent Posts</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPosts}</div>
            <p className="text-xs text-gray-500 mt-1">Posts this week</p>
          </CardContent>
        </Card>

      </div>

      {/* Posts Grid */}
      <Card className="border-none">
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <PostsGrid posts={posts}/>
        </CardContent>
      </Card>

    <Card>
  <CardHeader>
    <CardTitle>Content Performance</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="font-medium">Most Popular</p>
          <p className="text-sm text-gray-600">Technology Posts</p>
        </div>
        <Badge variant="secondary">68%</Badge>
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="font-medium">Avg. Read Time</p>
          <p className="text-sm text-gray-600">4 min 32 sec</p>
        </div>
        <Badge variant="outline">+12%</Badge>
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="font-medium">Engagement</p>
          <p className="text-sm text-gray-600">Comments & shares</p>
        </div>
        <Badge variant="default">8.4%</Badge>
      </div>
    </div>
  </CardContent>
</Card>

    </div>
  )
}
