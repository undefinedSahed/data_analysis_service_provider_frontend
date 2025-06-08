"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { fetchPaymentStatus } from "@/lib/api"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function PaymentSuccess() {

    const searcParams = useSearchParams()
    const paymentIntentId = searcParams?.get('paymentIntentId')

    console.log(paymentIntentId)

    const {
        mutate: confirmPayment,
        data: paymentStatus
    } = useMutation({
        mutationFn: fetchPaymentStatus,
    })


    useEffect(() => {
        if (paymentIntentId) {
            confirmPayment({ paymentIntentId })
        }
    }, [paymentIntentId, confirmPayment])

    console.log(paymentStatus)

    return (
        <section className="py-8 lg:py-20">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <Card className="text-center">
                        <CardHeader className="pb-4">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment Successful!</CardTitle>
                            <p className="text-gray-600">
                                Thank you for your purchase. Your payment has been processed successfully.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Next Steps */}
                            <div className="text-left bg-blue-50 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-900 mb-3">What&apos;s Next?</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Your service will be activated within 24 hours</li>
                                    <li>• Check your dashboard for updates and access</li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Back to Home
                                    </Button>
                                </Link>
                                <Link href="/account">
                                    <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">Go to Account</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </section>
    )
}
