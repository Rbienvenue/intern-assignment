import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageSquare, ThumbsUp, Eye, Clock, Search, Filter, MoreHorizontal, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CommentsPage() {
  const commentStats = [
    {
      title: "Total Comments",
      value: "1,247",
      change: "+23",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Review",
      value: "18",
      change: "+5",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Approved",
      value: "1,156",
      change: "+18",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Spam Blocked",
      value: "73",
      change: "+12",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  const comments = [
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      content:
        "Great article! This really helped me understand React hooks better. Looking forward to more content like this.",
      post: "Getting Started with React Hooks",
      status: "approved",
      date: "2 hours ago",
      likes: 5,
      replies: 2,
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      content: "I have a question about the useEffect hook. Can you explain the dependency array in more detail?",
      post: "Advanced React Concepts",
      status: "pending",
      date: "4 hours ago",
      likes: 1,
      replies: 0,
    },
    {
      id: 3,
      author: "Mike Johnson",
      email: "mike@example.com",
      content: "This is spam content with promotional links...",
      post: "CSS Grid Layout Guide",
      status: "spam",
      date: "6 hours ago",
      likes: 0,
      replies: 0,
    },
    {
      id: 4,
      author: "Sarah Wilson",
      email: "sarah@example.com",
      content:
        "Excellent tutorial! The step-by-step approach makes it easy to follow. Thank you for sharing your knowledge.",
      post: "Node.js Best Practices",
      status: "approved",
      date: "1 day ago",
      likes: 8,
      replies: 3,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        )
      case "spam":
        return <Badge variant="destructive">Spam</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
          <p className="text-gray-600">Moderate and manage user comments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <AlertCircle className="h-4 w-4 mr-2" />
            Moderation Rules
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commentStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change} today</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Comments</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search comments..." className="pl-10 w-64" />
              </div>
              <Badge variant="secondary">{comments.length} comments</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{comment.author.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{comment.author}</h4>
                      <p className="text-sm text-gray-500">{comment.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(comment.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    On: <span className="font-medium">{comment.post}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{comment.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{comment.replies} replies</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{comment.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}