"use client"

import { StrategyTable } from "@/components/account/strategy-table"
import { fetchUserStrategies } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export default function StrategySolutionsPage() {

    const { data: userStrategies, isLoading, isError, error } = useQuery({
        queryKey: ['userStrategies'],
        queryFn: fetchUserStrategies,
        select: (data) => data.data
    })

    console.log(userStrategies)


    console.log(userStrategies)

    // These would come from your API response
    const totalPages = 17
    const perPage = 10
    const totalItems = 50

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
                            totalPages={totalPages}
                            perPage={perPage}
                            totalItems={totalItems}
                        />
            }
        </div>
    )
}