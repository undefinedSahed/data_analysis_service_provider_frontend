"use client"

import { ServiceTable } from "@/components/account/service-table"
import { fetchUserPayments } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"



export default function ServicePage() {


    const { data: userServices, isLoading, isError, error } = useQuery({
        queryKey: ['userServices'],
        queryFn: fetchUserPayments,
        select: (data) => data.payments
    })

    console.log(userServices)


    // These would come from your API response
    const totalPages = 2
    const perPage = 10
    const totalItems = 20

    return (

        <div className="container mx-auto">
            {
                isLoading ?

                    <div className="flex items-center justify-center gap-6">
                        < Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <h4 className='text-2xl font-medium'>Loading</h4>
                    </div >

                    : isError ?
                        <div className='text-center'>Error: {error?.message}</div>
                        : userServices?.length === 0 ?
                            <div className='text-center text-xl font-bold'>No payments found</div>
                            : <ServiceTable services={userServices} totalPages={totalPages} perPage={perPage} totalItems={totalItems} />
            }
        </div>
    )
}
