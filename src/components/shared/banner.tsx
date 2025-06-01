import React from 'react'
import { Button } from '../ui/button'

export default function HomeBanner() {
    return (
        <section className='text-white'
            style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/banner_image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}

        >
            <div className="container mx-auto h-screen flex items-center">
                <div className="lg:max-w-[55%] text-center lg:text-start">
                    <h1 className='font-bold lg:leading-[120%] text-[30px] lg:text-6xl pb-8'>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
                    <p className='text-justify lg:text-start text-lg leading-[150%] pb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur diam non sodales eleifend. Vivamus ut hendrerit neque. Nunc nec eleifend magna. Donec posuere nisi quis lorem pellentesque ornare.</p>
                    <Button >
                        Book A Demo
                    </Button>
                </div>
            </div>
        </section>
    )
}
