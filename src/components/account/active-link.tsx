"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ActiveLinkProps {
    href: string
    children: React.ReactNode
}

export function ActiveLink({ href, children }: ActiveLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                "pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap",
                isActive
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
        >
            {children}
        </Link>
    )
}
