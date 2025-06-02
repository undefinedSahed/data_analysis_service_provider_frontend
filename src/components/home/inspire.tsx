import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <section className="bg-[#EBF7FD] flex items-center justify-center py-8 lg:py-52">
            <div className="container mx-auto">
                {/* Image Section - Hidden on mobile */}
                <div className="lg:block relative w-full">
                    <Image
                        src="/images/inspire.jpg"
                        alt="Professional woman working with digital technology and data visualization"
                        width={600}
                        height={400}
                        className="w-[60%] aspect-[5/2] object-cover rounded-md hidden lg:block"
                        priority
                    />
                    {/* Content Section */}
                    <div className="lg:absolute bottom-28 right-0 p-8 lg:w-1/2 bg-[#38B1EA] rounded-md">
                        <div className="space-y-6">
                            <h1 className="text-white text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                                Inspiring Leadership and Strengthening Teams Across Every Sector
                            </h1>

                            <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-md">
                                Lorem ipsum dolor sit amet consectetur. Ullamcorper lacus diam quis morbi gravida purus. Quis nisi rutrum
                                in sed imperdiet sed et commodo in. Ultricies at lectus in varius a lectus.
                            </p>

                            <Button className="bg-white text-cyan-400 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 w-fit">
                                Explore Who We Help
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
