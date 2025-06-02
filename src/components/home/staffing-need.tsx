import Image from 'next/image'
import React from 'react'
import StaffingNeedForm from './staffing-need-form'

export default function StaffingNeed() {
    return (
        <section className='py-8 lg:py-20'>
            <div className="container mx-auto">
                <h2 className='text-2xl lg:text-[40px] font-semibold pb-3 text-[#323232]'>Lorem ipsum dolor sit amet</h2>
                <p className='text-base lg:text-lg font-semibold text-[#545454] pb-3 text-justify lg:text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis ullamcorper.</p>
                <ul className='list-disc list-inside space-y-3 pb-3 text-justify lg:text-start'>
                    <li><span className='font-semibold'>Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.</li>
                    <li><span className='font-semibold'>Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.</li>
                    <li><span className='font-semibold'>Lorem ipsum:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.</li>
                </ul>
                <p className='text-base lg:text-lg font-semibold text-[#545454] pb-3 text-justify lg:text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.</p>
                <div className="pt-6 pb-10">
                    <Image
                        src="/images/staffneed.jpg"
                        alt="Professional people working with digital technology and data visualization"
                        width={1000}
                        height={1000}
                        className="w-full aspect-[5/2] object-cover rounded-md"
                        priority
                    />
                </div>
                <StaffingNeedForm />
            </div>
        </section>
    )
}
