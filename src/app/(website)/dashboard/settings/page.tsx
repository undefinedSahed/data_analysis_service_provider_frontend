"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SettingsPage() {
  const settingsItems = [
    {
      title: "Personal Information",
      href: "/dashboard/settings/personal-information",
    },
    {
      title: "Change Password",
      href: "/dashboard/settings/password",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 text-sm">Dashboard &gt; Settings</p>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <div key={index}>
              <Link key={item.href} href={item.href} className="my-10">
                <div
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${index !== settingsItems.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                >
                  <span className="text-gray-900 font-semibold text-2xl">{item.title}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
