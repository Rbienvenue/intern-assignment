import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tag, Plus, Search, Edit, Trash2, MoreHorizontal, FileText, TrendingUp, Hash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CategoriesPage() {
  const categoryStats = [
    {
      title: "Total Categories",
      value: "24",
      icon: Tag,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Categories",
      value: "18",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Tags",
      value: "156",
      icon: Hash,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Posts Tagged",
      value: "342",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const categories = [
    {
      id: 1,
      name: "Technology",
      slug: "technology",
      description: "Articles about latest technology trends and innovations",
      postCount: 45,
      color: "#3B82F6",
      status: "active",
      created: "2024-01-15",
    },
    {
      id: 2,
      name: "Web Development",
      slug: "web-development",
      description: "Frontend and backend development tutorials",
      postCount: 32,
      color: "#10B981",
      status: "active",
      created: "2024-01-20",
    },
    {
      id: 3,
      name: "Design",
      slug: "design",
      description: "UI/UX design principles and best practices",
      postCount: 18,
      color: "#8B5CF6",
      status: "active",
      created: "2024-02-01",
    },
    {
      id: 4,
      name: "Mobile Development",
      slug: "mobile-development",
      description: "iOS and Android app development",
      postCount: 12,
      color: "#F59E0B",
      status: "active",
      created: "2024-02-10",
    },
    {
      id: 5,
      name: "DevOps",
      slug: "devops",
      description: "Deployment, CI/CD, and infrastructure",
      postCount: 8,
      color: "#EF4444",
      status: "inactive",
      created: "2024-02-15",
    },
  ]

  const popularTags = [
    { name: "React", count: 28 },
    { name: "JavaScript", count: 24 },
    { name: "CSS", count: 19 },
    { name: "Node.js", count: 16 },
    { name: "TypeScript", count: 14 },
    { name: "Python", count: 12 },
    { name: "API", count: 10 },
    { name: "Database", count: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories & Tags</h1>
          <p className="text-gray-600">Organize your content with categories and tags</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Hash className="h-4 w-4 mr-2" />
            Manage Tags
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryStats.map((stat) => (
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
        {/* Categories List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Categories</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search categories..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full mt-1" style={{ backgroundColor: category.color }}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <Badge variant={category.status === "active" ? "default" : "secondary"}>
                            {category.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Slug: {category.slug}</span>
                          <span>{category.postCount} posts</span>
                          <span>Created: {category.created}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Posts
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularTags.map((tag, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Hash className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">{tag.name}</span>
                  </div>
                  <Badge variant="secondary">{tag.count}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add New Tag
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Technology</div>
              <div className="text-sm text-gray-600">Most Popular Category</div>
              <div className="text-xs text-gray-500 mt-1">45 posts • 12.5K views</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Web Development</div>
              <div className="text-sm text-gray-600">Highest Engagement</div>
              <div className="text-xs text-gray-500 mt-1">32 posts • 8.2K views</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Design</div>
              <div className="text-sm text-gray-600">Fastest Growing</div>
              <div className="text-xs text-gray-500 mt-1">18 posts • +45% this month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}