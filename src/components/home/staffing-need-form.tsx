"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createStaffingNeed } from "@/lib/api"
import { toast } from "sonner"

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    companyName: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    businessEmail: z.string().email({
        message: "Please enter a valid email address.",
    }),
    staffDescription: z.string().min(10, {
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
            companyName: "",
            businessEmail: "",
            staffDescription: "",
        },
    })

    const mutation = useMutation({
        mutationFn: createStaffingNeed,
        onSuccess: () => {
            toast.success("Staffing need submitted successfully!")
            form.reset()
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast.error(error.message || "Failed to submit staffing need")
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        mutation.mutate(values)

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
                        name="companyName"
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
                        name="staffDescription"
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
                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-44 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
