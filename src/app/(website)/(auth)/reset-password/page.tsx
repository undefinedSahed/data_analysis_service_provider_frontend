import ResetPasswordForm from '@/components/auth/reset-password-form'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    )
}
