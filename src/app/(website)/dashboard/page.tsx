"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Calendar, Users, Building } from "lucide-react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dummy data for charts
const lineChartData = [
  { month: "Jan", Revenue: 600, Booking: 650 },
  { month: "Feb", Revenue: 700, Booking: 600 },
  { month: "Mar", Revenue: 800, Booking: 750 },
  { month: "Apr", Revenue: 750, Booking: 700 },
  { month: "May", Revenue: 650, Booking: 650 },
  { month: "Jun", Revenue: 900, Booking: 800 },
  { month: "Jul", Revenue: 850, Booking: 750 },
  { month: "Aug", Revenue: 950, Booking: 850 },
  { month: "Sep", Revenue: 1000, Booking: 900 },
  { month: "Oct", Revenue: 800, Booking: 700 },
  { month: "Nov", Revenue: 750, Booking: 650 },
  { month: "Dec", Revenue: 850, Booking: 750 },
]

const pieChartData = [
  { name: "Enterprise Data Solutions", value: 40, color: "#3B82F6" },
  { name: "Business Data Solutions", value: 35, color: "#EF4444" },
  { name: "Baseline Data Solutions", value: 25, color: "#10B981" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$51,250</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              10% • last 100 today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Booking</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,250</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              10% • last 100 today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">51,250</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              10% • last 100 today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Company</CardTitle>
            <Building className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              10% • last 100 today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistic</CardTitle>
            <p className="text-sm text-gray-600">Revenue and Booking</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} />
                  <Line type="monotone" dataKey="Booking" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most booking</CardTitle>
            <p className="text-sm text-gray-600">Most bookings in the Category?</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col items-center">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">20.00%</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                {pieChartData.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
