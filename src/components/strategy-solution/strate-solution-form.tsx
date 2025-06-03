"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { createStrategy } from "@/lib/api"

export default function StrategyForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        companyName: "",
        dataStrategy: "",
        strategyDescription: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            const result = await createStrategy(formData)
            console.log("Strategy created successfully:", result)
            setSubmitMessage("Strategy created successfully!")

            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                companyName: "",
                dataStrategy: "",
                strategyDescription: "",
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error creating strategy:", error)
            setSubmitMessage(`Error: ${error.message}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="py-8 lg:py-20 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Form Section */}
                    <div className="order-2 lg:order-1">
                        <Card className="border-none shadow-none">
                            <CardContent className="p-0">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                                            Company Name
                                        </Label>
                                        <Input
                                            id="company"
                                            type="text"
                                            placeholder="Enter your Company Name"
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="focus-area" className="text-sm font-medium text-gray-700">
                                            Data Strategy Focus Area
                                        </Label>
                                        <Select onValueChange={(value) => handleInputChange("dataStrategy", value)} required>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="analytics">Enterprise Data Solutions</SelectItem>
                                                <SelectItem value="governance">Business Data Solutions</SelectItem>
                                                <SelectItem value="architecture">Baseline Data Solutions</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                            Data Strategy Notes & Requests
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Write....."
                                            value={formData.strategyDescription}
                                            onChange={(e) => handleInputChange("strategyDescription", e.target.value)}
                                            className="w-full min-h-[120px] resize-none"
                                            required
                                        />
                                    </div>

                                    {submitMessage && (
                                        <div
                                            className={`p-3 rounded-md text-sm ${submitMessage.includes("Error")
                                                ? "bg-red-50 text-red-700 border border-red-200"
                                                : "bg-green-50 text-green-700 border border-green-200"
                                                }`}
                                        >
                                            {submitMessage}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-medium py-3 px-6 rounded-md transition-colors"
                                    >
                                        {isSubmitting ? "Creating Strategy..." : "Let's Talk Data"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Section */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div>
                            <h1
                                className="font-bold mb-6 text-2xl text-center lg:text-start lg:text-4xl"
                            >
                                Lorem ipsum dolor sit amet
                            </h1>

                            <p className="text-[#545454] text-base sm:text-lg leading-relaxed mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                                Suspendisse dictum facilisis ullamcorper.
                            </p>

                            <ul className="space-y-6 list-disc list-inside text-base font-medium text-[#545454]">
                                <li className="text-justify lg:text-start">
                                    <span className="lg:text-[22px] text-lg">Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                                    ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
                                </li>

                                <li className="text-justify lg:text-start">
                                    <span className="lg:text-[22px] text-lg">Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                                    ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
                                </li>

                                <li className="text-justify lg:text-start">
                                    <span className="lg:text-[22px] text-lg">Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                                    ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="pt-8">
                    <p className="text-[#545454] text-base leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                        Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
                    </p>
                </div>
            </div>
        </div>
    )
}
