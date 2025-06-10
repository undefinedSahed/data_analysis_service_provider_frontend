"use client"

import { fetchUserStaffingNeed } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { UserStaffingNeedTable } from './user-staffing-need-table'

export default function UserStaffingNeedPage() {

    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5

    const { data: allStaffingNeed, isLoading, isError, error } = useQuery({
        queryKey: ["allStaffingNeed"],
        queryFn: () => fetchUserStaffingNeed(currentPage, limit)
    })


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
                {isLoading ? (
                    <div className="flex items-center justify-center gap-6 py-12">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <h4 className="text-2xl font-medium">Loading</h4>
                    </div>
                ) : isError ? (
                    <div className="text-center py-12">Error: {error?.message}</div>
                ) : allStaffingNeed?.data?.length === 0 ? (
                    <div className="text-center text-xl font-bold py-12">No payments found</div>
                ) : (
                    <UserStaffingNeedTable
                        staffingNeeds={allStaffingNeed}
                        currentPage={currentPage}
                        pagination={allStaffingNeed?.pagination}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}
