import PaymentCancel from '@/components/payment/payment-cancel-page'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentCancel />
            </Suspense>
        </main>
    )
}
