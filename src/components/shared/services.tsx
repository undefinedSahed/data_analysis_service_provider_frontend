"use client"

import { fetchServices } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'
import ServiceCard from './service-card'

export interface ServiceType {
    _id: string;
    serviceTitle: string;
    serviceDescription: string;
    imageLink: string;
}

export default function Services() {

    const { data: services, isLoading, isError, error } = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices
    })


    return (
        <section className='py-8 lg:py-20 bg-[#EBF7FD]'>
            <div className="container mx-auto">
                <div className="text-center pb-6 lg:pb-12">
                    <h2 className='text-2xl lg:text-5xl font-bold text-[#424242]'>Services</h2>
                </div>

                {isLoading && <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <h4 className='text-2xl font-medium'>Loading</h4>
                </div>}

                {isError && <div className='text-center'>Error: {error?.message}</div>}

                {services && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services?.data.map((service: ServiceType) => (
                        <ServiceCard
                            key={service._id}
                            serviceTitle={service.serviceTitle}
                            serviceDescription={service.serviceDescription}
                            imageLink={service.imageLink}
                        />
                    ))}
                </div>}

            </div>
        </section>
    )
}
