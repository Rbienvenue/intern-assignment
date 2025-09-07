"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, FileText } from "lucide-react"
import { useSession } from "@/context/session-context"
import { useRouter } from "next/navigation"



export function Navbar() {

    const router = useRouter()
    const {user} = useSession()
    const isLoggedin = !!user
     async function handleLogout() {
        const res = await fetch('/api/auth/logout')
        if (res.ok) {
            router.replace('/login')
        }

    }
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="relative h-8 w-8">
                            <Image src="/modern-blog-logo.jpg" alt="Blog Logo" fill className="rounded-md object-cover" />
                        </div>
                        <span className="text-xl font-bold text-foreground">BlogSpace</span>
                    </Link>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isLoggedin ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="/placeholder.svg" alt={user.name} />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">{user.name}</p>
                                            <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/posts" className="flex items-center">
                                            <FileText className="mr-2 h-4 w-4" />
                                            <span>My Posts</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup">Create Account</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
