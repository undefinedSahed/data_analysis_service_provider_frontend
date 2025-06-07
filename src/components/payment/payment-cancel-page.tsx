"use client"

import Link from "next/link"
import { XCircle, ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { fetchPaymentStatus } from "@/lib/api"
import { useEffect } from "react"

export default function PaymentCancel() {

    const searcParams = useSearchParams()
    const paymentIntentId = searcParams?.get('paymentIntentId')

    console.log(paymentIntentId)

    const {
        mutate: confirmPayment,
        data: paymentStatus,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: fetchPaymentStatus,
    })


    useEffect(() => {
        if (paymentIntentId) {
            confirmPayment({ paymentIntentId })
        }
    }, [paymentIntentId])

    console.log(paymentStatus)

    return (
        <section className="py-8 lg:py-20">
            <main className="container mx-auto">
                <div className="max-w-3xl mx-auto">
                    <Card className="text-center">
                        <CardHeader className="pb-4">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</CardTitle>
                            <p className="text-gray-600">Your payment was cancelled. No charges have been made to your account.</p>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Reasons */}
                            <div className="text-left bg-yellow-50 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Common reasons for cancellation:</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Payment method declined or expired</li>
                                    <li>• Insufficient funds in account</li>
                                    <li>• User cancelled the transaction</li>
                                    <li>• Technical issues during processing</li>
                                </ul>
                            </div>

                            {/* What to do next */}
                            <div className="text-left bg-blue-50 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-900 mb-3">What can you do next?</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Try payment again</li>
                                    <li>• Check your card details and try again</li>
                                    <li>• Contact your bank if payment was declined</li>
                                    <li>• Reach out to our support team for assistance</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/">
                                    <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </section>
    )
}
