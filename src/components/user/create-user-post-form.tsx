"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageIcon, Save } from "lucide-react"

export function CreateUserPostForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create post")
      }

      toast.success("Post created successfully!")
      router.push("/user/posts")
    } catch (err) {
      console.error("Create post error:", err)
      setError(err instanceof Error ? err.message : "Failed to create post")
      toast.error("Failed to create post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
        <p className="text-xs text-gray-500">Upload an image to represent your post</p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input id="title" name="title" placeholder="Enter an engaging title..." required />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Write a brief description of your post..."
          rows={3}
          required
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your full post content here..."
          rows={10}
          className="min-h-[200px]"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            "Creating..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Create Post
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
