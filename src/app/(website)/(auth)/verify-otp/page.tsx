import VerifyOTPForm from '@/components/auth/otp'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyOTPForm />
            </Suspense>
        </main>
    )
}
