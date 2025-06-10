import Image from 'next/image'
import React from 'react'

export default function AboutSolution() {
  return (
    <section className='py-8 lg:py-20' id='about'>
      <div className="container mx-auto">
        <div className="text-center pb-6 lg:pb-12">
          <h2 className='text-2xl lg:text-5xl font-bold text-[#424242]'>About Quantivo</h2>
        </div>
        <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-2 items-center">
          <div className="pb-5 lg:pb-0">
            <Image
              src="/images/inspire.jpg"
              alt="Professional woman working with digital technology and data visualization"
              width={600}
              height={400}
              className="rounded-xl w-full aspect-[5/3] object-cover"
              priority
            />
          </div>
          <ul className='text-base lg:text-xl text-[#545454] text-justify lg:text-start space-y-6'>
            <li className=' leading-[150%]'>At Quantivo we believe that great decisions start with great data. We&apos;re a data analytics company dedicated to helping businesses turn their numbers into knowledge—and that knowledge into growth.
            </li>
            <li className=' leading-[150%]'>Our platform is built to simplify complex data, transforming it into clear, actionable insights. Whether you&apos;re a fast-growing business or an established enterprise, we offer flexible solutions tailored to your needs—from streamlined reporting with limited data sources to comprehensive enterprise strategies that integrate and analyze data across your entire organization.
            </li>
            <li className=' leading-[150%]'>
              We&apos;re not just about dashboards and charts—we&apos;re your strategic partner in making smarter moves, faster. With a strong focus on data clarity, security, and impact, we empower you to truly <strong>know, protect, and rule your data</strong>.
            </li>
            <li className=' leading-[150%]'>
              Let&apos;s turn your metrics into momentum.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
