"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageIcon } from "lucide-react"
import { NextResponse } from "next/server"

interface Author {
    id: string
    firstName: string
    lastName: string
    email: string
}

interface CreateUploadDialogProps {
    children: React.ReactNode
}

export function CreateUploadDialog({ children }: CreateUploadDialogProps) {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault()
        const formdata = new FormData(event.target)

        const file = formdata.get('file')
        if (!file || !(file instanceof File)) {
            toast.error('please select a file!')
            return
        }

        const size = file.size
        if (size > 5 * 1024 * 1024) {
            toast.error('file is too large')
            return
        }
        const res = await fetch('/api/uploads', {
            method: 'POST',
            body: formdata
        })

        if (!res.ok) {
            toast.error('FILE NOT UPLOADED!')
            setIsLoading(false)
            return
        }
        toast.info('file uploaded successfully')
        setIsLoading(false)
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Upload new file</DialogTitle>
                    <DialogDescription>Use files with size less than 5 mbs.</DialogDescription>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* file URL */}
                    <div className="space-y-2">
                        <Label htmlFor="file">upload file</Label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">upload Title</Label>
                        <Input id="title" name="title" placeholder="Enter upload title" required />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "uploading..." : "upload"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
