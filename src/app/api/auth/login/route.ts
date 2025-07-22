import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req : NextRequest) {
    try{
        const cookiesStore = await cookies()
        const {email, password} = await req.json()
        const user = await prisma.users.findUnique({
            where: {email}
        })

        if(!user){
            return NextResponse.json({message: 'invalid email'}, {status: 400})
        }

        const isValid =await bcrypt.compare(password, user.password)

        if(!isValid){
            return NextResponse.json({message: 'invalid password'}, {status: 400})
        }

        const token = jwt.sign({
            id: user.id,
            sub: user.id,
            name: user.firstName+user.lastName,
            email: user.email
        },process.env.JWT_SECRET!, {
            expiresIn: '1d'
        })
        cookiesStore.set('auth-token', token, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'lax'
        })

        return NextResponse.json({message: 'successfull login', token}, {status: 200})
    }
    catch(e){
        console.error(e)   
        return NextResponse.json({message: 'unable to login'}, {status: 500})     
    }
}