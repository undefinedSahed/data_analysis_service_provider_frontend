import React from 'react'

export interface SolutionCardProps {
    solutionName: string
    solutionDescription: string
}

export default function SolutionCard({
    solutionName,
    solutionDescription,
}: SolutionCardProps) {
    return (
        <div className="py-5 lg:px-5 px-4 shadow-[0px_0px_4px_1px_#0000001A] text-center rounded-md bg-white">
            <h3 className='text-2xl font-semibold pb-4 capitalize'>
                {solutionName}
            </h3>
            <p className='text-base'>
                {solutionDescription}
            </p>
        </div>
    )
}
