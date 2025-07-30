"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Blog {
  _id: string;
  blogTitle: string;
  blogDescription: string;
  imageLink: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogDetailResponse {
  status: boolean;
  message: string;
  data: Blog;
}

async function fetchBlogById(id: string): Promise<BlogDetailResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogById(blogId),
    enabled: !!blogId,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading blog. Please try again.
          </p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  const blog = data?.data;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 mt-[30px]">
          <h1 className="text-3xl md:text-[48px] font-[700] text-[#131313] mb-6 leading-tight">
            Blog Page
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Need assistance? We are here to help. To inquire about the products
            and services found on our website, please contact us by phone or
            e-mail, and we&apos;ll gladly assist you.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
          <Image
            width={1000}
            height={1000}
            src={blog?.imageLink}
            alt={blog?.blogTitle}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Blog Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-left">
          {blog.blogTitle}
        </h2>

        {/* Blog Meta */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(blog.createdAt)}
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Posted by</span>
            <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div
            className="quill-content text-gray-700 max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.blogDescription }}
          />
        </article>
      </div>
    </div>
  );
}
