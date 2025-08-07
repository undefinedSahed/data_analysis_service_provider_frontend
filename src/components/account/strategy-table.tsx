"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface StrategySolution {
    _id: string
    user: string
    email: string
    focusArea: string
    notes: string
    answer: string
    date: string
    dataStrategy: string
    time: string
    strategyDescription: string
    createdAt: string
    name: string
}


interface StrategyTableProps {
    strategySolutions: {
        data: StrategySolution[]
    }
    pagination: {
        totalPages: number
        itemsPerPage: number
        totalItems: number
    }
    currentPage: number
    onPageChange: (page: number) => void
}

export function StrategyTable({ strategySolutions, pagination, currentPage, onPageChange }: StrategyTableProps) {

    const [selectedStrategy, setSelectedStrategy] = useState<StrategySolution | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewDetails = (strategy: StrategySolution) => {
        setSelectedStrategy(strategy)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedStrategy(null)
    }

    if (!strategySolutions?.data) {
        return (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="text-center">No Data Strategy Solutions</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
        )
    }

    return (
        <>
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
                        {strategySolutions?.data?.map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-900">{item?.name}</div>
                                        <div className="text-gray-600">{item?.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-sm text-gray-600 capitalize">{item?.dataStrategy}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-sm text-gray-600 max-w-xs truncate">{item?.strategyDescription}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-sm text-gray-600 max-w-xs truncate">{item?.answer ?? "-"}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-sm text-gray-600">
                                        <div className="text-sm text-gray-600">
                                            {new Date(item?.createdAt)
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
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item)}>
                                            <Eye className="h-4 w-4" />
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
                        totalPages={pagination?.totalPages}
                        perPage={pagination?.itemsPerPage}
                        totalItems={pagination?.totalItems}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">Data Strategy Notes & Requests</DialogTitle>
                    </DialogHeader>

                    {selectedStrategy && (
                        <div className="space-y-6 pt-4">
                            {/* User Info */}
                            <div className="border-b border-gray-200 pb-4">
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">{selectedStrategy?.name}</div>
                                    <div className="text-gray-600">{selectedStrategy?.email}</div>
                                    <div className="text-gray-500 mt-1">
                                        Focus Area: <span className="capitalize">{selectedStrategy?.dataStrategy}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Strategy Description */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Data Strategy Notes & Requests</h3>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedStrategy?.strategyDescription || "No description provided."}
                                </div>
                            </div>

                            {/* Answer */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Answer</h3>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedStrategy?.answer || "No answer provided yet."}
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="text-sm text-gray-500">
                                    Submitted on{" "}
                                    {new Date(selectedStrategy?.createdAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
