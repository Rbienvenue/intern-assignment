import prisma from "@/lib/db";
import bcrypt from 'bcryptjs'

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
    try{
        const body = await req.json()
    const {email, password, firstName, lastName} = body
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.users.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashed
        }
    })

    return NextResponse.json({data: user})
    }
    catch(e){
        console.error({message: e})
        return NextResponse.json({message: "internal server error"}, {status: 500})
    }
}