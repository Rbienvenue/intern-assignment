import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Heart, MessageSquare, Users, Eye } from "lucide-react"
import prisma from "@/lib/db"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function UserDashboard() {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }

  // Get user's posts
  const userPosts = await prisma.posts.findMany({
    where: { author_id: user.id },
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
    take: 5,
  })

  // Get recent community posts
  const recentPosts = await prisma.posts.findMany({
    where: {
      status: "published",
      NOT: { author_id: user.id },
    },
    include: {
      author: {
        select: { username: true },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
    take: 10,
  })

  // Get user's liked posts
  const likedPosts = await prisma.likes.findMany({
    where: { user_id: user.id },
    include: {
      post: {
        include: {
          author: {
            select: { username: true },
          },
        },
      },
    },
    orderBy: { created_at: "desc" },
    take: 5,
  })

  // Calculate stats
  const totalPosts = userPosts.length
  const totalLikes = userPosts.reduce((sum, post) => sum + post._count.likes, 0)
  const totalComments = userPosts.reduce((sum, post) => sum + post._count.comments, 0)
  const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h1>
        <p className="text-blue-100">Here's what's happening in your community today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {totalPosts > 0 ? `Avg ${Math.round(totalViews / totalPosts)} views` : "No posts yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {totalPosts > 0 ? `Avg ${Math.round(totalLikes / totalPosts)} per post` : "Start posting!"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {totalComments > 0 ? "Great engagement!" : "Encourage discussions"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPosts.length}</div>
            <p className="text-xs text-muted-foreground">New posts today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Community Posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b pb-4 last:border-b-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {post.author.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                            <span className="text-xs text-gray-500">by {post.author.username}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content.substring(0, 100)}...</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {post._count.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {post._count.comments}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {post.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No community posts yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-sm truncate">{post.title}</h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{post.status}</span>
                        <div className="flex items-center space-x-2">
                          <span>❤️ {post._count.likes}</span>
                          <span>💬 {post._count.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No posts yet.{" "}
                    <a href="/user/posts/create" className="text-blue-600 hover:underline">
                      Create your first post!
                    </a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recently Liked Posts */}
          {likedPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recently Liked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {likedPosts.map((like) => (
                    <div key={like.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-sm truncate">{like.post.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">by {like.post.author.username}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a
                  href="/user/posts/create"
                  className="block w-full p-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Post
                </a>
                <a
                  href="/user/posts"
                  className="block w-full p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Manage My Posts
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
