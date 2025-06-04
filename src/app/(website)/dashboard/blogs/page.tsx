"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchBlogs, deleteBlog } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogs(currentPage, 10),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success("Blog deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete blog")
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const blogs = blogsData?.data || []
  const meta = blogsData?.meta || {}

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-1">Dashboard &gt; Blogs</p>
        </div>
        <Link href="/dashboard/blogs/add">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
            <div className="col-span-4">Blog Name</div>
            <div className="col-span-2">Views</div>
            <div className="col-span-3">Added</div>
            <div className="col-span-3">Actions</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {blogs.map((blog: any) => (
            <div key={blog._id} className="grid grid-cols-12 gap-4 items-center py-4 border-b last:border-b-0">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  {blog.imageLink ? (
                    <Image
                      src={blog.imageLink || "/placeholder.svg"}
                      alt={blog.blogTitle}
                      width={64}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-1">{blog.blogTitle}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{blog.blogDescription}</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="secondary">45</Badge>
              </div>
              <div className="col-span-3 text-sm text-gray-600">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <Link href={`/dashboard/blogs/${blog._id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={`/dashboard/blogs/edit/${blog._id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the blog.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(blog._id)} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {[...Array(meta.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(meta.totalPages, currentPage + 1))}
                className={currentPage === meta.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, meta.total)} of {meta.total} results
      </div>
    </div>
  )
}
