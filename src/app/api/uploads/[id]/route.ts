import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { auth } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await auth()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const uploadId = params.id

    // Check if upload exists
    const existingUpload = await prisma.uploads.findUnique({
      where: { id: uploadId },
    })

    if (!existingUpload) {
      return NextResponse.json({ message: "Upload not found" }, { status: 404 })
    }

    // Optional: Check if user owns the upload (remove this if admins can delete any upload)
    // if (existingUpload.ownerId !== user.id) {
    //   return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    // }

    // Delete the upload from database
    await prisma.uploads.delete({
      where: { id: uploadId },
    })

    // Note: In a production environment, you might also want to delete the actual file from Vercel Blob
    // This would require additional logic to handle the blob deletion

    return NextResponse.json({ message: "Upload deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Delete upload error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await auth()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const uploadId = params.id
    const formData = await req.formData()
    const { file, title } = Object.fromEntries(formData.entries())

    // Check if upload exists
    const existingUpload = await prisma.uploads.findUnique({
      where: { id: uploadId },
    })

    if (!existingUpload) {
      return NextResponse.json({ message: "Upload not found" }, { status: 404 })
    }

    let fileUrl = existingUpload.file // Keep existing file by default
    let fileType = existingUpload.type // Keep existing type by default

    // Handle file update if a new file is provided
    if (file instanceof File && file.size > 0) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ message: "File size too large (max 5MB)" }, { status: 400 })
      }

      const bytes = Buffer.from(await file.arrayBuffer())
      const meta = await put(file.name, bytes, {
        access: "public",
        addRandomSuffix: true,
      })
      fileUrl = meta.url
      fileType = file.type
    }

    // Update the upload
    const updatedUpload = await prisma.uploads.update({
      where: { id: uploadId },
      data: {
        file: fileUrl,
        title: title as string,
        type: fileType,
      },
      include: {
        owner: true,
      },
    })

    return NextResponse.json(
      {
        message: "Upload updated successfully",
        upload: updatedUpload,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update upload error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
