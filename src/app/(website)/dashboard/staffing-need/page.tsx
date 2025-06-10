"use client"

import { AdminStaffingNeedTable } from '@/components/dashboard/staffing-need-table'
import { fetchAllStaffingNeed } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

export default function AdminStaffingNeedPage() {

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 6

  const { data: allStaffingNeed, isLoading, isError, error } = useQuery({
    queryKey: ["allStaffingNeed"],
    queryFn: () => fetchAllStaffingNeed(currentPage, limit)
  })


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staffing Need</h1>
          <p className="text-gray-600 mt-1">Dashboard &gt; Staffing Need</p>
        </div>
      </div>
      {/* Payments Table */}
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
          <AdminStaffingNeedTable
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
