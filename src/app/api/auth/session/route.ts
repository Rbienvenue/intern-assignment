import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const user = await auth()
    return NextResponse.json({data: user})
}