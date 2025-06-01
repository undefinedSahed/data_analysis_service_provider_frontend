import Banner from '@/components/shared/banner'
import ClientCompanies from '@/components/shared/client-companies'
import Services from '@/components/shared/services'
import AboutSolution from '@/components/solution/about-solution'
import Solutions from '@/components/solution/solution'
import React from 'react'

export default function page() {
    return (
        <main>
            <Banner />
            <ClientCompanies />
            <Services />
            <AboutSolution />
            <Solutions />
        </main>
    )
}
