"use client"

import { fetchBlogs } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { BlogCard } from '../shared/blog-card'


interface BlogType {
    _id: string;
    blogTitle: string;
    blogDescription: string;
    imageLink: string;
    createdAt: string;
}

export type BlogResponse = {
    status: boolean;
    message: string;
    data: BlogType[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};


export default function BlogForSolutionPage() {

    const { data: blogResponse, isLoading, isError, error } = useQuery<BlogResponse, Error, BlogResponse, [string, number, number]>({
        queryKey: ['blogs', 1, 4],
        queryFn: ({ queryKey }) => {
            const [, page, limit] = queryKey
            return fetchBlogs(page, limit)
        }
    })

    console.log(blogResponse?.data)


    return (
        <section className='py-8 lg:py-20'>
            <div className="container mx-auto">
                <div className="text-center pb-6 lg:pb-12">
                    <h2 className='text-2xl lg:text-5xl font-bold text-[#424242]'>Blogs</h2>
                </div>

                {isLoading && <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <h4 className='text-2xl font-medium'>Loading</h4>
                </div>}

                {isError && <div className='text-center'>Error: {error?.message}</div>}

                {blogResponse && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-14">
                        {blogResponse.data.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
