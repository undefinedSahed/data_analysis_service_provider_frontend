"use client"

import { PaymentTable } from "@/components/account/payment-table"
import { fetchUserPayments } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function PaymentPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5
    const {
        data: userPayments,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["userPayments", currentPage, limit],
        queryFn: () => fetchUserPayments(currentPage, limit),
    })

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="container mx-auto">
            {isLoading ? (
                <div className="flex items-center justify-center gap-6">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <h4 className="text-2xl font-medium">Loading</h4>
                </div>
            ) : isError ? (
                <div className="text-center">Error: {error?.message}</div>
            ) : userPayments?.data?.length === 0 ? (
                <div className="text-center text-xl font-bold">No payments found</div>
            ) : (
                <PaymentTable
                    payments={userPayments}
                    pagination={userPayments.pagination}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
