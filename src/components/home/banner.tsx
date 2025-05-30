import React from 'react'
import { Button } from '../ui/button'

export default function HomeBanner() {
    return (
        <section className='bg-black/60 text-white'>
            <div className="container mx-auto h-screen flex items-center">
                <div className="lg:max-w-[55%]">
                    <h1 className='font-bold leading-[120%] text-6xl pb-8'>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
                    <p className='text-lg leading-[150%] pb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur diam non sodales eleifend. Vivamus ut hendrerit neque. Nunc nec eleifend magna. Donec posuere nisi quis lorem pellentesque ornare.</p>
                    <Button >
                        Book A Demo
                    </Button>
                </div>
            </div>
        </section>
    )
}
