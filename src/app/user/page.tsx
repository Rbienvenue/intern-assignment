"use client"

import { WelcomeHero } from "@/components/user/welcome-hero"
import { ActivityFeed } from "@/components/user/activity-feed"
import { TrendingPosts } from "@/components/user/trending-posts"
import { UserStatsWidget } from "@/components/user/user-stats-widgets"
import { QuickActions } from "@/components/user/quick-actions"
import { RecentActivity } from "@/components/user/recent-activity"

// Mock data for demonstration
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  createdAt: new Date("2023-01-15"),
}

const mockUserPosts = [
  {
    id: "1",
    title: "Getting Started with React and Next.js",
    description: "A comprehensive guide to building modern web applications with React and Next.js framework.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-20"),
    published: true,
    author: mockUser,
    _count: { likes: 24, comments: 8 },
  },
  {
    id: "2",
    title: "10 Tips for Better UI/UX Design",
    description: "Essential design principles that every developer should know to create better user experiences.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-18"),
    published: true,
    author: mockUser,
    _count: { likes: 18, comments: 5 },
  },
  {
    id: "3",
    title: "Building Responsive Layouts with Tailwind CSS",
    description: "Learn how to create beautiful, responsive designs using Tailwind CSS utility classes.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-15"),
    published: true,
    author: mockUser,
    _count: { likes: 31, comments: 12 },
  },
]

const mockRecentPosts = [
  {
    id: "4",
    title: "The Future of Web Development in 2024",
    description: "Exploring emerging trends and technologies that will shape web development in the coming year.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-22"),
    published: true,
    author: {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
    },
    _count: { likes: 45, comments: 23 },
  },
  {
    id: "5",
    title: "Mastering TypeScript for React Development",
    description: "Advanced TypeScript patterns and best practices for React applications.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-21"),
    published: true,
    author: {
      id: "3",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike@example.com",
    },
    _count: { likes: 38, comments: 15 },
  },
  {
    id: "6",
    title: "Database Design Best Practices",
    description: "Essential principles for designing scalable and efficient database schemas.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-20"),
    published: true,
    author: {
      id: "4",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily@example.com",
    },
    _count: { likes: 29, comments: 11 },
  },
  {
    id: "7",
    title: "API Security: Protecting Your Endpoints",
    description: "Comprehensive guide to securing REST APIs and protecting against common vulnerabilities.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-19"),
    published: true,
    author: {
      id: "5",
      firstName: "David",
      lastName: "Wilson",
      email: "david@example.com",
    },
    _count: { likes: 52, comments: 18 },
  },
  {
    id: "8",
    title: "Building Real-time Applications with WebSockets",
    description: "Learn how to implement real-time features using WebSockets and modern frameworks.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-18"),
    published: true,
    author: {
      id: "6",
      firstName: "Lisa",
      lastName: "Anderson",
      email: "lisa@example.com",
    },
    _count: { likes: 33, comments: 9 },
  },
]

const mockTrendingPosts = [
  {
    id: "9",
    title: "AI and Machine Learning in Web Development",
    description: "How artificial intelligence is revolutionizing the way we build web applications.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-21"),
    author: {
      id: "7",
      firstName: "Alex",
      lastName: "Thompson",
      email: "alex@example.com",
    },
    _count: { likes: 89, comments: 34 },
  },
  {
    id: "10",
    title: "Serverless Architecture: Pros and Cons",
    description: "A detailed analysis of serverless computing and when to use it in your projects.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-20"),
    author: {
      id: "8",
      firstName: "Rachel",
      lastName: "Brown",
      email: "rachel@example.com",
    },
    _count: { likes: 67, comments: 28 },
  },
  {
    id: "11",
    title: "GraphQL vs REST: Making the Right Choice",
    description: "Comparing GraphQL and REST APIs to help you choose the best approach for your project.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-19"),
    author: {
      id: "9",
      firstName: "Tom",
      lastName: "Garcia",
      email: "tom@example.com",
    },
    _count: { likes: 56, comments: 22 },
  },
]

const mockLikedPosts = [
  {
    id: "like1",
    createdAt: new Date("2024-01-21"),
    post: {
      id: "4",
      title: "The Future of Web Development in 2024",
      author: {
        firstName: "Sarah",
        lastName: "Johnson",
      },
      _count: { likes: 45, comments: 23 },
    },
  },
  {
    id: "like2",
    createdAt: new Date("2024-01-20"),
    post: {
      id: "9",
      title: "AI and Machine Learning in Web Development",
      author: {
        firstName: "Alex",
        lastName: "Thompson",
      },
      _count: { likes: 89, comments: 34 },
    },
  },
]

const mockRecentComments = [
  {
    id: "comment1",
    content:
      "Great article! This really helped me understand the concepts better. Looking forward to implementing these ideas in my next project.",
    createdAt: new Date("2024-01-21"),
    post: {
      id: "4",
      title: "The Future of Web Development in 2024",
      author: {
        firstName: "Sarah",
        lastName: "Johnson",
      },
    },
  },
  {
    id: "comment2",
    content: "Thanks for sharing this comprehensive guide. The examples are very clear and easy to follow.",
    createdAt: new Date("2024-01-20"),
    post: {
      id: "5",
      title: "Mastering TypeScript for React Development",
      author: {
        firstName: "Mike",
        lastName: "Chen",
      },
    },
  },
]

export default function UserDashboard() {
  // Calculate comprehensive stats from mock data
  const stats = {
    myPosts: mockUserPosts.length,
    totalLikes: mockUserPosts.reduce((sum, post) => sum + post._count.likes, 0),
    totalComments: mockUserPosts.reduce((sum, post) => sum + post._count.comments, 0),
    totalViews: mockUserPosts.length * 150, // Mock data
    likedPosts: mockLikedPosts.length,
    commentsGiven: mockRecentComments.length,
  }

  return (
    <div className="space-y-8">
      {/* Welcome Hero Section */}
      <WelcomeHero user={mockUser} stats={stats} />

      {/* Enhanced Stats Grid */}
      <UserStatsWidget stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityFeed posts={mockRecentPosts} />
        </div>

        {/* Right Sidebar - Takes 1 column */}
        <div className="space-y-6">
          <TrendingPosts posts={mockTrendingPosts} />
          <QuickActions />
        </div>

        {/* Left Sidebar - Takes 1 column */}
        <div className="lg:order-first space-y-6">
          <RecentActivity userPosts={mockUserPosts} likedPosts={mockLikedPosts} recentComments={mockRecentComments} />
        </div>
      </div>
    </div>
  )
}
