// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ImageIcon } from "lucide-react"

// interface Author {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
// }

// interface CreatePostDialogProps {
//   authors: Author[]
//   children: React.ReactNode
// }

// export function CreatePostDialog({ authors, children }: CreatePostDialogProps) {
//   const [open, setOpen] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [selectedAuthor, setSelectedAuthor] = useState("")

//   async function handleSubmit(formData: FormData) {
//     setIsLoading(true)
//     setError("")

//     // Add selected author to form data
//     formData.set("authorId", selectedAuthor)
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Create New Post</DialogTitle>
//           <DialogDescription>Add a new blog post or article to your website.</DialogDescription>
//         </DialogHeader>

//         <form action={handleSubmit} className="space-y-6">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {/* Thumbnail URL */}
//           <div className="space-y-2">
//             <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
//             <div className="relative">
//               <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="thumbnail"
//                 name="thumbnail"
//                 type="url"
//                 placeholder="https://example.com/image.jpg (optional)"
//                 className="pl-10"
//               />
//             </div>
//             <p className="text-xs text-gray-500">Leave blank to use default placeholder image</p>
//           </div>

//           {/* Title */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Post Title</Label>
//             <Input id="title" name="title" placeholder="Enter post title" required />
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               placeholder="Write a brief description of your post..."
//               rows={4}
//               required
//             />
//           </div>

//           {/* Author Selection */}
//           <div className="space-y-2">
//             <Label htmlFor="author">Author</Label>
//             <Select value={selectedAuthor} onValueChange={setSelectedAuthor} required>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select an author" />
//               </SelectTrigger>
//               <SelectContent>
//                 {authors.map((author) => (
//                   <SelectItem key={author.id} value={author.id}>
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                         <span className="text-white text-xs font-medium">{author.firstName.charAt(0)}</span>
//                       </div>
//                       <span>
//                         {author.firstName} {author.lastName}
//                       </span>
//                       <span className="text-gray-500 text-sm">({author.email})</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading || !selectedAuthor}>
//               {isLoading ? "Creating..." : "Create Post"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
