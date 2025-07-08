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
        const { file, title} = Object.fromEntries(formData.entries())
        let fileUrl = null
        if (file instanceof File) {
            const size = file.size
            const bytes = Buffer.from(await file.arrayBuffer())
            const meta = await put(file.name, bytes, {
                access: 'public',
                addRandomSuffix: true
            })

            fileUrl = meta.url
        }

        const upload = await prisma.uploads.create({
            data: {
                file: fileUrl || '',
                title: title,
                ownerId: user.id,
                type: file.type
            }
        })
        return NextResponse.json({ message: 'file uploaded'}, {status: 200})
    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'internal server error'},{status: 500})
    }
}