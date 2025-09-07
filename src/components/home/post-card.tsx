import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface User {
    id: string
    name?: string
    email?: string
    avatar?: string
}

interface Post {
    id: string
    thumbnail: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    authorId: string
    author: User
}

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const getInitials = (name?: string, email?: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
        }
        if (email) {
            return email.slice(0, 2).toUpperCase()
        }
        return "U"
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="aspect-video overflow-hidden">
                <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
            </div>

            <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name || post.author.email} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(post.author.name, post.author.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{post.author.name || post.author.email}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                </div>

                <h3 className="font-semibold text-lg leading-tight text-balance">{post.title}</h3>
            </CardHeader>

            <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{post.description}</p>
            </CardContent>
        </Card>
    )
}
