"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSession } from "next-auth/react"

interface StrategySolution {
    id: number
    user: string
    email: string
    focusArea: string
    notes: string
    answer: string
    date: string
    time: string
}

interface StrategyTableProps {
    strategySolutions: StrategySolution[]
    totalPages: number
    perPage: number
    totalItems: number
}

export function StrategyTable({ strategySolutions, totalPages, perPage, totalItems }: StrategyTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Here you would typically fetch new data for the selected page
        console.log(`Fetching page ${page}`)
    }

    const session = useSession()

    console.log(session)

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead className="text-center">Data Strategy Focus Area</TableHead>
                        <TableHead className="text-center">Data Strategy Notes & Requests</TableHead>
                        <TableHead className="text-center">Answer</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {strategySolutions.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">{item.user}</div>
                                    <div className="text-gray-600">{item.email}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">{item.focusArea}</div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">{item.notes}</div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">{item.answer}</div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    <div>{item.date}</div>
                                    <div>{item.time}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
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
                    totalPages={totalPages}
                    perPage={perPage}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
