"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"

const formSchema = z
    .object({
        email: z.string().email({ message: "Please enter a valid email address" })
    })

export default function ForgotPasswordForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-6xl shadow-[0px_0px_60px_0px_#00000040] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        {/* Left side - Blue div (hidden on small screens) */}
                        <div className="relative hidden lg:block min-h-[600px]">
                            <Image
                                src="/images/auth.png"
                                alt="Authentication Image"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Right side - Form */}
                        <div className="">
                            <div className="max-w-lg mx-auto">
                                <h2 className="font-semibold text-3xl md:text-4xl pb-2">Forgot Password</h2>
                                <p className="text-gray-600 mb-8">Enter your registered email address. we&apos;ll send you a code to reset your password.</p>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your email address" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full bg-[#00A3E1] hover:bg-[#0089c1] text-white py-2">
                                            Send OTP
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
