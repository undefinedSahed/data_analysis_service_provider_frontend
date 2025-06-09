"use client"

import { AdminPasswordForm } from "@/components/dashboard/admin-password-form"


export default function ChangePasswordPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 text-sm">Dashboard &gt; Settings &gt; Change Password</p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm">
                    <AdminPasswordForm />
                </div>
            </div>
        </div>
    )
}
