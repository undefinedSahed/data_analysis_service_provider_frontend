"use client"

import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Save, Plus } from "lucide-react"
import { toast } from "sonner"

import { createSolution } from "@/lib/api"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddSolutionDialog() {
    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        solutionName: "",
        solutionDescription: "",
    })

    const createMutation = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: ({ data }: { data: any }) => createSolution(data),
        onSuccess: () => {
            toast.success("Solution created successfully")
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["solutions"] })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(error.message || "Failed to create service")
        },
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.solutionName || !formData.solutionDescription) {
            toast.error("Please fill in all required fields")
            return
        }

        const data = {
            solutionName: formData.solutionName,
            solutionDescription: formData.solutionDescription,
        }

        createMutation.mutate({ data })
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Solution
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Solution</DialogTitle>
                    <DialogDescription>Fill in the form below to add a new solution.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="solutionName">Solution Name</Label>
                        <Input
                            id="solutionName"
                            name="solutionName"
                            placeholder="Type solution name here..."
                            value={formData.solutionName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="solutionDescription">Description</Label>
                        <Textarea
                            id="solutionDescription"
                            name="solutionDescription"
                            placeholder="Type solution description here..."
                            rows={5}
                            value={formData.solutionDescription}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600"
                            disabled={createMutation.isPending}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {createMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
