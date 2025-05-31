"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRef, useState } from "react"

const formSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" })
})

export default function VerifyOTPForm() {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: ""
        },
    })

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return // Prevent multiple characters

        const newOtpValues = [...otpValues]
        newOtpValues[index] = value
        setOtpValues(newOtpValues)

        // Update form value
        const otpString = newOtpValues.join("")
        form.setValue("otp", otpString)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <section>
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="w-full max-w-6xl shadow-[0px_0px_60px_0px_#00000040] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        {/* Left side - Blue div (hidden on small screens) */}
                        <div className="hidden lg:block bg-[#035F8A] min-h-[600px]"></div>

                        {/* Right side - Form */}
                        <div className="p-8 md:p-12">
                            <div className="max-w-sm">
                                <h2 className="font-semibold text-3xl md:text-4xl pb-2">Enter OTP</h2>
                                <p className="text-gray-600 mb-8">We have share a code of your registered email address robertfox@example.com</p>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="otp"
                                            render={() => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex justify-between">
                                                            {otpValues.map((value, index) => (
                                                                <Input
                                                                    key={index}
                                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    maxLength={1}
                                                                    value={value}
                                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                                    className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:border-[#00A3E1]"
                                                                />
                                                            ))}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full bg-[#00A3E1] hover:bg-[#0089c1] text-white py-2">
                                            Verify
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