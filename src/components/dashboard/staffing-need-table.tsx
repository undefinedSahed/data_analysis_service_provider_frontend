"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomPagination } from "@/components/shared/pagination"
import ViewStaffingNeed from "./view-staffingNeed-dialog"

interface StaffNeed {
    _id: string
    firstName: string
    lastName: string
    businessEmail: string
    companyName: string
    staffDescription: string
    createdAt: string
}

interface StaffingNeedsTableProps {
    staffingNeeds: {
        data: StaffNeed[]
    }
    pagination: {
        totalPages: number
        itemsPerPage: number
        totalItems: number
    }
    currentPage: number
    onPageChange: (page: number) => void
}

export function AdminStaffingNeedTable({ staffingNeeds, pagination, currentPage, onPageChange }: StaffingNeedsTableProps) {

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="text-left font-semibold text-gray-700">User</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Company Name</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Data-Driven Staffing Need</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Time</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staffingNeeds?.data?.map((staffingNeed) => (
                        <TableRow key={staffingNeed._id} className="hover:bg-gray-50">
                            <TableCell>
                                <div>
                                    <div className="font-medium text-gray-900">{`${staffingNeed.firstName} ${staffingNeed.lastName}`}</div>
                                    <div className="text-sm text-gray-500">{staffingNeed.businessEmail}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="text-gray-900">{staffingNeed.companyName}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className="font-medium text-gray-900 line-clamp-1">{staffingNeed.staffDescription}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    {new Date(staffingNeed.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <ViewStaffingNeed businessEmail={staffingNeed.businessEmail} staffDescription={staffingNeed.staffDescription} />
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
