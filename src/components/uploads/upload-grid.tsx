"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UploadCard } from "./upload-card"
import { Search, Grid, List, FileText } from "lucide-react"
import { Users, Uploads } from "@prisma/client";

interface UploadsGridProps {
  uploads: Array<Uploads & {owner: Users}>
}

export function UploadsGrid({uploads}: UploadsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter Uploads based on search term
  const filteredUploads = uploads.filter(
    (upload) =>
      upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${upload.owner.firstName} ${upload.owner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Uploads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filteredUploads.length} Uploads</Badge>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Uploads Display */}
      {filteredUploads.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{searchTerm ? "No Uploads found" : "No Uploads yet"}</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first Upload."}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
          }
        >
          {filteredUploads.map((upload) => (
            <UploadCard key={upload.id} upload={upload}  viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
