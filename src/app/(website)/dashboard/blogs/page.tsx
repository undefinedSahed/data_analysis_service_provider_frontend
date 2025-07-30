"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, deleteBlog, updateBlog } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, Trash2, Plus, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/dashboard/rich-text-editor";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  // Edit state
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    blogTitle: "",
    blogDescription: "",
  });
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // View state
  const [viewingBlog, setViewingBlog] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogs(currentPage, 10),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete blog");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
      image,
    }: {
      id: string;
      data: any;
      image?: File;
    }) => updateBlog(id, data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully");
      setIsEditDialogOpen(false);
      setEditingBlog(null);
      setEditFormData({ blogTitle: "", blogDescription: "" });
      setEditImage(null);
      setEditImagePreview(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update blog");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleViewClick = (blog: any) => {
    setViewingBlog(blog);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (blog: any) => {
    setEditingBlog(blog);
    setEditFormData({
      blogTitle: blog.blogTitle,
      blogDescription: blog.blogDescription,
    });
    setEditImagePreview(blog.imageLink);
    setEditImage(null);
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditDescriptionChange = (value: string) => {
    setEditFormData((prev) => ({ ...prev, blogDescription: value }));
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editFormData.blogTitle || !editFormData.blogDescription) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateMutation.mutate({
      id: editingBlog._id,
      data: editFormData,
      image: editImage || undefined,
    });
  };

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
    );
  }

  const blogs = blogsData?.data || [];
  const meta: Meta = blogsData?.meta || {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

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
        <CardHeader className="pb-3">
          <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
            <div className="col-span-7">Blog Name</div>
            <div className="col-span-2">Added</div>
            <div className="col-span-3 ml-4">Actions</div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border-t border-gray-200 mb-4"></div>
          <div className="space-y-4">
            {blogs.map((blog: any) => (
              <div
                key={blog._id}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b last:border-b-0"
              >
                <div className="col-span-7 flex items-center gap-3">
                  <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    {blog.imageLink ? (
                      <Image
                        src={blog.imageLink || "/placeholder.svg"}
                        alt={blog.blogTitle}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {blog.blogTitle}
                    </h3>
                    <div
                      className="text-sm text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.blogDescription
                            ?.replace(/<[^>]*>/g, "")
                            .substring(0, 100) + "...",
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col-span-2">
                  <Badge variant="secondary">45</Badge>
                </div> */}
                <div className="col-span-2 text-sm text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div className="col-span-3 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewClick(blog)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(blog)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the blog.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(blog._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Blog Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Details</DialogTitle>
          </DialogHeader>
          {viewingBlog && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Blog Title
                    </Label>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                      {viewingBlog.blogTitle}
                    </h2>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Created At
                    </Label>
                    <p className="text-sm text-gray-700">
                      {new Date(viewingBlog.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Last Updated
                    </Label>
                    <p className="text-sm text-gray-700">
                      {new Date(viewingBlog.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Blog Image
                  </Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    {viewingBlog.imageLink ? (
                      <Image
                        src={viewingBlog.imageLink || "/placeholder.svg"}
                        alt={viewingBlog.blogTitle}
                        width={400}
                        height={250}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Blog Content
                </Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: viewingBlog.blogDescription,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                <div>
                  <Label htmlFor="edit-blogTitle">Blog Title</Label>
                  <Input
                    id="edit-blogTitle"
                    name="blogTitle"
                    value={editFormData.blogTitle}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-blogDescription">Blog Content</Label>
                  <div className="mt-2">
                    <RichTextEditor
                      value={editFormData.blogDescription}
                      onChange={handleEditDescriptionChange}
                      placeholder="Write your blog content here..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Blog Image</Label>
                <div className="mt-2 space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    {editImagePreview ? (
                      <Image
                        src={editImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image selected</span>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("edit-blog-image-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <input
                    id="edit-blog-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update Blog"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
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
                onClick={() =>
                  setCurrentPage(Math.min(meta.totalPages, currentPage + 1))
                }
                className={
                  currentPage === meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * 10 + 1} to{" "}
        {Math.min(currentPage * 10, meta.total)} of {meta.total} results
      </div>
    </div>
  );
}
