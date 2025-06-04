"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Booking</h1>
        <p className="text-gray-600 mt-1">Dashboard &gt; Booking</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Booking functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
