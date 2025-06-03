"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { verifyOTP } from "@/app/actions/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" }),
    email: z.string().email({ message: "Please enter a valid email address" })
})

export default function VerifyOTPForm() {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const router = useRouter()

    const searchParams = new URLSearchParams(window.location.search)
    const email = searchParams.get("email")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: ""
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

    useEffect(() => {
        if (email) {
            form.setValue("email", email);
        }
    }, [email, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const res = await verifyOTP(values)

        if (res.success) {
            toast.success("OTP Verified Successfully");
            // Redirect to login or a confirmation page
            // router.push(`/reset-password?email=${values.email}`);
        } else {
            toast.error(res.message || "Failed to send reset email");
        }

        console.log(res)
    }

    return (
        <section>
            <div className="flex justify-center items-center min-h-screen p-4">
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
                                                                    ref={(el) => {
                                                                        inputRefs.current[index] = el;
                                                                    }}
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