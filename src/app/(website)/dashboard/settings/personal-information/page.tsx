"use client"

import { AdminProfileForm } from "@/components/dashboard/admin-profile-form"


export default function PersonalInformationPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 text-sm">Dashboard &gt; Settings &gt; Personal Information</p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm">
                    <AdminProfileForm />
                </div>
            </div>
        </div>
    )
}
