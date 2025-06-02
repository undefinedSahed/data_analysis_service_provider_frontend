import { Calendar, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface ServiceCardProps {
    blogTitle: string
    imageLink: string
    createdAt: string
}

export default function BlogCard({
    blogTitle,
    imageLink,
    createdAt
}: ServiceCardProps) {

    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <div className="rounded-md">
            <Image
                src={imageLink}
                alt={blogTitle}
                width={1000}
                height={1000}
                className='w-full aspect-[5/2] object-cover mx-auto rounded-md'
            />
            <div className="space-y-3 pt-4">
                <div className="flex items-center gap-8">
                    <div className="flex gap-2 items-center">
                        <User className='h-6 w-6' />
                        <h6>Admin</h6>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Calendar className='h-6 w-6' />
                        <h6>{formatDate(createdAt)}</h6>
                    </div>
                </div>
                <h3 className='text-xl lg:text-4xl font-semibold capitalize'>
                    {blogTitle}
                </h3>
            </div>
        </div>
    )
}
