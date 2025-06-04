"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Payment {
    id: number
    service: string
    total: string
    paymentMethod: string
    date: string
    time: string
}

interface PaymentTableProps {
    payments: Payment[]
    totalPages: number
    perPage: number
    totalItems: number
}

export function PaymentTable({ payments, totalPages, perPage, totalItems }: PaymentTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Here you would typically fetch new data for the selected page
        console.log(`Fetching page ${page}`)
    }

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Payment Method</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>
                                <span className="text-gray-900">{payment.service}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-900">{payment.total}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-600">{payment.paymentMethod}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    <div>{payment.date}</div>
                                    <div>{payment.time}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    perPage={perPage}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
