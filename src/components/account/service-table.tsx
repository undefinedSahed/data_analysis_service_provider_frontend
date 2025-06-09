"use client"

import { Badge } from "@/components/ui/badge"
import { CustomPagination } from "../shared/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface Service {
    id: number
    name: string
    description: string
    date: string
    time: string
    status: "pending" | "accepted"
    serviceId: {
        serviceTitle: string
        serviceDescription: string
        imageLink: string
    }
    createdAt: string
}

interface ServiceTableProps {
    services: {
        data: Service[]
    }
    pagination: {
        totalPages: number
        itemsPerPage: number
        totalItems: number
    }
    currentPage: number
    onPageChange: (page: number) => void
}

export function ServiceTable({ services, pagination, currentPage, onPageChange }: ServiceTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString)
            .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            .replace(",", " |")
    }

    return (
        <div className="w-full">
            {/* Mobile Card Layout */}
            <div className="block lg:hidden space-y-4">
                {services?.data?.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={service.serviceId.imageLink || "/placeholder.svg"}
                                        alt="Service Logo"
                                        width={60}
                                        height={60}
                                        className="h-15 w-15 rounded-lg object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-base leading-tight">
                                            {service.serviceId.serviceTitle}
                                        </h3>
                                        <Badge
                                            variant={service.status === "pending" ? "destructive" : "default"}
                                            className={`ml-2 ${service.status === "accepted" ? "bg-green-500 hover:bg-green-600" : ""}`}
                                        >
                                            {service.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                                        {service.serviceId.serviceDescription}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(service.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden lg:block border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-[55%] px-6 py-4">Service</TableHead>
                            <TableHead className="text-center px-4 py-4">Date & Time</TableHead>
                            <TableHead className="text-center px-4 py-4">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.data?.map((service) => (
                            <TableRow key={service.id} className="hover:bg-gray-50 transition-colors">
                                <TableCell className="px-6 py-6">
                                    <div className="flex items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={service.serviceId.imageLink || "/placeholder.svg"}
                                                alt="Service Logo"
                                                width={80}
                                                height={80}
                                                className="h-20 w-20 rounded-lg object-cover shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-lg mb-3 leading-tight">
                                                {service.serviceId.serviceTitle}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                {service.serviceId.serviceDescription}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center px-4 py-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium">
                                                {new Date(service.createdAt).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date(service.createdAt).toLocaleTimeString("en-GB", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center px-4 py-6">
                                    <Badge
                                        variant={service.status === "pending" ? "destructive" : "default"}
                                        className={`px-3 py-1 text-sm ${service.status === "accepted" ? "bg-green-500 hover:bg-green-600" : ""
                                            }`}
                                    >
                                        {service.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 px-4 lg:px-6 py-4 border-t border-gray-200 rounded-b-lg lg:rounded-b-none">
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

