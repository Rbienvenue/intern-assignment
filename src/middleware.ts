import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { url } from "inspector";

const publicRoutes = ['/']
const authRoutes = ['/login', '/signup']
export default async function middleware(req: NextRequest){
    const user = await auth()
    const isLoggedIn = !!user
    const {nextUrl} = req
    const isPublicRoute = publicRoutes.some(route=>{
        return route === nextUrl.pathname
    })
    const isAuthRoute = authRoutes.some(route => {
        return route === nextUrl.pathname
    })

    if(isPublicRoute) return NextResponse.next()
    if(isAuthRoute){
        if(isLoggedIn) return NextResponse.redirect(new URL('/dashboard', nextUrl))
        return NextResponse.next()
    }
    if(!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', nextUrl))
    }
    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    runtime: 'nodejs'
}

