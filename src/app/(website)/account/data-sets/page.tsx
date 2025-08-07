"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { fetchUserDataSet } from "@/lib/api"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface DataSet {
    _id: string
    userId: {
        _id: string
        companyName?: string
    }
    dataSets: string
    dataSetName: string
    createdAt: string
}

interface DataPoint {
    [key: string]: string | number | boolean | null | undefined
}

interface ChartData {
    lineChart: { x: string; y: number }[]
    pieChart: { name: string; value: number; color: string }[]
    metrics: Record<string, number>
    categories: string[]
}

interface FieldInfo {
    name: string
    type: "string" | "number" | "date" | "boolean"
    values: (string | number | boolean)[]
}

const COLORS = ["#ef4444", "#10b981", "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899", "#84cc16", "#f97316"]

export default function UserDashboard() {
    const [dataSets, setDataSets] = useState<DataSet[]>([])
    const [selectedDataSet, setSelectedDataSet] = useState("")
    const [selectedDateRange, setSelectedDateRange] = useState("")
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([])
    const [rawData, setRawData] = useState<DataPoint[]>([])
    const [filteredData, setFilteredData] = useState<DataPoint[]>([])
    const [chartData, setChartData] = useState<ChartData>({
        lineChart: [],
        pieChart: [],
        metrics: {},
        categories: [],
    })
    const [availableFields, setAvailableFields] = useState<FieldInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [dataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Memoized field calculations for better performance
    const numericFields = useMemo(() => availableFields.filter((f) => f.type === "number"), [availableFields])

    const stringFields = useMemo(
        () => availableFields.filter((f) => f.type === "string" && f.values.length < 20 && f.values.length > 1),
        [availableFields],
    )

    const dateFields = useMemo(() => availableFields.filter((f) => f.type === "date"), [availableFields])

    // Load datasets on component mount
    useEffect(() => {
        loadUserDataSets()
    }, [])

    // Load dataset content when selection changes
    useEffect(() => {
        if (selectedDataSet) {
            loadDataSetContent()
        }
    }, [selectedDataSet])

    // Apply filters when data or filters change
    useEffect(() => {
        if (rawData.length > 0) {
            applyFilters()
        }
    }, [rawData, selectedDateRange, selectedMetrics, selectedDimensions])

    const loadUserDataSets = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetchUserDataSet(1, 50)

            if (response.success && response.data) {
                setDataSets(response.data)
                if (response.data.length > 0) {
                    setSelectedDataSet(response.data[0]._id)
                }
            } else {
                setError("Failed to load datasets")
            }
        } catch (error) {
            console.error("Error loading user datasets:", error)
            setError("Error loading datasets")
        } finally {
            setLoading(false)
        }
    }

    const loadDataSetContent = async () => {
        const selectedDataSetObj = dataSets.find((ds) => ds._id === selectedDataSet)
        if (!selectedDataSetObj) return

        try {
            setDataLoading(true)
            setError(null)

            const response = await fetch(selectedDataSetObj.dataSets)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const jsonData = await response.json()

            if (!Array.isArray(jsonData)) {
                throw new Error("Invalid data format: expected array")
            }

            setRawData(jsonData)
            analyzeDataStructure(jsonData)
        } catch (error) {
            console.error("Error loading dataset content:", error)
            setError("Failed to load dataset content")
            setRawData([])
            setAvailableFields([])
        } finally {
            setDataLoading(false)
        }
    }

    const analyzeDataStructure = useCallback((data: DataPoint[]) => {
        if (data.length === 0) {
            setAvailableFields([])
            return
        }

        const fields: FieldInfo[] = []
        const sampleItem = data[0]

        Object.keys(sampleItem).forEach((key) => {
            const values = data
                .map((item) => item[key])
                .filter((val): val is string | number | boolean => val !== null && val !== undefined)

            if (values.length === 0) return

            const uniqueValues = [...new Set(values)]
            let type: FieldInfo["type"] = "string"

            // Type detection with better logic
            if (values.every((val) => typeof val === "number")) {
                type = "number"
            } else if (values.every((val) => typeof val === "boolean")) {
                type = "boolean"
            } else if (key.toLowerCase().includes("date") || isValidDate(values[0])) {
                type = "date"
            }

            fields.push({
                name: key,
                type,
                values: uniqueValues.slice(0, 50), // Increased limit but still reasonable
            })
        })

        setAvailableFields(fields)

        // Auto-select metrics and dimensions with immediate effect
        const newNumericFields = fields.filter((f) => f.type === "number")
        const newStringFields = fields.filter((f) => f.type === "string" && f.values.length < 20 && f.values.length > 1)

        // Always select the first available metric
        if (newNumericFields.length > 0) {
            setSelectedMetrics([newNumericFields[0].name])
        } else {
            setSelectedMetrics([])
        }

        // Always select the first available dimension
        if (newStringFields.length > 0) {
            setSelectedDimensions([newStringFields[0].name])
        } else {
            setSelectedDimensions([])
        }

        // Reset date range when switching datasets
        setSelectedDateRange("")
    }, [])

    const isValidDate = (value: string | number | boolean): boolean => {
        if (typeof value !== "string") return false
        const date = new Date(value)
        return !isNaN(date.getTime()) && !!value.match(/^\d{4}-\d{2}-\d{2}/)
    }

    const applyFilters = useCallback(() => {
        let filtered = [...rawData]

        // Apply date range filter
        if (selectedDateRange && dateFields.length > 0) {
            const dateField = dateFields[0].name
            const now = new Date()
            const startDate = new Date()

            switch (selectedDateRange) {
                case "last-7-days":
                    startDate.setDate(now.getDate() - 7)
                    break
                case "last-30-days":
                    startDate.setDate(now.getDate() - 30)
                    break
                case "last-90-days":
                    startDate.setDate(now.getDate() - 90)
                    break
                case "last-year":
                    startDate.setFullYear(now.getFullYear() - 1)
                    break
            }

            filtered = filtered.filter((item) => {
                const itemDate = new Date(String(item[dateField]))
                return itemDate >= startDate && itemDate <= now
            })
        }

        setFilteredData(filtered)
        generateChartData(filtered)
    }, [rawData, selectedDateRange, dateFields])

    const generateChartData = useCallback(
        (data: DataPoint[]) => {
            if (data.length === 0 || selectedMetrics.length === 0) {
                setChartData({
                    lineChart: [],
                    pieChart: [],
                    metrics: {},
                    categories: [],
                })
                return
            }

            const newChartData: ChartData = {
                lineChart: [],
                pieChart: [],
                metrics: {},
                categories: [],
            }

            // Generate metrics
            selectedMetrics.forEach((metric) => {
                const values = data.map((item) => {
                    const value = item[metric]
                    return typeof value === "number" ? value : 0
                })
                newChartData.metrics[metric] = values.reduce((sum, val) => sum + val, 0)
            })

            // Generate line chart data
            const dateField = dateFields[0]?.name
            const primaryMetric = selectedMetrics[0]

            if (dateField && primaryMetric) {
                const groupedByDate = data.reduce(
                    (acc, item) => {
                        const dateValue = item[dateField]
                        if (!dateValue) return acc

                        const date = new Date(String(dateValue)).toLocaleDateString("en-US", {
                            month: "short",
                            year: "2-digit",
                        })

                        if (typeof acc[date] !== "number") acc[date] = 0
                        const metricValue = item[primaryMetric]
                        acc[date] = Number(acc[date]) + (typeof metricValue === "number" ? metricValue : 0)
                        return acc
                    },
                    {} as Record<string, number>,
                )

                // Sort dates chronologically
                const sortedEntries = Object.entries(groupedByDate).sort(([a], [b]) => {
                    return new Date(a).getTime() - new Date(b).getTime()
                })

                newChartData.lineChart = sortedEntries.map(([date, value]) => ({
                    x: date,
                    y: Number(value),
                }))
                newChartData.categories = sortedEntries.map(([date]) => date)
            }

            // Generate pie chart data
            const primaryDimension = selectedDimensions[0]
            if (primaryDimension && primaryMetric) {
                const groupedByDimension = data.reduce(
                    (acc, item) => {
                        const dimensionValue = item[primaryDimension]
                        const dimension = String(dimensionValue || "Unknown")

                        if (typeof acc[dimension] !== "number") acc[dimension] = 0
                        const metricValue = item[primaryMetric]
                        acc[dimension] += typeof metricValue === "number" ? metricValue : 0
                        return acc
                    },
                    {} as Record<string, number>,
                )

                newChartData.pieChart = Object.entries(groupedByDimension)
                    .sort(([, a], [, b]) => {
                        const numA = typeof a === "number" && a !== null && a !== undefined ? a : 0
                        const numB = typeof b === "number" && b !== null && b !== undefined ? b : 0
                        return numB - numA
                    }) // Sort by value descending
                    .map(([name, value], index) => ({
                        name,
                        value: typeof value === "number" ? value : 0,
                        color: COLORS[index % COLORS.length],
                    }))
            }

            setChartData(newChartData)
        },
        [selectedMetrics, selectedDimensions, dateFields],
    )

    const removeMetric = useCallback((metric: string) => {
        setSelectedMetrics((prev) => prev.filter((m) => m !== metric))
    }, [])

    const removeDimension = useCallback((dimension: string) => {
        setSelectedDimensions((prev) => prev.filter((d) => d !== dimension))
    }, [])

    const addMetric = useCallback(
        (metric: string) => {
            if (!selectedMetrics.includes(metric)) {
                setSelectedMetrics((prev) => [...prev, metric])
            }
        },
        [selectedMetrics],
    )

    const addDimension = useCallback(
        (dimension: string) => {
            if (!selectedDimensions.includes(dimension)) {
                setSelectedDimensions((prev) => [...prev, dimension])
            }
        },
        [selectedDimensions],
    )

    const handleDataSetChange = useCallback((dataSetId: string) => {
        setSelectedDataSet(dataSetId)
        // Reset all filters when changing dataset
        setSelectedDateRange("")
        setSelectedMetrics([])
        setSelectedDimensions([])
        setRawData([])
        setFilteredData([])
        setChartData({
            lineChart: [],
            pieChart: [],
            metrics: {},
            categories: [],
        })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p>Loading datasets...</p>
                </div>
            </div>
        )
    }

    if (error && dataSets.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-96">
                    <CardContent className="p-8 text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={loadUserDataSets}>Try Again</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (dataSets.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-96">
                    <CardContent className="p-8 text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <h2 className="text-2xl font-bold mb-2">No Data Sets Available</h2>
                        <p className="text-gray-600">
                            You don&apos;t have any datasets yet. Contact your administrator to get access to datasets.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                {/* Dataset Filter */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Dataset</Label>
                                    <Select value={selectedDataSet} onValueChange={handleDataSetChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Dataset" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataSets.map((dataSet) => (
                                                <SelectItem key={dataSet._id} value={dataSet._id}>
                                                    {dataSet.dataSetName || "Dataset"} - {new Date(dataSet.createdAt).toLocaleDateString()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Date Range Filter */}
                                {dateFields.length > 0 && (
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block">Date Range</Label>
                                        <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Date Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                                                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                                                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                                                <SelectItem value="last-year">Last year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Metrics Filter */}
                                {numericFields.length > 0 && (
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block">Metrics</Label>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMetrics.map((metric) => (
                                                    <Badge key={metric} variant="secondary" className="flex items-center gap-1">
                                                        {metric}
                                                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeMetric(metric)} />
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Select onValueChange={addMetric}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Add metric" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {numericFields
                                                        .filter((field) => !selectedMetrics.includes(field.name))
                                                        .map((field) => (
                                                            <SelectItem key={field.name} value={field.name}>
                                                                {field.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Dimensions Filter */}
                                {stringFields.length > 0 && (
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block">Dimensions</Label>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDimensions.map((dimension) => (
                                                    <Badge key={dimension} variant="secondary" className="flex items-center gap-1">
                                                        {dimension}
                                                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeDimension(dimension)} />
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Select onValueChange={addDimension}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Add dimension" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {stringFields
                                                        .filter((field) => !selectedDimensions.includes(field.name))
                                                        .map((field) => (
                                                            <SelectItem key={field.name} value={field.name}>
                                                                {field.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500">
                                    {filteredData.length} of {rawData.length} records shown
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {dataLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                                    <p>Loading dataset...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <div className="text-4xl mb-4">⚠️</div>
                                    <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
                                    <p className="text-gray-600 mb-4">{error}</p>
                                    <Button onClick={loadDataSetContent}>Retry</Button>
                                </CardContent>
                            </Card>
                        ) : rawData.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <div className="text-4xl mb-4">📈</div>
                                    <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
                                    <p className="text-gray-600">The selected dataset is empty or could not be loaded.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                {/* Key Metrics */}
                                {Object.keys(chartData.metrics).length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {Object.entries(chartData.metrics).map(([metric, value]) => (
                                            <Card key={metric}>
                                                <CardContent className="p-6">
                                                    <div className="text-3xl font-bold">{value.toLocaleString()}</div>
                                                    <div className="text-gray-500 text-sm capitalize">Total {metric}</div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {/* Line Chart */}
                                {chartData.lineChart.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{selectedMetrics[0]} Performance Over Time</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-64 relative">
                                                <svg viewBox="0 0 800 200" className="w-full h-full">
                                                    {/* Grid lines */}
                                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                                        <line
                                                            key={i}
                                                            x1="50"
                                                            y1={40 + i * 32}
                                                            x2="750"
                                                            y2={40 + i * 32}
                                                            stroke="#e5e7eb"
                                                            strokeWidth="1"
                                                        />
                                                    ))}

                                                    {/* Y-axis labels */}
                                                    {(() => {
                                                        const maxValue = Math.max(...chartData.lineChart.map((d) => d.y))
                                                        const step = maxValue / 5
                                                        return Array.from({ length: 6 }, (_, i) => (
                                                            <text key={i} x="40" y={45 + i * 32} fontSize="12" fill="#6b7280" textAnchor="end">
                                                                {Math.round(maxValue - i * step).toLocaleString()}
                                                            </text>
                                                        ))
                                                    })()}

                                                    {/* Line chart */}
                                                    {chartData.lineChart.length > 1 && (
                                                        <polyline
                                                            fill="none"
                                                            stroke="#06b6d4"
                                                            strokeWidth="2"
                                                            points={chartData.lineChart
                                                                .map((point, index) => {
                                                                    const maxValue = Math.max(...chartData.lineChart.map((d) => d.y))
                                                                    const x = 50 + (index * 700) / (chartData.lineChart.length - 1)
                                                                    const y = 180 - (point.y / maxValue) * 140
                                                                    return `${x},${y}`
                                                                })
                                                                .join(" ")}
                                                        />
                                                    )}

                                                    {/* Data points */}
                                                    {chartData.lineChart.map((point, index) => {
                                                        const maxValue = Math.max(...chartData.lineChart.map((d) => d.y))
                                                        const x = 50 + (index * 700) / Math.max(1, chartData.lineChart.length - 1)
                                                        const y = 180 - (point.y / maxValue) * 140
                                                        return <circle key={index} cx={x} cy={y} r="3" fill="#06b6d4" />
                                                    })}

                                                    {/* X-axis labels */}
                                                    {chartData.lineChart.map((point, index) => {
                                                        const x = 50 + (index * 700) / Math.max(1, chartData.lineChart.length - 1)
                                                        return (
                                                            <text key={index} x={x} y="195" fontSize="12" fill="#6b7280" textAnchor="middle">
                                                                {point.x}
                                                            </text>
                                                        )
                                                    })}
                                                </svg>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Pie Chart */}
                                {chartData.pieChart.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                {selectedMetrics[0]} by {selectedDimensions[0]}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                                                <div className="w-full md:w-2/3 h-64">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={chartData.pieChart}
                                                                dataKey="value"
                                                                nameKey="name"
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={60}
                                                                outerRadius={100}
                                                                fill="#8884d8"
                                                            >
                                                                {chartData.pieChart.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                                ))}
                                                            </Pie>
                                                            <Tooltip formatter={(value: number) => [value.toLocaleString(), selectedMetrics[0]]} />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                {/* Legend */}
                                                <div className="space-y-2">
                                                    {chartData.pieChart.map((segment, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                                                            <span className="text-sm">{segment.name}</span>
                                                            <span className="text-sm font-medium">{segment.value.toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
