import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Eye, Users, Clock, Globe, Smartphone, Monitor, Calendar, Download } from 'lucide-react'

export default function AnalyticsPage() {
  const analyticsStats = [
    {
      title: "Total Views",
      value: "45.2K",
      change: "+12.5%",
      changeType: "positive",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Unique Visitors",
      value: "12.8K",
      change: "+8.2%",
      changeType: "positive",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Session",
      value: "4m 32s",
      change: "-2.1%",
      changeType: "negative",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Bounce Rate",
      value: "34.2%",
      change: "-5.3%",
      changeType: "positive",
      icon: TrendingDown,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const topPages = [
    { page: "/blog/getting-started-react", views: "2.4K", percentage: 85 },
    { page: "/blog/javascript-concepts", views: "1.8K", percentage: 65 },
    { page: "/blog/css-grid-guide", views: "1.2K", percentage: 45 },
    { page: "/blog/nodejs-best-practices", views: "980", percentage: 35 },
    { page: "/blog/web-performance", views: "756", percentage: 28 },
  ]

  const trafficSources = [
    { source: "Organic Search", visitors: "8.2K", percentage: 64 },
    { source: "Direct", visitors: "2.1K", percentage: 16 },
    { source: "Social Media", visitors: "1.5K", percentage: 12 },
    { source: "Referral", visitors: "1.0K", percentage: 8 },
  ]

  const deviceStats = [
    { device: "Desktop", percentage: 58, icon: Monitor },
    { device: "Mobile", percentage: 35, icon: Smartphone },
    { device: "Tablet", percentage: 7, icon: Globe },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your website performance and user engagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat) => (
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
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span
                  className={`text-xs font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{page.page}</span>
                    <Badge variant="secondary">{page.views}</Badge>
                  </div>
                  <Progress value={page.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{source.visitors}</div>
                    <div className="text-xs text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{device.percentage}%</div>
                    <Progress value={device.percentage} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">127</div>
                <p className="text-sm text-gray-600">Active users right now</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Page views (last hour)</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>New sessions</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. load time</span>
                  <span className="font-medium">1.2s</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Conversions */}
        <Card>
          <CardHeader>
            <CardTitle>Goals & Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Newsletter Signups</span>
                  <span className="font-medium">234</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="text-xs text-gray-500">78% of monthly goal</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contact Form</span>
                  <span className="font-medium">45</span>
                </div>
                <Progress value={45} className="h-2" />
                <div className="text-xs text-gray-500">45% of monthly goal</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Downloads</span>
                  <span className="font-medium">156</span>
                </div>
                <Progress value={89} className="h-2" />
                <div className="text-xs text-gray-500">89% of monthly goal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}