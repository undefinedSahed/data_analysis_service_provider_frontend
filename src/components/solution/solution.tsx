"use client"

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'
import SolutionCard from './solution-card'
import { fetchSolutions } from '@/lib/api'

export interface SolutionType {
    _id: string;
    solutionName: string;
    solutionDescription: string;
}

export default function Solutions() {

    const { data: solutions, isLoading, isError, error } = useQuery({
        queryKey: ['solutions'],
        queryFn: fetchSolutions
    })

    return (
        <section className='py-8 lg:py-20 bg-[#EBF7FD]'>
            <div className="container mx-auto">
                <div className="text-center pb-6 lg:pb-12">
                    <h2 className='text-2xl lg:text-5xl font-bold text-[#424242]'>Solutions</h2>
                </div>

                {isLoading && <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <h4 className='text-2xl font-medium'>Loading</h4>
                </div>}

                {
                    solutions?.data.length === 0 && <div className='text-center font-bold text-xl'>No solutions found</div>
                }

                {isError && <div className='text-center'>Error: {error?.message}</div>}

                {solutions && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions?.data.map((service: SolutionType) => (
                        <SolutionCard
                            key={service._id}
                            solutionName={service.solutionName}
                            solutionDescription={service.solutionDescription}
                        />
                    ))}
                </div>}

            </div>
        </section>
    )
}
