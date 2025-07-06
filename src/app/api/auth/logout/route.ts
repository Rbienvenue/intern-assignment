import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest){
    (await cookies()).delete('auth-token')

    return NextResponse.json({message: 'logged out'})
}