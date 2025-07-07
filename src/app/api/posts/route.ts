import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
    try {

        const user = await auth()

        if(!user){
            redirect('/login')
        }
        const formData = await req.formData()
        const { thumbnail, title, description} = Object.fromEntries(formData.entries())
        let thumbnailUrl = null
        if (thumbnail instanceof File) {
            const bytes = Buffer.from(await thumbnail.arrayBuffer())
            const meta = await put(thumbnail.name, bytes, {
                access: 'public',
            })

            thumbnailUrl = meta.url
        }

        const post = await prisma.posts.create({
            data: {
                thumbnail: thumbnailUrl || '',
                title: title,
                description: description,
                authorId: user.id
            }
        })
        return NextResponse.json({ message: 'post created'}, {status: 200})
    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'internal server error'},{status: 500})
    }
}