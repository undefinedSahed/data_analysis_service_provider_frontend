import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface ServiceCardProps {
    serviceTitle: string
    serviceDescription: string
    imageLink: string
    serviceId: string
}

export default function ServiceCard({
    serviceTitle,
    serviceDescription,
    imageLink,
    serviceId
}: ServiceCardProps) {
    return (
        <div className="py-5 lg:px-12 px-4 shadow-[0px_0px_8px_0px_#00000040] text-center rounded-md bg-white">
            <Link href={`/services/${serviceId}`}>
                <Image
                    src={imageLink}
                    alt={serviceTitle}
                    width={1000}
                    height={1000}
                    className='w-52 aspect-[5/4] object-cover mx-auto mb-8 rounded-sm'
                />
                <h3 className='text-xl lg:text-2xl font-semibold pb-4 capitalize'>
                    {serviceTitle}
                </h3>
                <p className='text-base text-justify'>
                    {serviceDescription}
                </p>
            </Link>
        </div>
    )
}
