"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Calendar, User, Eye, Download } from "lucide-react"
import Image from "next/image"
import type { Uploads, Users } from "@prisma/client"
import { FiFile } from "react-icons/fi"
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
import { EditUploadDialog } from "./edit-upload-dialog"

interface UploadCardProps {
  upload: Uploads & { owner: Users }
  viewMode: "grid" | "list"
}

export function UploadCard({ upload, viewMode }: UploadCardProps) {
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
      const response = await fetch(`/api/uploads/${upload.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete upload")
      }

      toast.success("File deleted successfully")
      router.refresh() // Refresh the page to update the uploads list
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete file")
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleDownload = () => {
    if (upload.file) {
      window.open(upload.file, "_blank")
    }
  }

  const handleView = () => {
    if (upload.file) {
      window.open(upload.file, "_blank")
    }
  }

  const dropdownContent = (
    <DropdownMenuContent>
      <DropdownMenuItem onClick={handleView}>
        <Eye className="h-4 w-4 mr-2" />
        View
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </DropdownMenuItem>
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
            This action cannot be undone. This will permanently delete the file "{upload.title}".
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
              <div className="relative w-24 h-16 flex-shrink-0">
                {upload?.type?.startsWith("image/") ? (
                  <Image
                    src={upload.file || "/placeholder.svg"}
                    alt={upload.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 96px) 100vw, 96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <FiFile className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{upload.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {dropdownContent}
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {upload.type?.split("/")[1]?.toUpperCase() || "FILE"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>
                      {upload.owner.firstName} {upload.owner.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(upload.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {deleteDialog}
        <EditUploadDialog upload={upload} open={showEditDialog} onOpenChange={setShowEditDialog} />
      </>
    )
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            {upload?.type?.startsWith("image/") ? (
              <Image
                src={upload.file || "/placeholder.svg"}
                alt={upload.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg">
                <FiFile className="w-16 h-16 text-gray-400" />
              </div>
            )}
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
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{upload.title}</h3>
              <Badge variant="outline" className="text-xs">
                {upload.type?.split("/")[1]?.toUpperCase() || "FILE"}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>
                  {upload.owner.firstName} {upload.owner.lastName}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(upload.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={handleView}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={handleDownload}>
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>
      {deleteDialog}
      <EditUploadDialog upload={upload} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}
