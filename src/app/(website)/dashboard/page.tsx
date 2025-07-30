"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, Users, Building } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
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
} from "recharts";

// API functions
const fetchPaymentStats = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/stats`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch payment stats");
  }

  return response.json();
};

const fetchCategoryStats = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/category-stats`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category stats");
  }

  return response.json();
};

const fetchAdminStats = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/admin-stats`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin stats");
  }

  return response.json();
};

// Colors for pie chart
const PIE_COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
];

export default function DashboardPage() {
  const { data: session } = useSession();

  // Queries
  const {
    data: paymentStats,
    isLoading: paymentStatsLoading,
    error: paymentStatsError,
  } = useQuery({
    queryKey: ["paymentStats"],
    queryFn: () => fetchPaymentStats(session?.user?.accessToken as string),
    enabled: !!session?.user?.accessToken,
  });

  console.log(paymentStats);

  const {
    data: categoryStats,
    isLoading: categoryStatsLoading,
    error: categoryStatsError,
  } = useQuery({
    queryKey: ["categoryStats"],
    queryFn: () => fetchCategoryStats(session?.user?.accessToken as string),
    enabled: !!session?.user?.accessToken,
  });

  const {
    data: adminStats,
    isLoading: adminStatsLoading,
    error: adminStatsError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => fetchAdminStats(session?.user?.accessToken as string),
    enabled: !!session?.user?.accessToken,
  });

  // Transform data for charts
  const lineChartData = paymentStats?.data || [];

  const pieChartData = categoryStats?.data
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categoryStats.data.map((item: any, index: number) => {
        const totalBookings = categoryStats.data.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (sum: number, cat: any) => sum + cat.bookings,
          0
        );
        const percentage =
          totalBookings > 0
            ? ((item.bookings / totalBookings) * 100).toFixed(1)
            : 0;

        return {
          name: item.category,
          value: parseFloat(percentage as string),
          bookings: item.bookings,
          color: PIE_COLORS[index % PIE_COLORS.length],
        };
      })
    : [];

  // Calculate total percentage for center display

  if (!session?.user?.accessToken) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view the dashboard.</p>
        </div>
      </div>
    );
  }

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
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {adminStatsLoading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : adminStatsError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ${adminStats?.data?.totalRevenue?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="mr-1">↗</span>
                  Total revenue generated
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Booking
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            {adminStatsLoading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : adminStatsError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {adminStats?.data?.totalBookings?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="mr-1">↗</span>
                  Total bookings made
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            {adminStatsLoading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : adminStatsError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {adminStats?.data?.totalUsers?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="mr-1">↗</span>
                  Registered users
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Users with Bookings
            </CardTitle>
            <Building className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            {categoryStatsLoading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : categoryStatsError ? (
              <div className="text-2xl font-bold text-red-500">Error</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {categoryStats?.usersWithBookings || 0}
                </div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="mr-1">↗</span>
                  Active customers
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <p className="text-sm text-gray-600">
              Monthly Revenue and Booking Trends
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {paymentStatsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading chart data...</p>
                </div>
              ) : paymentStatsError ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">Error loading chart data</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981" }}
                      name="Revenue ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="booking"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6" }}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <p className="text-sm text-gray-600">
              Booking distribution by category
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col items-center">
              {categoryStatsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : categoryStatsError ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">Error loading data</p>
                </div>
              ) : pieChartData.length > 0 ? (
                <>
                  <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            pieChartData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))
                          }
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {categoryStats.userBookingPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 w-full">
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      pieChartData.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{item.value}%</div>
                            <div className="text-xs text-gray-500">
                              {item.bookings} bookings
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
