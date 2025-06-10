import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

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
        <div className="pb-5 shadow-[0px_0px_8px_0px_#00000040] text-center rounded-md bg-white">
            <Link href={`/services/${serviceId}`}>
                <Image
                    src={imageLink}
                    alt={serviceTitle}
                    width={1000}
                    height={1000}
                    className='w-full aspect-[5/3] object-cover mx-auto mb-5 rounded-t-sm'
                />

                <div className="lg:px-8 px-4 flex flex-col justify-between">
                    <h3 className='text-xl lg:text-2xl font-semibold pb-4 capitalize'>
                        {serviceTitle}
                    </h3>
                    <p className='text-base text-justify'>
                        {serviceDescription}
                    </p>
                    <div className="flex gap-3 items-center justify-center pt-5">
                        <Button>
                            <Link href={`/checkout?serviceId=${serviceId}`}>Book Now</Link>
                        </Button>
                        <Button>
                            <Link href={`/services/${serviceId}`}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    )
}
