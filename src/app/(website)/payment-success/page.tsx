import PaymentSuccess from '@/components/payment/payment-success-page'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentSuccess />
            </Suspense>
        </main>
    )
}
