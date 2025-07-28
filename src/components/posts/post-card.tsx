"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Calendar, User } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditPostDialog } from "./edit-post-dialog"

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

interface PostCardProps {
  post: Post
  viewMode: "grid" | "list"
}

export function PostCard({ post, viewMode }: PostCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      toast.success("Post deleted successfully")
      router.refresh() // Refresh the page to update the posts list
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete post")
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const dropdownContent = (
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setShowDeleteDialog(true)}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  const deleteDialog = (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post "{post.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  if (viewMode === "list") {
    return (
      <>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {dropdownContent}
                  </DropdownMenu>
                </div>
                <p className="text-sm text-gray-600 mb-3">{truncateText(post.description, 120)}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>
                      {post.author.firstName} {post.author.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {deleteDialog}
        <EditPostDialog post={post} open={showEditDialog} onOpenChange={setShowEditDialog} />
      </>
    )
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={post.thumbnail || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {dropdownContent}
            </DropdownMenu>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>
                  {post.author.firstName} {post.author.lastName}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {deleteDialog}
      <EditPostDialog post={post} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}
