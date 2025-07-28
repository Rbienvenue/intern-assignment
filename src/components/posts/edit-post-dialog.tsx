"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageIcon } from "lucide-react"

interface Post {
  id: string
  thumbnail: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  authorId: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

interface EditPostDialogProps {
  post: Post
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPostDialog({ post, open, onOpenChange }: EditPostDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update post")
      }

      toast.success("Post updated successfully")
      onOpenChange(false)
      router.refresh()
    } catch (err) {
      console.error("Update error:", err)
      setError(err instanceof Error ? err.message : "Failed to update post")
      toast.error("Failed to update post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>Update your blog post or article.</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input id="thumbnail" name="thumbnail" type="file" className="pl-10" accept="image/*" />
            </div>
            <p className="text-xs text-gray-500">
              Leave blank to keep current thumbnail. Current: {post.thumbnail ? "Image set" : "No image"}
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input id="title" name="title" defaultValue={post.title} placeholder="Enter post title" required />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={post.description}
              placeholder="Write a brief description of your post..."
              rows={4}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
