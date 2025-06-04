"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordForm() {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setPasswords((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle password change logic here
        console.log("Password change submitted")
    }

    return (
        <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Change password</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                        id="currentPassword"
                        type="password"
                        placeholder="##############"
                        value={passwords.current}
                        onChange={(e) => handleInputChange("current", e.target.value)}
                        className="mt-2"
                    />
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
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="##############"
                            value={passwords.confirm}
                            onChange={(e) => handleInputChange("confirm", e.target.value)}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-sky-500 hover:bg-sky-600 px-8">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
