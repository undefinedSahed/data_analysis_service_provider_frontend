"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Payment {
    _id: number
    service: string
    amount: string
    paymentMethod: string
    date: string
    time: string
    serviceId: {
        serviceTitle: string
    }
    createdAt: string
    status: string
}

interface PaymentTableProps {
    payments: {
        data: Payment[]
    }
    pagination: {
        totalPages: number
        itemsPerPage: number
        totalItems: number
    }
    currentPage: number
    onPageChange: (page: number) => void
}

export function PaymentTable({ payments, pagination, currentPage, onPageChange }: PaymentTableProps) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="text-center">Service</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Payment Method</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.data?.map((payment) => (
                        <TableRow key={payment._id}>
                            <TableCell className="text-center">
                                <span className="text-gray-900">{payment?.serviceId?.serviceTitle}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-900">${payment?.amount}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-600">Stripe</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    {new Date(payment?.createdAt)
                                        .toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                        .replace(",", " |")}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-600">{payment.status}</span>
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
                    totalPages={pagination.totalPages}
                    perPage={pagination.itemsPerPage}
                    totalItems={pagination.totalItems}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}
