"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { FileIcon } from "lucide-react"
import type { Uploads, Users } from "@prisma/client"

interface EditUploadDialogProps {
  upload: Uploads & { owner: Users }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditUploadDialog({ upload, open, onOpenChange }: EditUploadDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const file = formData.get("file") as File

    // Check file size if a new file is provided
    if (file && file.size > 0 && file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/uploads/${upload.id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update upload")
      }

      toast.success("File updated successfully")
      onOpenChange(false)
      router.refresh()
    } catch (err) {
      console.error("Update error:", err)
      setError(err instanceof Error ? err.message : "Failed to update file")
      toast.error("Failed to update file")
    } finally {
      setIsLoading(false)
    }
  }

  const getFileTypeDisplay = (type: string | null) => {
    if (!type) return "Unknown"
    return type.split("/")[1]?.toUpperCase() || "FILE"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Upload</DialogTitle>
          <DialogDescription>Update your uploaded file information.</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Current File Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Current File</h4>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded border">
                <FileIcon className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{upload.title}</p>
                <p className="text-xs text-gray-500">
                  Type: {getFileTypeDisplay(upload.type)} • Uploaded: {new Date(upload.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Replace File (Optional)</Label>
            <div className="relative">
              <FileIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input id="file" name="file" type="file" className="pl-10" />
            </div>
            <p className="text-xs text-gray-500">Leave blank to keep current file. Maximum file size: 5MB</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">File Title</Label>
            <Input id="title" name="title" defaultValue={upload.title} placeholder="Enter file title" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update File"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
