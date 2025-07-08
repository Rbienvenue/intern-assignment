"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Calendar, User, Eye } from "lucide-react"
import Image from "next/image"
import { Uploads, Users } from "@prisma/client";
import { FiFile } from "react-icons/fi";

interface UploadCardProps {
  upload: Uploads & { owner: Users }
  viewMode: "grid" | "list"
}
export function UploadCard({ upload, viewMode }: UploadCardProps) {

  console.log(upload)
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

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="flex gap-4">
            <div className="relative w-24 h-16 flex-shrink-0">
              {
                upload?.type?.startsWith('image/') ? <Image
                  src={upload.file || "/placeholder.svg"}
                  alt={upload.title}
                  fill
                  className="object-cover  rounded-md "
                  sizes="(max-width: 96px) 100vw, 96px"
                /> :
                  <div className="w-full h-full">
                    <FiFile className="w-full h-full" />
                  </div>
              }
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
                </DropdownMenu>
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
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">

          {
            upload?.type?.startsWith('image/') ?
              <Image
                src={upload.file || "/placeholder.svg"}
                alt={upload.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              /> :
              <div className="w-full h-full">
                <FiFile className="w-full h-full" />
              </div>
          }
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{upload.title}</h3>

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
    </Card>
  )
}
