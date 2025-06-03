import Image from "next/image";

export default function DataStrategyContent() {
    return (
        <section className="py-8 lg:py-20">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1
                        className="font-bold mb-6"
                        style={{
                            fontSize: "40px",
                            color: "#323232",
                            lineHeight: "1.2",
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur. Id
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Protect Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu
                            egestas. Amet odio eu eget justo. Aliquam id rhoncus.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Know Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu
                            egestas. Amet odio eu eget justo. Aliquam id rhoncus.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Rule Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu
                            egestas. Amet odio eu eget justo. Aliquam id rhoncus.
                        </p>
                    </div>
                </div>


                <div className="w-full flex justify-center">
                    <div className="w-full">
                        <Image
                            src="/images/service_details.png"
                            alt="Data workflow illustration showing the complete data lifecycle with collection, analysis, generation, and storage stages"
                            width={1000}
                            height={1000}
                            className="w-full aspect-[5/2] object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
