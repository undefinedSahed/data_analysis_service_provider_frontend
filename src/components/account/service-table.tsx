"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Database } from "lucide-react"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Service {
    id: number
    name: string
    description: string
    date: string
    time: string
    status: "Pending" | "Accepted"
}

interface ServiceTableProps {
    services: Service[]
    totalPages: number
    perPage: number
    totalItems: number
}

export function ServiceTable({ services, totalPages, perPage, totalItems }: ServiceTableProps) {
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
                        <TableHead className="w-[50%]">Service</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Database className="h-12 w-12 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-gray-600">
                                    <div>{service.date}</div>
                                    <div>{service.time}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    variant={service.status === "Pending" ? "destructive" : "default"}
                                    className={service.status === "Accepted" ? "bg-green-500 hover:bg-green-600" : ""}
                                >
                                    {service.status}
                                </Badge>
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
