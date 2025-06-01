import Image from 'next/image'
import React from 'react'

export default function AboutSolution() {
  return (
    <section className='py-8 lg:py-20'>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="pb-5">
            <Image
              src="/images/inspire.jpg"
              alt="Professional woman working with digital technology and data visualization"
              width={600}
              height={400}
              className="rounded-xl"
              priority
            />
          </div>
          <div className="">
            <h2 className='text-xl lg:text-4xl font-bold pb-3'>Lorem ipsum dolor sit amet</h2>
            <p className='text-base lg:text-lg text-[#545454] leading-[150%] text-justify lg:text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus quam vitae molestie interdum. Sed rutrum iaculis efficitur. Mauris malesuada purus urna, quis commodo nulla imperdiet vitae. Pellentesque convallis augue libero. Maecenas gravida odio vel interdum hendrerit. Praesent a urna quis felis laoreet fringilla ac a dolor. Donec tempus lorem ut dapibus varius. Proin malesuada suscipit rhoncus. Aliquam tempus quam efficitur nunc vulputate lacinia. Nunc a porttitor ex, vel vulputate ex. Nunc ut metus scelerisque, dictum mauris id, consectetur tellus. Nunc odio ex, pretium vel sem et, fringilla imperdiet lectus. Quisque posuere, erat sed consectetur mollis, lorem lorem pellentesque neque, pharetra dignissim odio sapien a metus. Cras maximus leo at efficitur viverra.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
