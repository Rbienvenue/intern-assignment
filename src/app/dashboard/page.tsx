import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, FileText, ImageIcon, Users, TrendingUp, Clock, Eye, Activity, Bell, Star } from "lucide-react"
import prisma from "@/lib/db"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const users = await prisma.users.count()
  const posts = await prisma.posts.count()
  const uploads = await prisma.uploads.count()

  const recentUserActivity = await prisma.posts.findMany({
    where: {
      author: {
        role: "user",
      },
    },
    include: {
      author: {
        select: { username: true, role: true },
      },
      _count: {
        select: { likes: true, comments: true },
      },
    },
    orderBy: { created_at: "desc" },
    take: 10,
  })

  const userEngagementStats = {
    totalUserPosts: await prisma.posts.count({
      where: { author: { role: "user" } },
    }),
    totalUserComments: await prisma.comments.count(),
    totalUserLikes: await prisma.likes.count(),
    activeUsers: await prisma.users.count({
      where: {
        role: "user",
        posts: { some: {} },
      },
    }),
  }

  const statCards = [
    {
      title: "Total Posts",
      value: posts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Media Files",
      value: uploads,
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Admin Users",
      value: users,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3%",
      changeType: "positive",
    },
    {
      title: "Page Views",
      value: "24.5K",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+18%",
      changeType: "positive",
    },
  ]

  const recentActivities = [
    { action: "New post created", user: "John Doe", time: "2 hours ago", type: "post" },
    { action: "Image uploaded", user: "Jane Smith", time: "4 hours ago", type: "upload" },
    { action: "User registered", user: "Mike Johnson", time: "6 hours ago", type: "user" },
    { action: "Post updated", user: "Sarah Wilson", time: "8 hours ago", type: "post" },
    { action: "File deleted", user: "Tom Brown", time: "1 day ago", type: "upload" },
  ]

  const topPosts = [
    { title: "Getting Started with React", views: "2.4K", author: "John Doe", status: "Published" },
    { title: "Advanced JavaScript Concepts", views: "1.8K", author: "Jane Smith", status: "Published" },
    { title: "CSS Grid Layout Guide", views: "1.2K", author: "Mike Johnson", status: "Draft" },
    { title: "Node.js Best Practices", views: "980", author: "Sarah Wilson", status: "Published" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Activity Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Engagement Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userEngagementStats.totalUserPosts}</div>
                <div className="text-sm text-gray-600">User Posts</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userEngagementStats.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userEngagementStats.totalUserComments}</div>
                <div className="text-sm text-gray-600">Comments</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{userEngagementStats.totalUserLikes}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentUserActivity.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">by {post.author.username}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>❤️ {post._count.likes}</span>
                    <span>💬 {post._count.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "post"
                        ? "bg-blue-600"
                        : activity.type === "upload"
                          ? "bg-purple-600"
                          : "bg-green-600"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Images</span>
                <span>2.4 GB</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Documents</span>
                <span>1.2 GB</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Videos</span>
                <span>800 MB</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm font-medium">
                <span>Total Used</span>
                <span>4.4 GB / 10 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Performing Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                    <p className="text-xs text-gray-500">by {post.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={post.status === "Published" ? "default" : "secondary"} className="text-xs">
                      {post.status}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                asChild
              >
                <a href="/dashboard/posts">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div className="text-center">
                    <p className="font-medium">New Post</p>
                    <p className="text-xs text-gray-500">Create article</p>
                  </div>
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                asChild
              >
                <a href="/dashboard/uploads">
                  <ImageIcon className="h-6 w-6 text-green-600" />
                  <div className="text-center">
                    <p className="font-medium">Upload Media</p>
                    <p className="text-xs text-gray-500">Add files</p>
                  </div>
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <div className="text-center">
                  <p className="font-medium">Analytics</p>
                  <p className="text-xs text-gray-500">View reports</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Bell className="h-6 w-6 text-orange-600" />
                <div className="text-center">
                  <p className="font-medium">Notifications</p>
                  <p className="text-xs text-gray-500">Manage alerts</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">API</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">CDN</p>
                <p className="text-xs text-gray-500">Degraded</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Storage</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
