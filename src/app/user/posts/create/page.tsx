import { CreateUserPostForm } from "@/components/user/create-user-post-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/user/posts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600">Share your thoughts with the community</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateUserPostForm />
        </CardContent>
      </Card>
    </div>
  )
}
