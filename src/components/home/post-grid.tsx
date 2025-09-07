import { PostCard } from "./post-card"

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

interface PostsGridProps {
    posts: Post[]
}

export function PostsGrid({ posts }: PostsGridProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
