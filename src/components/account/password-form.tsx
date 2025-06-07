"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "@/lib/api"
import { z } from "zod"
import { toast } from "sonner"

// Zod schema
const passwordSchema = z
    .object({
        current: z.string().min(1, "Current password is required"),
        new: z.string().min(6, "Password must be at least 6 characters long"),
        confirm: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.new === data.confirm, {
        message: "Passwords do not match",
        path: ["confirm"],
    })
    .refine((data) => data.current !== data.new, {
        message: "New password must be different from current password",
        path: ["new"],
    })

export function PasswordForm() {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    })

    const [error, setError] = useState<string | null>(null)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    const handleInputChange = (field: keyof typeof passwords, value: string) => {
        setPasswords((prev) => ({ ...prev, [field]: value }))
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({ ...prev, [field]: "" }))
        }
        if (error) setError(null)
    }

    const updatePassMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: (data) => {
            setPasswords({ current: "", new: "", confirm: "" })
            setValidationErrors({})
            setError(null)
            toast.success(data.message)
            console.log(data)
        },
        onError: (err: Error) => {
            setError(err.message || "Failed to update password")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setValidationErrors({})

        const validationResult = passwordSchema.safeParse(passwords)
        if (!validationResult.success) {
            const fieldErrors: Record<string, string> = {}
            validationResult.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    const field = err.path[0] as string
                    fieldErrors[field] = err.message
                }
            })
            setValidationErrors(fieldErrors)
            setError("Please fix the validation errors below")
            return
        }

        updatePassMutation.mutate({
            currentPassword: passwords.current,
            newPassword: passwords.new,
        })
    }

    return (
        <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Change password</h2>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                        id="currentPassword"
                        type="password"
                        placeholder="##############"
                        value={passwords.current}
                        onChange={(e) => handleInputChange("current", e.target.value)}
                        className={`mt-2 ${validationErrors.current ? "border-red-500" : ""}`}
                    />
                    {validationErrors.current && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.current}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="##############"
                            value={passwords.new}
                            onChange={(e) => handleInputChange("new", e.target.value)}
                            className={`mt-2 ${validationErrors.new ? "border-red-500" : ""}`}
                        />
                        {validationErrors.new && (
                            <p className="text-sm text-red-500 mt-1">{validationErrors.new}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="##############"
                            value={passwords.confirm}
                            onChange={(e) => handleInputChange("confirm", e.target.value)}
                            className={`mt-2 ${validationErrors.confirm ? "border-red-500" : ""}`}
                        />
                        {validationErrors.confirm && (
                            <p className="text-sm text-red-500 mt-1">{validationErrors.confirm}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 px-8"
                        disabled={updatePassMutation.isPending}
                    >
                        {updatePassMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
