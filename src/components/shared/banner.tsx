import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Banner() {
    return (
        <section className='text-white'
            style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/banner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}

        >
            <div className="container mx-auto h-screen flex items-center">
                <div className="lg:max-w-[55%] text-center lg:text-start">
                    <h1 className='font-bold lg:leading-[120%] text-[30px] lg:text-6xl pb-8'>Smarter Metrics. Sharper Business Moves.</h1>
                    <p className='text-justify lg:text-start text-lg leading-[150%] pb-8'>We transform your raw business data into clear, actionable insights that drive real growth. Our platform automatically collects, analyzes, and visualizes your key metrics—turning complex datasets into easy-to-understand reports tailored to your goals.</p>
                    <Button>
                        <Link href="/solution#services">Book Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
