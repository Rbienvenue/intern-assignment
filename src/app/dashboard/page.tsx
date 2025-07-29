import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, FileText, ImageIcon, Users } from "lucide-react"
import prisma from "@/lib/db"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Eye, Activity, Bell, Star } from 'lucide-react'

export default async function DashboardPage() {

    const users = await prisma.users.count()
    const posts = await prisma.posts.count()
    const uploads = await prisma.uploads.count()

  const statCards = [
    {
      title: "Total Posts",
      value: posts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Media Files",
      value: uploads,
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Admin Users",
      value: users,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </CardContent>
          </Card>
        ))}
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
        <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">New post created</p>
            <p className="text-xs text-gray-500">by John Doe</p>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            2 hours ago
          </div>
        </div>
        {/* Add more activity items as needed */}
      </div>
    </CardContent>
  </Card>

  {/* Storage Usage */}
  <Card>
    <CardHeader>
      <CardTitle>Storage Usage</CardTitle>
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
    </CardContent>
  </Card>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New post created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Page updated</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Media uploaded</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a href="/dashboard/posts" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium">New Post</p>
                <p className="text-xs text-gray-500">Create a new blog post</p>
              </a>
              <a href="/dashboard/uploads" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <ImageIcon className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium">Upload Media</p>
                <p className="text-xs text-gray-500">Add new images or files</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}