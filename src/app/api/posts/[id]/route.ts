import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { auth } from "@/lib/auth"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await auth()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const postId = params.id

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
