"use client"

import { AdminPaymentTable } from "@/components/dashboard/admin-payment-table"
import { Card, CardContent } from "@/components/ui/card"
import { fetchAllPayments } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 6

  const {
    data: allPayments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allPayments", currentPage, limit],
    queryFn: () => fetchAllPayments(currentPage, limit),
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Calculate total sales from payments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalSales = allPayments?.data?.reduce((sum: number, payment: any) => sum + payment.amount, 0) || 0


  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Dashboard &gt; Payments</p>
        </div>
      </div>

      {/* Total Sales Card */}
      <Card className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0">
        <CardContent className="p-6">
          <div>
            <p className="text-cyan-100 text-sm font-medium">Total Sales</p>
            <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center gap-6 py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <h4 className="text-2xl font-medium">Loading</h4>
          </div>
        ) : isError ? (
          <div className="text-center py-12">Error: {error?.message}</div>
        ) : allPayments?.payments?.length === 0 ? (
          <div className="text-center text-xl font-bold py-12">No payments found</div>
        ) : (
          <AdminPaymentTable
            payments={allPayments}
            pagination={allPayments.pagination}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
