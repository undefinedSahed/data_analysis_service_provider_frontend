"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { PaymentElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { fetchService, createPayment } from "@/lib/api"
import { Loader2, Lock } from "lucide-react"
import { FaStripe } from "react-icons/fa"
import { toast } from "sonner"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

interface Service {
    data: {
        _id: string
        serviceTitle: string
        serviceDescription: string
        imageLink: string
        price: number
    }
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    const handlePayment = async () => {
        if (!stripe || !elements || !agreeToTerms) {
            if (!agreeToTerms) {
                setMessage("Please agree to the shipping & billing address terms")
            }
            return
        }

        setLoading(true)
        setMessage("")

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: "if_required",
            })

            if (error) {
                setMessage(error.message || "Payment failed")
                toast.error(error.message || "Payment failed")
            } else if (paymentIntent?.status === "succeeded") {
                router.push(`/payment-success?paymentIntentId=${paymentIntent.id}`)
            } else {
                setMessage(`Payment status: ${paymentIntent?.status}`)
                router.push(`/payment-cancel?paymentIntentId=${paymentIntent.id}`)
            }
        } catch (error) {
            setMessage("An unexpected error occurred")
            router.push("/payment-cancel")
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="mt-4">
                <PaymentElement options={{ layout: "tabs" }} />
            </div>

            <div className="flex items-center space-x-2 mt-6">
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-[#616161]">
                    Agree with shipping & billing address
                </label>
            </div>

            {message && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 mt-4">
                    <p className="text-sm text-red-600">{message}</p>
                </div>
            )}

            <button
                onClick={handlePayment}
                disabled={loading || !agreeToTerms}
                className={`w-full mt-6 flex justify-center items-center py-3 px-4 rounded-md text-white font-medium ${loading || !agreeToTerms
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Lock className="mr-2 h-4 w-4" />
                        Make Your Payment
                    </>
                )}
            </button>
        </>
    )
}

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("serviceId")

    const { data: session } = useSession()

    const [service, setService] = useState<Service | null>(null)
    const [clientSecret, setClientSecret] = useState("")
    const [fetchingService, setFetchingService] = useState(true)
    const subtotal = service?.data?.price || 0

    useEffect(() => {
        const loadService = async () => {
            if (!serviceId) return

            try {
                setFetchingService(true)
                const serviceData = await fetchService(serviceId)
                setService(serviceData)
            } catch (error) {
                console.error("Failed to fetch service:", error)
            } finally {
                setFetchingService(false)
            }
        }

        loadService()
    }, [serviceId])

    useEffect(() => {
        const createPaymentIntent = async () => {
            if (!service || !session?.user?.id) return

            try {
                const { clientSecret } = await createPayment({
                    userId: session.user.id,
                    serviceId: service.data._id,
                    amount: subtotal,
                })
                setClientSecret(clientSecret)
            } catch (error) {
                console.error("Failed to create payment intent:", error)
            }
        }

        if (service && session?.user?.id) {
            createPaymentIntent()
        }
    }, [service, session, subtotal])

    return (
        <section className="py-8 lg:py-20">
            <div className="container mx-auto">
                <div className="text-center max-w-5xl mx-auto mb-12">
                    <h2 className="text-2xl lg:text-5xl font-bold text-[#424242] pb-5">Checkout Page</h2>
                    <p className="text-[#616161] text-base">
                        From everyday essentials to the latest trends, we bring you a seamless shopping experience with unbeatable deals,
                        delivery. Discover convenience, quality, and style all in one place.
                    </p>
                </div>

                {fetchingService ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#424242]" />
                    </div>
                ) : !service ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">Service not found</p>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto px-4">
                        {/* Service Info */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-bold text-[#424242] mb-2">{service.data.serviceTitle}</h3>
                            {service.data.serviceDescription && <p className="text-[#616161] text-sm">{service.data.serviceDescription}</p>}
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#616161]">Subtotal:</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span className="text-[#424242]">Total:</span>
                                    <span className="text-[#424242]">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-lg font-bold text-[#424242] mb-2">Payment Method</h3>
                            <p className="text-[#616161] text-sm mb-4">Choose how you would complete your payment</p>

                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-[#424242]">Credit/Debit Card</span>
                                        </div>
                                    </div>
                                    <FaStripe className="w-24 h-20 object-contain" />
                                </div>

                                {clientSecret && session ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                                        <CheckoutForm clientSecret={clientSecret} />
                                    </Elements>
                                ) : !session ? (
                                    <p className="text-sm text-[#616161] mt-2">Please log in to continue with payment</p>
                                ) : (
                                    <div className="flex items-center justify-center py-4">
                                        <Loader2 className="h-4 w-4 animate-spin mr-2 text-[#424242]" />
                                        <span className="text-sm text-[#616161]">Loading payment options...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
