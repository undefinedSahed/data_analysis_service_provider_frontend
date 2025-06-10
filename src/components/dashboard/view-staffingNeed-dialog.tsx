"use client"

import React, { useState } from "react"
import { Eye } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ViewStaffingNeed({ businessEmail, staffDescription }: { businessEmail: string, staffDescription: string }) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="sr-only">Staffing Need Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-bold">Business Email:</h4>
                        <div className="flex justify-between border py-3 rounded-md px-3">
                            <p>{businessEmail}</p>
                            <Link href={`mailto:${businessEmail}`} target="_blank" rel="noopener noreferrer" className="text-primary">Send Email</Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold">Staff Description:</h4>
                        <p className="border py-3 rounded-md px-3">{staffDescription}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
