import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadsGrid } from "@/components/uploads/upload-grid"
import { FileText, Plus, Eye, Calendar, ImageIcon } from "lucide-react"
import { CreateUploadDialog } from "@/components/uploads/create-upload-dialog";
import prisma from "@/lib/db";
import { Progress } from "@/components/ui/progress"
export default async function Uploads() {

  const uploads = await prisma.uploads.findMany({
    include: {
      owner: true
    }
  })
  const totalUploads = uploads.length
  const recentUploads = uploads.filter(
    (upload) => new Date(upload.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length
  const thisMonthUploads = uploads.filter((upload) => new Date(upload.createdAt).getMonth() === new Date().getMonth()).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">uploads Management</h1>
          <p className="text-gray-600">Create and manage your blog uploads and articles</p>
        </div>
        <CreateUploadDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload new file
          </Button>
        </CreateUploadDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total uploads</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUploads}</div>
            <p className="text-xs text-gray-500 mt-1">All published uploads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthUploads}</div>
            <p className="text-xs text-gray-500 mt-1">uploads this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Recent uploads</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUploads}</div>
            <p className="text-xs text-gray-500 mt-1">uploads this week</p>
          </CardContent>
        </Card>

      </div>

      {/* uploads Grid */}
      <Card className="border-none">
        <CardHeader>
          <CardTitle>All uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <UploadsGrid uploads={uploads} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ImageIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Images</p>
                  <p className="text-sm text-gray-600">{uploads.filter(u => u.type?.startsWith('image/')).length} files</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">1.8 GB</p>
                <Progress value={75} className="w-20 h-2 mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
