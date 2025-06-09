"use client"

import { StrategyTable } from "@/components/account/strategy-table"
import { fetchUserStrategies } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function StrategySolutionsPage() {

    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5

    const { data: userStrategies, isLoading, isError, error } = useQuery({
        queryKey: ['userStrategies'],
        queryFn: () => fetchUserStrategies(currentPage, limit),
        select: (data) => data
    })

    console.log(userStrategies)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


    return (
        <div className="container mx-auto">
            {isLoading ?

                <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <h4 className='text-2xl font-medium'>Loading</h4>
                </div>

                : isError ?
                    <div className='text-center'>Error: {error?.message}</div>
                    : !userStrategies ?
                        <div className='text-center text-xl font-bold'>No strategy solutions found</div>
                        :

                        <StrategyTable
                            strategySolutions={userStrategies}
                            pagination={userStrategies.pagination}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
            }
        </div>
    )
}