"use client"

import { fetchService } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function DetailsBanner({ serviceId }: { serviceId: string }) {

    const { data: service, isLoading, isError, error } = useQuery({
        queryKey: ['service', serviceId],
        queryFn: () => fetchService(serviceId),
        select: selectedService => selectedService?.data
    })

    console.log(service)


    return (
        <section className='py-8 pt-36 lg:pb-2'>
            <div className="container mx-auto">

                {isLoading && <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <h4 className='text-2xl font-medium'>Loading</h4>
                </div>}

                {isError && <div className='text-center'>Error: {error?.message}</div>}
                {
                    service &&
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div className="lg:w-2/5 text-center lg:text-start">
                            <h2 className='text-2xl lg:text-6xl font-bold pb-4'>{service.serviceTitle}</h2>
                            <p className='text-xl text-[#424242] pb-4 text-justify lg:text-start'>{service.serviceDescription}</p>
                            <h5 className='text-xl font-semibold pb-4'>Price: ${service.price}</h5>
                            <div className="flex gap-4 justify-center lg:justify-start">
                                <Button className='bg-primary text-white font-bold text-base'>Book A Demo</Button>
                                <Link href={`/checkout?serviceId=${service._id}`}>
                                    <Button className='bg-primary text-white font-bold text-base'>Book Now</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-3/5">
                            <Image
                                src={service.imageLink}
                                alt={service.serviceTitle}
                                width={1000}
                                height={1000}
                                className='w-full aspect-[5/3] object-cover rounded-lg'
                            />
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}
