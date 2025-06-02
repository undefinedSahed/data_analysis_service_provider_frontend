"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    company: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    businessEmail: z.string().email({
        message: "Please enter a valid email address.",
    }),
    staffingNeed: z.string().min(10, {
        message: "Please provide at least 10 characters describing your staffing need.",
    }),
})

export default function StaffingNeedForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            company: "",
            businessEmail: "",
            staffingNeed: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log(values)
        alert("Form submitted successfully!")

        setIsSubmitting(false)
        form.reset()
    }

    return (
        <div className="">
            <h2 className="text-xl lg:text-4xl font-semibold text-[#323232] mb-6">Tell Us About Your Staffing Need:</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your First Name"
                                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your Last Name"
                                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Company Field */}
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Company</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Company Name"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Business Email Field */}
                    <FormField
                        control={form.control}
                        name="businessEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Business Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter business email address"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Staffing Need Textarea */}
                    <FormField
                        control={form.control}
                        name="staffingNeed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Tell Us About Your Upcoming Data-Driven Staffing Need:
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe skill set, experience, project duration, location, etc."
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button with Avatar */}
                    <div className="relative">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
