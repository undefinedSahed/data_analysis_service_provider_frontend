import ServiceClients from '@/components/service-details/clients'
import DataStrategyContent from '@/components/service-details/data-strategy-content'
import DecisionQualitySection from '@/components/service-details/decision-quality'
import DetailsBanner from '@/components/service-details/details-banner'
import TechnologyShowcase from '@/components/service-details/technologia'
import React from 'react'

export default function page({ params }: { params: { serviceId: string } }) {

    return (
        <main>
            <DetailsBanner serviceId={params.serviceId} />
            <ServiceClients />
            <DataStrategyContent />
            <TechnologyShowcase />
            <DecisionQualitySection />
        </main>
    )
}
