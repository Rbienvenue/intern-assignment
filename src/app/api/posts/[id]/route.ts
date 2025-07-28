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

    const postId = params.id

    // Check if post exists and user owns it
    const existingPost = await prisma.posts.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Delete the post
    await prisma.posts.delete({
      where: { id: postId },
    })

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await auth()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const postId = params.id
    const formData = await req.formData()
    const { thumbnail, title, description } = Object.fromEntries(formData.entries())

    // Check if post exists
    const existingPost = await prisma.posts.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    let thumbnailUrl = existingPost.thumbnail // Keep existing thumbnail by default

    // Handle thumbnail update if a new file is provided
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const bytes = Buffer.from(await thumbnail.arrayBuffer())
      const meta = await put(thumbnail.name, bytes, {
        access: "public",
      })
      thumbnailUrl = meta.url
    }

    // Update the post
    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: {
        thumbnail: thumbnailUrl,
        title: title as string,
        description: description as string,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(
      {
        message: "Post updated successfully",
        post: updatedPost,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update post error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
