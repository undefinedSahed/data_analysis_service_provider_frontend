"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number
    totalPages: number
    perPage: number
    totalItems: number
    onPageChange: (page: number) => void
}

export function CustomPagination({ currentPage, totalPages, perPage, totalItems, onPageChange }: PaginationProps) {
    const startItem = (currentPage - 1) * perPage + 1
    const endItem = Math.min(currentPage * perPage, totalItems)

    const getVisiblePages = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 7

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage > 3) {
                pages.push("ellipsis-start")
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push("ellipsis-end")
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {visiblePages.map((page, index) => (
                        <PaginationItem key={index}>
                            {typeof page === "number" ? (
                                <PaginationLink
                                    onClick={() => onPageChange(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            ) : (
                                <PaginationEllipsis />
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
