"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomPagination } from "@/components/shared/pagination"

interface Payment {
    _id: string
    userId: {
        _id: string
        firstName: string
        lastName: string
        email: string
    }
    serviceId: {
        _id: string
        serviceTitle: string
        serviceDescription: string
        price: number
    }
    amount: number
    transactionId: string
    status: string
    createdAt: string
    updatedAt: string
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

export function AdminPaymentTable({ payments, pagination, currentPage, onPageChange }: PaymentTableProps) {


    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="text-left font-semibold text-gray-700">User</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Service</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Total</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Payment Method</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.data?.map((payment) => (
                        <TableRow key={payment._id} className="hover:bg-gray-50">
                            <TableCell>
                                <div>
                                    <div className="font-medium text-gray-900">{`${payment.userId.firstName} ${payment.userId.lastName}`}</div>
                                    <div className="text-sm text-gray-500">{payment.userId.email}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-900">{payment?.serviceId?.serviceTitle}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="font-medium text-gray-900">${payment.amount}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-600">Stripe</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    {new Date(payment.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </div>
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
