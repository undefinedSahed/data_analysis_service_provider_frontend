"use client"

import { useQuery } from "@tanstack/react-query"
import { BlogCard } from "@/components/shared/blog-card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface Blog {
  _id: string
  blogTitle: string
  blogDescription: string
  imageLink: string
  createdAt: string
  updatedAt: string
}

interface BlogResponse {
  status: boolean
  message: string
  data: Blog[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

async function fetchBlogs(): Promise<BlogResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/get`)
  if (!response.ok) {
    throw new Error("Failed to fetch blogs")
  }
  return response.json()
}

export default function BlogListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading blogs. Please try again.</p>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-[50px]">Latest Blogs</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our team is always ready to assist you with any questions or concerns you might have. Fill out the form
              below and we&apos;ll get back to you as soon as possible
            </p>
          </div>

          {/* Hero Images Grid */}
          <div className="">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src="/images/blog-hero.png"
                alt="Business team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-rows-2 gap-6">
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=176&width=400"
                  alt="Business meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=176&width=400"
                  alt="Team discussion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="pb-5 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Blogs Post</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is always ready to assist you with any questions or concerns you might have. Fill out the form
              below and we&apos;ll get back to you as soon as possible
            </p>
          </div>

          {/* Blog Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.data.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
